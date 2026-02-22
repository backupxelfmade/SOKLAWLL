import React from 'react';
import { Loader2 } from 'lucide-react';

interface NewsLoaderProps {
  message?: string;
  showIcon?: boolean;
  variant?: 'default' | 'cards' | 'minimal' | 'article';
  selectedArticle?: string | null;
  onBack?: () => void;
}

const NewsLoader: React.FC<NewsLoaderProps> = ({
  message = 'Loading latest news...',
  showIcon = true,
  variant = 'default',
}) => {

  // ── Minimal — inline spinner row ──
  if (variant === 'minimal') {
    return (
      <div className="flex items-center justify-center py-6 sm:py-8">
        <div className="flex items-center gap-2.5">
          <Loader2 className="animate-spin h-4 w-4 text-[#bfa06f]" />
          <span className="text-[#6a6a6a] text-xs sm:text-sm">{message}</span>
        </div>
      </div>
    );
  }

  // ── Cards — skeleton grid matching the News layout ──
  if (variant === 'cards') {
    return (
      <>
        {/* Mobile skeleton — list rows */}
        <div className="flex flex-col divide-y divide-[#e8e0d0] sm:hidden">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-start gap-3 py-3 animate-pulse">
              {/* Thumbnail */}
              <div className="w-20 h-16 flex-shrink-0 rounded-lg bg-[#e8e0d0]" />
              {/* Lines */}
              <div className="flex-1 space-y-2 pt-1">
                <div className="h-0.5 w-3 bg-[#bfa06f]/30 rounded" />
                <div className="h-3 bg-[#e8e0d0] rounded w-full" />
                <div className="h-3 bg-[#e8e0d0] rounded w-3/4" />
                <div className="h-2.5 bg-[#e8e0d0] rounded w-1/3 mt-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Desktop skeleton — card grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-[#e8e0d0] rounded-2xl overflow-hidden animate-pulse"
            >
              {/* Image placeholder */}
              <div className="aspect-video bg-[#e8e0d0]" />
              {/* Content */}
              <div className="p-5 space-y-3">
                <div className="h-0.5 w-5 bg-[#bfa06f]/30 rounded" />
                <div className="h-4 bg-[#e8e0d0] rounded w-full" />
                <div className="h-4 bg-[#e8e0d0] rounded w-4/5" />
                <div className="space-y-2 pt-1">
                  <div className="h-3 bg-[#e8e0d0] rounded w-full" />
                  <div className="h-3 bg-[#e8e0d0] rounded w-3/4" />
                  <div className="h-3 bg-[#e8e0d0] rounded w-1/2" />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="h-3 bg-[#e8e0d0] rounded w-20" />
                  <div className="h-3 bg-[#e8e0d0] rounded w-14" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  // ── Default — centered spinner + skeletons ──
  return (
    <div
      className="flex flex-col items-center justify-center text-center py-10 sm:py-14"
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      {/* Spinner */}
      <div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#bfa06f]/10 mb-4">
        <Loader2 className="animate-spin h-5 w-5 text-[#bfa06f]" />
      </div>

      {/* Message */}
      <p className="text-[#1a1a1a] font-semibold text-sm sm:text-base">{message}</p>
      <p className="text-[#6a6a6a] text-xs sm:text-sm mt-1">
        Please wait while we fetch the content…
      </p>

      {/* Skeleton lines */}
      <div className="w-full max-w-xs sm:max-w-sm space-y-2.5 mt-6 animate-pulse">
        <div className="h-0.5 w-5 bg-[#bfa06f]/30 rounded mx-auto" />
        <div className="h-3 bg-[#e8e0d0] rounded w-full" />
        <div className="h-3 bg-[#e8e0d0] rounded w-3/4 mx-auto" />
        <div className="h-3 bg-[#e8e0d0] rounded w-1/2 mx-auto" />
      </div>
    </div>
  );
};

export default NewsLoader;
