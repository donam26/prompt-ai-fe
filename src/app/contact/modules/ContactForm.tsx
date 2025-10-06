"use client";

import { useContact } from "@/hooks/useContact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, Loader2 } from "lucide-react";

export const ContactForm = () => {
  const { formData, errors, isLoading, handleFieldChange, handleSubmit } =
    useContact();

  return (
    <div className="bg-white shadow-xl p-8 md:p-12 border border-gray-100 rounded-2xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Top row - Name, Email, Phone */}
        <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
          {/* Name Field */}
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="block mb-3 font-semibold text-gray-700 text-sm"
            >
              Your Name
            </Label>
            <div className="relative">
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={e => handleFieldChange("name", e.target.value)}
                placeholder="Enter your name"
                className={`h-12 px-4 text-base border-0 border-b-2 border-gray-200 rounded-none bg-transparent focus:border-purple-500 focus:ring-0 transition-colors duration-200 ${
                  errors.name ? "border-red-500" : ""
                }`}
                disabled={isLoading}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="block mb-3 font-semibold text-gray-700 text-sm"
            >
              Email Address
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={e => handleFieldChange("email", e.target.value)}
                placeholder="Enter your email"
                className={`h-12 px-4 text-base border-0 border-b-2 border-gray-200 rounded-none bg-transparent focus:border-purple-500 focus:ring-0 transition-colors duration-200 ${
                  errors.email ? "border-red-500" : ""
                }`}
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <Label
              htmlFor="phoneNumber"
              className="block mb-3 font-semibold text-gray-700 text-sm"
            >
              Phone Number (optional)
            </Label>
            <div className="relative">
              <Input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber || ""}
                onChange={e => handleFieldChange("phoneNumber", e.target.value)}
                placeholder="Enter your phone"
                className={`h-12 px-4 text-base border-0 border-b-2 border-gray-200 rounded-none bg-transparent focus:border-purple-500 focus:ring-0 transition-colors duration-200 ${
                  errors.phoneNumber ? "border-red-500" : ""
                }`}
                disabled={isLoading}
              />
            </div>
            {errors.phoneNumber && (
              <p className="mt-1 text-red-500 text-sm">{errors.phoneNumber}</p>
            )}
          </div>
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <Label
            htmlFor="message"
            className="block mb-3 font-semibold text-gray-700 text-sm"
          >
            Message
          </Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={e => handleFieldChange("message", e.target.value)}
            placeholder="Enter your message here..."
            className={`min-h-[120px] px-4 py-3 text-base border-0 border-b-2 border-gray-200 rounded-none bg-transparent focus:border-purple-500 focus:ring-0 transition-colors duration-200 resize-none ${
              errors.message ? "border-red-500" : ""
            }`}
            disabled={isLoading}
          />
          <div className="flex justify-between mt-2 text-gray-500 text-sm">
            <span>{formData.message.length}/1000 characters</span>
            {errors.message && (
              <span className="text-red-500">{errors.message}</span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            className="flex justify-center items-center gap-3 bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl px-8 py-4 rounded-full w-full md:w-auto font-semibold text-white text-lg hover:scale-105 transition-all duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Leave us a Message
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
