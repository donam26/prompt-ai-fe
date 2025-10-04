import { HERO_SHOWCASE } from "@/constants";
import Image from "next/image";

export const HeroShowcaseSection = () => {
  return (
    <section className="bg-white">
      {/* Single Large Image Section - Full Width */}
      <div className="w-full">
        {/* Single Large Image - Full Screen Width */}
        <div className="group relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[716px] overflow-hidden transition-all duration-500 transform">
          <Image
            src="/images/home/slider-home.png"
            alt="AI Creative Content Showcase"
            fill
            className="object-center object-cover transition-transform duration-700"
            sizes="100vw"
            priority
            quality={90}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Bottom Partners Section */}
      <div className="bg-gray-50 px-4 py-12 overflow-hidden">
        <div className="mx-auto container">
          {/* Partners Slider - Continuous Loop */}
          <div className="relative overflow-hidden">
            {/* Left gradient fade */}
            <div className="top-0 bottom-0 left-0 z-10 absolute bg-gradient-to-r from-gray-50 to-transparent w-20 pointer-events-none" />

            {/* Right gradient fade */}
            <div className="top-0 right-0 bottom-0 z-10 absolute bg-gradient-to-l from-gray-50 to-transparent w-20 pointer-events-none" />

            {/* Slider wrapper - Continuous scroll */}
            <div className="flex animate-scroll">
              {[...HERO_SHOWCASE, ...HERO_SHOWCASE, ...HERO_SHOWCASE].map(
                (partner, index) => (
                  <div
                    key={`${partner}-${index}`}
                    className="flex-shrink-0 mx-6"
                  >
                    {partner}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
