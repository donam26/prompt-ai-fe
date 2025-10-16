"use client";

import { ContactForm } from "./modules/ContactForm";
import { ContactHero } from "./modules/ContactHero";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      <ContactHero />
      <div className="mx-auto px-4 container">
        <div className="items-start gap-6 grid grid-cols-1 lg:grid-cols-3">
          {/* Left side - Astronaut and Contact Info */}
          <div>
            <Image
              src="/images/ui-elements/img-contact.png"
              alt="Contact Hero"
              width={500}
              height={500}
            />
          </div>

          {/* Right side - Contact Form */}
          <div className="order-1 lg:order-2 lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
