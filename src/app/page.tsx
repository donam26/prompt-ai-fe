"use client";

import {
  HeroSection,
  HeroShowcaseSection,
  TeamsSection,
  CoachingMentorshipSection,
  PromptLibrarySection,
  AIModulesSection,
  LivestreamCommunitySection,
  EnterpriseTrainingSection,
  MasonrySection,
  FAQSection,
  CTABannerSection,
  TrendingPromptsSection,
} from "./(modules)";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HeroShowcaseSection />
      <TeamsSection />
      {/* New Comprehensive Layout */}
      <div className="mx-auto container">
        <CoachingMentorshipSection />
        <PromptLibrarySection />
        <AIModulesSection />
        <LivestreamCommunitySection />
        <EnterpriseTrainingSection />
        <TrendingPromptsSection newestPrompts={[]} />
      </div>

      {/* Masonry Section */}
      <MasonrySection />
      {/* FAQ Section */}
      <FAQSection />
      {/* CTA Banner Section */}
      <CTABannerSection />
    </div>
  );
}
