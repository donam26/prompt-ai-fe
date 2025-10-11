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
      {/* Hero Sections - Full Width */}
      <HeroSection />
      <HeroShowcaseSection />

      {/* Main Content Container */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Teams Section */}
        <section className="pt-12 lg:pt-12">
          <TeamsSection />
        </section>

        {/* Comprehensive Layout Sections */}
        <section className="pt-8 lg:pt-12">
          <CoachingMentorshipSection />
        </section>

        <section className="pt-8 lg:pt-12">
          <PromptLibrarySection />
        </section>

        <section className="pt-8 lg:pt-12">
          <AIModulesSection />
        </section>

        <section className="pt-8 lg:pt-12">
          <LivestreamCommunitySection />
        </section>

        <section className="pt-8 lg:pt-12">
          <EnterpriseTrainingSection />
        </section>

        <section className="pt-8 lg:pt-12">
          <TrendingPromptsSection newestPrompts={[]} />
        </section>
      </div>

      {/* Full Width Sections */}
      <section className="pt-8 lg:pt-12">
        <MasonrySection />
      </section>

      <section className="pt-8 lg:pt-12">
        <FAQSection />
      </section>

      <section className="pt-8 lg:pt-12">
        <CTABannerSection />
      </section>
    </div>
  );
}
