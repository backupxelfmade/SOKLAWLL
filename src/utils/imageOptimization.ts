/**
 * Image optimization utilities for better performance and responsive design
 */

export interface ImageConfig {
  src: string;
  alt: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  className?: string;
}

/**
 * Generate responsive image URLs with different sizes
 */
export const generateResponsiveImageUrls = (baseUrl: string) => {
  // For external images, we'll use the original URL with different parameters
  if (baseUrl.includes('pexels.com')) {
    return {
      mobile: `${baseUrl}&w=768&h=432`,
      tablet: `${baseUrl}&w=1024&h=576`,
      desktop: `${baseUrl}&w=1920&h=1080`
    };
  }
  
  if (baseUrl.includes('postimg.cc')) {
    // PostImg doesn't support dynamic resizing, return original
    return {
      mobile: baseUrl,
      tablet: baseUrl,
      desktop: baseUrl
    };
  }
  
  return {
    mobile: baseUrl,
    tablet: baseUrl,
    desktop: baseUrl
  };
};

/**
 * Create optimized image component props
 */
export const createOptimizedImageProps = (config: ImageConfig) => {
  const urls = generateResponsiveImageUrls(config.src);
  
  return {
    src: urls.desktop,
    srcSet: `${urls.mobile} 768w, ${urls.tablet} 1024w, ${urls.desktop} 1920w`,
    sizes: config.sizes || '(max-width: 768px) 768px, (max-width: 1024px) 1024px, 1920px',
    alt: config.alt,
    loading: config.loading || 'lazy',
    className: config.className || '',
    style: {
      objectFit: 'cover' as const,
      objectPosition: 'center center' as const,
      width: '100%',
      height: '100%'
    }
  };
};

/**
 * Preload critical images for better performance
 */
export const preloadCriticalImages = (imageUrls: string[]) => {
  imageUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
};

/**
 * Lazy load images with intersection observer
 */
export const setupLazyLoading = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};

/**
 * Handle image loading errors with fallbacks
 */
export const handleImageError = (event: Event, fallbackUrl?: string) => {
  const img = event.target as HTMLImageElement;
  
  if (fallbackUrl && img.src !== fallbackUrl) {
    img.src = fallbackUrl;
    return;
  }
  
  // Create a gradient placeholder
  const parent = img.parentElement;
  if (parent) {
    img.style.display = 'none';
    parent.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)';
    parent.style.display = 'flex';
    parent.style.alignItems = 'center';
    parent.style.justifyContent = 'center';
    
    const placeholder = document.createElement('div');
    placeholder.className = 'text-white text-4xl font-bold';
    placeholder.textContent = img.alt.charAt(0).toUpperCase() || '?';
    parent.appendChild(placeholder);
  }
};

/**
 * Optimize image loading performance
 */
export const optimizeImagePerformance = () => {
  // Add loading="lazy" to all images except hero images
  document.querySelectorAll('img').forEach(img => {
    if (!img.closest('.hero-section') && !img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
  });
  
  // Add proper alt text to images missing it
  document.querySelectorAll('img:not([alt])').forEach(img => {
    img.setAttribute('alt', 'SOK Law Associates');
  });
};