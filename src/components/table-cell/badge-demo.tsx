"use client";

import { BadgeCell } from "./badge-cell";
import { BADGE_CONSTANTS } from "@/constants/badges";

export function BadgeDemo() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="mb-4 font-bold text-2xl">Badge Color Variants</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Beautiful gradient badges with dark mode support
        </p>
      </div>

      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {BADGE_CONSTANTS.DEMO_VARIANTS.map(badge => (
          <div
            key={badge.variant}
            className="bg-white dark:bg-gray-800 shadow-sm p-4 border rounded-lg"
          >
            <div className="space-y-3">
              <BadgeCell label={badge.label} variant={badge.variant} />
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                  {badge.variant}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">
                  {badge.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
