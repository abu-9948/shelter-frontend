import React from 'react';
import { Card } from './ui/card';
import { ImageIcon } from 'lucide-react';
import { cn } from '../lib/utils';

const AccommodationPlaceholder = ({ className }) => {
  return (
    <Card className={cn("relative w-full h-full min-h-[200px] overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100", className)}>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="absolute inset-0 w-full h-full opacity-5"
          aria-hidden="true"
        >
          <pattern
            id="grid"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 0h20v20H0z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <div className="relative flex flex-col items-center gap-3 p-6 text-center">
          <div className="p-3 rounded-full bg-blue-100 border border-blue-200">
            <ImageIcon className="w-8 h-8 text-blue-700" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-slate-600">No Image Available</p>
            <p className="text-xs text-slate-700">Property photo coming soon</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AccommodationPlaceholder;