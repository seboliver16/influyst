"use client";

import React from 'react';
import { AudienceDemographics } from '@/src/app/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, TooltipProps,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

interface DemographicsDisplayProps {
  demographics: AudienceDemographics;
  className?: string;
}

// Define types for custom tooltip and chart data
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{value: number; name: string}>;
  label?: string;
}

interface PieDataItem {
  name: string;
  value: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658'];

const DemographicsDisplay: React.FC<DemographicsDisplayProps> = ({ demographics, className = '' }) => {
  // Transform age data for chart display
  const ageData = demographics.ageGroups ? Object.entries(demographics.ageGroups).map(([age, percentage]) => ({
    age,
    percentage: Number(percentage.toFixed(1))
  })) : [];

  // Transform gender data for pie chart
  const genderData = demographics.genderDistribution ? Object.entries(demographics.genderDistribution).map(([gender, percentage]) => ({
    name: gender.charAt(0).toUpperCase() + gender.slice(1),
    value: Number(percentage.toFixed(1))
  })) : [];

  // Transform location data
  const locationData = demographics.topLocations ? Object.entries(demographics.topLocations)
    .map(([country, percentage]) => ({
      country,
      percentage: Number(percentage.toFixed(1))
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 5) : [];

  // Custom tooltip for charts
  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-2 border shadow-sm rounded-md">
          <p className="font-medium">{`${label}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  // Type-safe label function for the pie chart
  const renderPieLabel = ({ name, value }: { name: string; value: number }) => {
    return `${name}: ${value}%`;
  };

  // Type-safe tooltip formatter
  const tooltipFormatter = (value: number) => `${value}%`;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Audience Demographics</CardTitle>
        <CardDescription>Breakdown of your audience across platforms</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="age" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="age">Age Distribution</TabsTrigger>
            <TabsTrigger value="gender">Gender</TabsTrigger>
            <TabsTrigger value="location">Top Locations</TabsTrigger>
            {demographics.interests && demographics.interests.length > 0 && (
              <TabsTrigger value="interests">Interests</TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="age" className="pt-2">
            {ageData.length > 0 ? (
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={ageData}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="age" />
                    <YAxis unit="%" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="percentage" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-10">No age data available</p>
            )}
          </TabsContent>
          
          <TabsContent value="gender" className="pt-2">
            {genderData.length > 0 ? (
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={genderData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={renderPieLabel}
                    >
                      {genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip formatter={tooltipFormatter} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-10">No gender data available</p>
            )}
          </TabsContent>
          
          <TabsContent value="location" className="pt-2">
            {locationData.length > 0 ? (
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={locationData}
                    margin={{ top: 5, right: 20, left: 40, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis type="number" unit="%" />
                    <YAxis type="category" dataKey="country" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="percentage" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-10">No location data available</p>
            )}
          </TabsContent>
          
          {demographics.interests && demographics.interests.length > 0 && (
            <TabsContent value="interests" className="pt-2">
              <div className="flex flex-wrap gap-2 py-4 justify-center">
                {demographics.interests.map((interest, index) => (
                  <div 
                    key={index}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium"
                  >
                    {interest}
                  </div>
                ))}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DemographicsDisplay; 