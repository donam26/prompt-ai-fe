import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/constants";

export const TestimonialsSection = () => {
  return (
    <section className="bg-gradient-to-r from-[#e1f6ff] to-[#e6b8ff] px-4 py-10">
      <div className="mx-auto container">
        <div className="mb-12 text-center">
          <div className="mb-2 font-semibold text-purple-600">
            PHẢN HỒI CỦA NGƯỜI DÙNG
          </div>
          <h2 className="font-bold text-gray-900 text-3xl md:text-4xl">
            Họ nói gì về PROM?
          </h2>
        </div>

        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <blockquote className="mb-4 text-gray-700 italic">
                &quot;{testimonial.text}&quot;
              </blockquote>
              <div className="flex items-center">
                <div className="bg-gray-200 mr-4 rounded-full w-12 h-12" />
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.author.name}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {testimonial.author.title}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
