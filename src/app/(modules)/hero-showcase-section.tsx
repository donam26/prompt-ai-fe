import { HERO_SHOWCASE } from "@/constants";
import Image from "next/image";

export const HeroShowcaseSection = () => {
  return (
    <section className="">
      {/* Single Large Image Section - Full Width */}
      {/* <div className="w-full">
        <div className="group relative w-full h-[200px] sm:h-[400px] md:h-[500px] lg:h-[616px] transition-all duration-500 transform">
          <Image
            src="/images/home/slider-home.png"
            alt="AI Creative Content Showcase"
            fill
            className="object-center object-contain transition-transform duration-700"
            sizes="100vw"
            priority
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>
      </div> */}

      {/* Bottom Partners Section */}
      <div className="mt-10 px-4 overflow-hidden">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
          {/* Partners Slider - Continuous Loop */}
          <div className="relative w-full overflow-hidden">
            <div className="flex">
              {/* Track 1 */}
              <div className="flex animate-scroll-slow">
                {HERO_SHOWCASE.map((logo, index) => (
                  <div
                    key={`track1-${logo.alt}-${index}`}
                    className="flex flex-shrink-0 justify-center items-center mx-6"
                  >
                    <div className="flex justify-center items-center bg-white shadow-sm hover:shadow-md p-3 border border-gray-200 hover:border-purple-300 rounded-lg min-w-[132px] min-h-[72px] transition-all duration-300">
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={logo.width}
                        height={logo.height}
                        className="w-auto max-w-[120px] h-12 object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex animate-scroll-slow" aria-hidden="true">
                {HERO_SHOWCASE.map((logo, index) => (
                  <div
                    key={`track2-${logo.alt}-${index}`}
                    className="flex flex-shrink-0 justify-center items-center mx-6"
                  >
                    <div className="flex justify-center items-center bg-white shadow-sm hover:shadow-md p-3 border border-gray-200 hover:border-purple-300 rounded-lg min-w-[132px] min-h-[72px] transition-all duration-300">
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={logo.width}
                        height={logo.height}
                        className="w-auto max-w-[120px] h-12 object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
