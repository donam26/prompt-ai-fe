"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { HeroRevampSection } from "./(modules)";

// Lazy load below-the-fold sections for better performance
const CoachingMentorshipSection = dynamic(
  () => import("./(modules)/coaching-mentorship-section"),
  { ssr: true }
);
const PromptLibrarySection = dynamic(
  () => import("./(modules)/prompt-library-section"),
  { ssr: true }
);
const AIModulesSection = dynamic(
  () => import("./(modules)/ai-modules-section"),
  { ssr: true }
);
const EnterpriseTrainingSection = dynamic(
  () => import("./(modules)/enterprise-training-section"),
  { ssr: true }
);
const TrendingPromptsSection = dynamic(
  () =>
    import("./(modules)/trending-prompts-section").then(
      module => module.TrendingPromptsSection
    ),
  { ssr: true }
);
const MasonrySection = dynamic(
  () =>
    import("./(modules)/masonry-section").then(module => module.MasonrySection),
  { ssr: false }
);
const FAQSection = dynamic(
  () => import("./(modules)/faq-section").then(module => module.FAQSection),
  { ssr: true }
);
const CTABannerSection = dynamic(
  () =>
    import("./(modules)/cta-banner-section").then(
      module => module.CTABannerSection
    ),
  { ssr: true }
);

// Loading fallback component
const SectionSkeleton = (): React.JSX.Element => (
  <div className="space-y-4 pt-4 lg:pt-6 animate-pulse">
    <div className="bg-gray-200 rounded-lg h-64" />
  </div>
);

export default function HomePage(): React.JSX.Element {
  return (
    <div className="min-h-screen">
      {/* Hero Sections - Full Width - Critical, loaded immediately */}
      <HeroRevampSection />

      {/* Main Content Container */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Comprehensive Layout Sections - Lazy loaded */}
        <section className="pt-4 lg:pt-6">
          <Suspense fallback={<SectionSkeleton />}>
            <CoachingMentorshipSection />
          </Suspense>
        </section>

        <section className="pt-4 lg:pt-6">
          <Suspense fallback={<SectionSkeleton />}>
            <PromptLibrarySection />
          </Suspense>
        </section>
        <section className="pt-4 lg:pt-6">
          <Suspense fallback={<SectionSkeleton />}>
            <AIModulesSection />
          </Suspense>
        </section>

        <section className="pt-4 lg:pt-6">
          <Suspense fallback={<SectionSkeleton />}>
            <EnterpriseTrainingSection />
          </Suspense>
        </section>

        <section className="pt-4 lg:pt-6">
          <Suspense fallback={<SectionSkeleton />}>
            <TrendingPromptsSection newestPrompts={[]} />
          </Suspense>
        </section>
      </div>

      {/* Full Width Sections - Lazy loaded */}
      <section className="pt-8 lg:pt-12">
        <Suspense fallback={<SectionSkeleton />}>
          <MasonrySection />
        </Suspense>
      </section>

      <section className="pt-8 lg:pt-12">
        <Suspense fallback={<SectionSkeleton />}>
          <FAQSection />
        </Suspense>
      </section>

      <section className="pt-8 lg:pt-12">
        <Suspense fallback={<SectionSkeleton />}>
          <CTABannerSection />
        </Suspense>
      </section>
    </div>
  );
}
