/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'lh3.googleusercontent.com', // For Google profile pictures
      'pbs.twimg.com', // For Twitter profile pictures
      'instagram.com', // For Instagram images
      'cdn.sanity.io', // If using Sanity for image hosting
      'storage.googleapis.com' // For other Google Cloud Storage buckets
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // Add other configs as needed
};

export default nextConfig;
