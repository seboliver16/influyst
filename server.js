const express = require('express');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();
const oauth2Client = new google.auth.OAuth2(
  process.env.YOUTUBE_CLIENT_ID,
  process.env.YOUTUBE_CLIENT_SECRET,
  'http://localhost:3000/oauth2callback'  // Change this to your production redirect URI when deploying
);

// Scopes for both YouTube Data API and YouTube Analytics API
const scopes = [
  'https://www.googleapis.com/auth/youtube.readonly',  // For YouTube Data API
  'https://www.googleapis.com/auth/yt-analytics.readonly'  // For YouTube Analytics API
];


// Route to start OAuth flow
app.get('/auth', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',  // Ensures we get a refresh token
    scope: scopes,           // Both YouTube and YouTube Analytics scopes
  });
  res.redirect(url);
});

// Route to handle OAuth callback
app.get('/oauth2callback', async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code);  // Exchange code for tokens
    oauth2Client.setCredentials(tokens);  // Set tokens to OAuth client
    res.send('Authentication successful! You can now access YouTube data.');
  } catch (error) {
    console.error('Error retrieving YouTube Analytics:', error);  // Log full error object
    res.status(500).send('Error retrieving YouTube Analytics data.');
  }
});

// Route to get YouTube channel stats (using YouTube Data API)
app.get('/youtube-stats', async (req, res) => {
  try {
    const youtube = google.youtube('v3');
    const response = await youtube.channels.list({
      part: 'statistics',
      mine: true,
      auth: oauth2Client
    });
    res.json(response.data);  // Send channel stats as JSON
  } catch (error) {
    console.error('Error retrieving YouTube stats:', error.response?.data || error.message);
    res.status(500).send('Error retrieving YouTube statistics.');
  }
});

// Route to get YouTube Analytics for various time frames
app.get('/youtube-analytics', async (req, res) => {
  try {
    const youtubeAnalytics = google.youtubeAnalytics('v2');
    const metrics = 'views,likes,comments,estimatedMinutesWatched,averageViewDuration';

    // Get analytics for the last 7 days (aligned to day dimension)
    const past7Days = await youtubeAnalytics.reports.query({
      auth: oauth2Client,
      ids: 'channel==MINE',
      startDate: '2024-09-30',  // Correct start date
      endDate: '2024-10-06',    // Set the endDate to yesterday
      metrics: metrics,
      dimensions: 'day',        // Querying day-by-day stats
      sort: '-day',
    });

    // Get analytics for the last 3 full months (aligned to month dimension)
    const past3Months = await youtubeAnalytics.reports.query({
      auth: oauth2Client,
      ids: 'channel==MINE',
      startDate: '2024-07-01',  // First day of July
      endDate: '2024-09-30',    // Last day of September
      metrics: metrics,
      dimensions: 'month',      // Querying month-by-month stats
      sort: '-month',
    });

    res.json({
      past7Days: past7Days.data,
      past3Months: past3Months.data
    });
  } catch (error) {
    console.error('Error retrieving YouTube Analytics:', error.response?.data || error.message);
    res.status(500).send('Error retrieving YouTube Analytics data.');
  }
});




// Start the Express server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
