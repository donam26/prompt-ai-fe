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
        </div>
      </div>

      {/* Bottom Partners Section */}
      <div className="bg-white px-4 pt-8 lg:pt-12 overflow-hidden">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Partners Slider - Continuous Loop */}
          <div className="relative overflow-hidden">
            {/* Left gradient fade */}
            <div className="top-0 bottom-0 left-0 z-10 absolute bg-gradient-to-r from-white to-transparent w-20 pointer-events-none" />

            {/* Right gradient fade */}
            <div className="top-0 right-0 bottom-0 z-10 absolute bg-gradient-to-l from-white to-transparent w-20 pointer-events-none" />

            {/* Slider wrapper - Continuous scroll with more repetitions for mobile */}
            <div className="flex animate-scroll">
              {[
                ...HERO_SHOWCASE,
                ...HERO_SHOWCASE,
                ...HERO_SHOWCASE,
                ...HERO_SHOWCASE,
              ].map((logo, index) => (
                <div
                  key={`${logo.alt}-${index}`}
                  className="flex flex-shrink-0 justify-center items-center mx-6"
                >
                  <div className="flex justify-center items-center bg-white shadow-sm hover:shadow-md p-3 border border-gray-200 hover:border-purple-300 rounded-lg min-w-[132px] min-h-[72px] transition-all duration-300">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={logo.width}
                      height={logo.height}
                      className="w-auto max-w-[120px] h-12 object-contain"
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
