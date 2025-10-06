"use client";

import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Users,
  Shield,
  Zap,
  Star,
} from "lucide-react";

export const ContactInfo = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email",
      value: "support@prom.com",
      action: "mailto:support@prom.com",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call us directly",
      value: "+84 123 456 789",
      action: "tel:+84123456789",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: MapPin,
      title: "Office Location",
      description: "Visit our office",
      value: "Hà Nội, Việt Nam",
      action: "#",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const features = [
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock assistance",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Professional support staff",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected",
    },
    {
      icon: Zap,
      title: "Fast Response",
      description: "Quick problem resolution",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Astronaut Illustration Placeholder */}
      <div className="relative">
        <div className="relative flex justify-center items-center bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl w-full h-96 overflow-hidden">
          {/* Astronaut SVG placeholder - you can replace this with actual astronaut image */}
          <div className="flex justify-center items-center bg-gradient-to-br from-white to-gray-100 shadow-2xl rounded-full w-64 h-64">
            <div className="relative flex justify-center items-center bg-gradient-to-br from-gray-200 to-gray-300 rounded-full w-48 h-48">
              {/* Simple astronaut representation */}
              <div className="relative flex justify-center items-center bg-white rounded-full w-32 h-32">
                <div className="flex justify-center items-center bg-gray-800 rounded-full w-24 h-24">
                  <div className="flex justify-center items-center bg-gray-900 rounded-full w-16 h-16">
                    <div className="bg-blue-500 rounded-full w-8 h-8"></div>
                  </div>
                </div>
                {/* Helmet reflection */}
                <div className="top-2 right-2 absolute bg-blue-200 opacity-60 rounded-full w-6 h-6"></div>
              </div>
              {/* Arms */}
              <div className="top-1/2 -left-4 absolute bg-white rounded-full w-8 h-16 -translate-y-1/2 transform"></div>
              <div className="top-1/2 -right-4 absolute bg-white rounded-full w-8 h-16 -translate-y-1/2 transform"></div>
            </div>
          </div>

          {/* Floating elements */}
          <div className="top-8 left-8 absolute bg-purple-300 rounded-full w-4 h-4 animate-bounce"></div>
          <div className="right-12 bottom-12 absolute bg-blue-300 rounded-full w-3 h-3 animate-bounce delay-1000"></div>
          <div className="top-1/2 right-8 absolute bg-pink-300 rounded-full w-2 h-2 animate-bounce delay-500"></div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 mb-6 font-bold text-gray-900 text-2xl">
          <MessageCircle className="w-6 h-6 text-purple-600" />
          Get in Touch
        </h3>
        <div className="space-y-3">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <div
                key={index}
                className="group flex items-center gap-4 hover:bg-purple-50 p-4 border border-gray-200 hover:border-purple-300 rounded-xl transition-all duration-200 cursor-pointer"
                onClick={() => {
                  if (method.action !== "#") {
                    window.open(method.action, "_blank");
                  }
                }}
              >
                <div
                  className={`flex-shrink-0 w-12 h-12 ${method.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
                >
                  <IconComponent className={`w-6 h-6 ${method.color}`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                    {method.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{method.description}</p>
                  <p className={`text-sm font-medium ${method.color} mt-1`}>
                    {method.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 mb-6 font-bold text-gray-900 text-2xl">
          <Star className="w-6 h-6 text-purple-600" />
          Why Choose Us?
        </h3>
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group flex items-start gap-3 bg-gray-50 hover:bg-purple-50 p-4 rounded-xl transition-colors duration-200"
              >
                <div className="flex flex-shrink-0 justify-center items-center bg-purple-100 group-hover:bg-purple-200 rounded-lg w-10 h-10 transition-colors">
                  <IconComponent className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-gray-800 group-hover:text-purple-600 text-sm transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-xs">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
