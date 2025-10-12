"use client";

import { Copy, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResultViewerProps {
  response?: string;
  onCopyResult?: () => void;
  onUseInChat?: () => void;
}

export const ResultViewer = ({
  onCopyResult,
  onUseInChat,
}: ResultViewerProps) => {
  return (
    <div className="col-span-1 xl:col-span-4 bg-purple-50 shadow-sm p-4 lg:p-0 rounded-xl w-full result-card">
      <div className="p-6">
        <div className="flex justify-between items-start gap-3 pb-4 lg:pb-0 h-[5.3125rem]">
          <h4 className="font-bold text-gray-900 text-xl">Result</h4>
          <div className="flex items-center gap-2">
            <button
              onClick={onCopyResult}
              className="hover:bg-gray-100 p-2 rounded-lg transition-colors"
            >
              <Copy className="w-4 h-4 text-gray-600" />
            </button>
            <Button
              onClick={onUseInChat}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-white text-sm copy-button"
            >
              <MessageCircle className="w-4 h-4" />
              Use in Chat
            </Button>
          </div>
        </div>

        <div className="bg-white p-4 border border-gray-300 rounded-lg chat-result-body">
          {/* Input Section */}
          <div className="mb-6">
            <h3 className="mb-3 font-semibold text-gray-900">Input:</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-sm">job type:</span>
                <span className="font-medium text-gray-900 text-sm">
                  Internship
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-sm">target industry:</span>
                <span className="font-medium text-gray-900 text-sm">
                  Marketing
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-sm">
                  location preference:
                </span>
                <span className="font-medium text-gray-900 text-sm">
                  Remote
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-sm">experience level:</span>
                <span className="font-medium text-gray-900 text-sm">
                  Entry-level
                </span>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div>
            <h3 className="mb-3 font-semibold text-gray-900">Output:</h3>
            <div className="text-gray-800 leading-relaxed">
              <h4 className="mb-3 font-semibold">
                Comprehensive List of Online Job Search Resources for Students
                Seeking Internships in Marketing
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="mb-2 font-semibold">1. Job Search Websites:</p>
                  <ul className="space-y-2 ml-4">
                    <li>
                      <strong>Internship.com:</strong> A dedicated platform for
                      internships, offering a range of marketing opportunities
                      for students.
                    </li>
                    <li>
                      <strong>HandShake:</strong> A career services platform
                      that connects students with employers, showcasing
                      internships and entry-level positions tailored to college
                      students.
                    </li>
                    <li>
                      <strong>LinkedIn:</strong> Utilize the job search feature
                      to find marketing internships, and leverage your network
                      for referrals
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="flex justify-between items-center mt-6 pt-4 border-gray-200 border-t">
            <select className="bg-white px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>GPT 4o Mini</option>
            </select>
            <select className="bg-white px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>EN_US</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
