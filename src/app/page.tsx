"use client";

import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { FeatureHighlightSection } from '../components/landing/FeatureHighlightSection';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';
import { FinalCTASection } from '../components/landing/FinalCTASection';
import { Footer } from '../components/landing/Footer';
// TODO: Import Navbar if it exists or create one
import { Navbar } from '../components/landing/Navbar';
import { FloatingCTA } from '../components/landing/FloatingCTA';
import AboutSection from '../components/landing/AboutSection';

export default function LandingPage() {
  return (
    <main className="relative flex flex-col min-h-screen bg-white dark:bg-gray-900">
      {/* <Navbar /> */}
      <Navbar />
      
      {/* Ensure there's space for fixed elements */}
      <div className="flex flex-col w-full">
        <HeroSection />

        {/* Feature Sections */}
        <div id="features" className="bg-white dark:bg-gray-900">
          <FeatureHighlightSection
            title="One Link, All Your Stats"
            description="Connect your social platforms and watch your key metrics update automatically. Share just one link with brands instead of lengthy media kits and spreadsheets."
            features={[
              "Automatic stat updates from Instagram, TikTok, YouTube & more",
              "Real-time engagement metrics and growth data",
              "Custom analytics dashboard for deeper insights"
            ]}
            iconName="BarChart"
          />
          
          <FeatureHighlightSection
            title="Customize Your Showcase"
            description="Your brand deserves a unique media kit. Design a beautiful, professional profile that reflects your authentic style."
            features={[
              "Custom color schemes and typography options",
              "Beautifully designed templates ready to use",
              "Highlight your best content and campaign successes"
            ]}
            reverseLayout={true}
            iconName="Palette"
          />
          
          <FeatureHighlightSection
            title="Streamline Brand Partnerships"
            description="No more back-and-forth emails or missed opportunities. Make it easy for brands to see your value and start collaborations."
            features={[
              "Professional presentation of your metrics and audience",
              "Direct messaging with interested brands",
              "Partnership history and testimonials showcase"
            ]}
            iconName="LinkIcon"
          />
        </div>

        <div id="about" className="relative w-full">
          <AboutSection />
        </div>
        
        <div id="how-it-works" className="relative w-full">
          <HowItWorksSection />
        </div>
        
        <div className="relative w-full">
          <FinalCTASection />
        </div>

        {/* Influyst Logo Banner */}
        <div className="relative w-full h-72 bg-gray-50 dark:bg-gray-900 overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-gray-50 dark:bg-gray-900"></div>
          <h1 className="absolute top-[65px] left-0 right-0 text-center text-[19rem] font-extrabold text-transparent tracking-tighter leading-none w-full"
              style={{
                WebkitTextStroke: '2px #8a5cf6',
                textShadow: '0 0 20px rgba(138, 92, 246, 0.2)'
              }}>
            INFLUYST
          </h1>
        </div>

        <div className="relative w-full">
          <Footer />
        </div>
      </div>
      
      {/* Floating CTA visible when scrolling */}
      <FloatingCTA />
    </main>
  );
}
