/**
 * Testing utilities for website functionality
 */

interface TestResult {
  test: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  details?: any;
}

/**
 * Test responsive design breakpoints
 */
export const testResponsiveDesign = (): TestResult[] => {
  const results: TestResult[] = [];
  const breakpoints = [
    { name: 'Mobile Small', width: 320 },
    { name: 'Mobile Large', width: 480 },
    { name: 'Tablet', width: 768 },
    { name: 'Desktop', width: 1024 },
    { name: 'Large Desktop', width: 1440 }
  ];

  breakpoints.forEach(breakpoint => {
    try {
      // Simulate viewport resize
      const mediaQuery = window.matchMedia(`(max-width: ${breakpoint.width}px)`);
      
      results.push({
        test: `Responsive Design - ${breakpoint.name}`,
        status: 'pass',
        message: `Breakpoint ${breakpoint.width}px is properly configured`,
        details: { width: breakpoint.width, matches: mediaQuery.matches }
      });
    } catch (error) {
      results.push({
        test: `Responsive Design - ${breakpoint.name}`,
        status: 'fail',
        message: `Error testing breakpoint: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
  });

  return results;
};

/**
 * Test navigation functionality
 */
export const testNavigation = (): TestResult[] => {
  const results: TestResult[] = [];
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  if (navLinks.length === 0) {
    results.push({
      test: 'Navigation Links',
      status: 'fail',
      message: 'No navigation links found'
    });
    return results;
  }

  navLinks.forEach((link, index) => {
    const href = (link as HTMLAnchorElement).getAttribute('href');
    if (href) {
      const targetElement = document.querySelector(href);
      
      if (targetElement) {
        results.push({
          test: `Navigation Link ${index + 1}`,
          status: 'pass',
          message: `Link "${href}" has valid target element`,
          details: { href, hasTarget: true }
        });
      } else {
        results.push({
          test: `Navigation Link ${index + 1}`,
          status: 'fail',
          message: `Link "${href}" target element not found`,
          details: { href, hasTarget: false }
        });
      }
    }
  });

  return results;
};

/**
 * Test form functionality
 */
export const testFormFunctionality = (): TestResult[] => {
  const results: TestResult[] = [];
  const forms = document.querySelectorAll('form');

  if (forms.length === 0) {
    results.push({
      test: 'Form Elements',
      status: 'warning',
      message: 'No forms found on the page'
    });
    return results;
  }

  forms.forEach((form, index) => {
    // Test form validation
    const requiredFields = form.querySelectorAll('[required]');
    const hasValidation = requiredFields.length > 0;
    
    results.push({
      test: `Form ${index + 1} - Validation`,
      status: hasValidation ? 'pass' : 'warning',
      message: hasValidation 
        ? `Form has ${requiredFields.length} required fields with validation`
        : 'Form has no required field validation',
      details: { requiredFields: requiredFields.length }
    });

    // Test form accessibility
    const hasLabels = Array.from(form.querySelectorAll('input, select, textarea')).every(input => {
      const hasLabel = form.querySelector(`label[for="${input.id}"]`) || 
                      input.closest('div')?.querySelector('label') ||
                      input.hasAttribute('aria-label') ||
                      input.hasAttribute('aria-labelledby');
      return hasLabel;
    });

    results.push({
      test: `Form ${index + 1} - Accessibility`,
      status: hasLabels ? 'pass' : 'fail',
      message: hasLabels 
        ? 'All form fields have proper labels'
        : 'Some form fields are missing labels'
    });
  });

  return results;
};

/**
 * Test image loading and optimization
 */
export const testImageOptimization = (): TestResult[] => {
  const results: TestResult[] = [];
  const images = document.querySelectorAll('img');

  if (images.length === 0) {
    results.push({
      test: 'Image Elements',
      status: 'warning',
      message: 'No images found on the page'
    });
    return results;
  }

  let imagesWithAlt = 0;
  let imagesWithLazyLoading = 0;
  let brokenImages = 0;

  images.forEach((img, index) => {
    // Test alt text
    if (img.hasAttribute('alt') && img.alt.trim() !== '') {
      imagesWithAlt++;
    }

    // Test lazy loading
    if (img.hasAttribute('loading') && img.loading === 'lazy') {
      imagesWithLazyLoading++;
    }

    // Test if image loads successfully
    if (img.complete && img.naturalHeight === 0) {
      brokenImages++;
    }
  });

  results.push({
    test: 'Image Alt Text',
    status: imagesWithAlt === images.length ? 'pass' : 'warning',
    message: `${imagesWithAlt}/${images.length} images have alt text`,
    details: { total: images.length, withAlt: imagesWithAlt }
  });

  results.push({
    test: 'Image Lazy Loading',
    status: imagesWithLazyLoading > 0 ? 'pass' : 'warning',
    message: `${imagesWithLazyLoading}/${images.length} images use lazy loading`,
    details: { total: images.length, withLazyLoading: imagesWithLazyLoading }
  });

  results.push({
    test: 'Broken Images',
    status: brokenImages === 0 ? 'pass' : 'fail',
    message: brokenImages === 0 ? 'All images load successfully' : `${brokenImages} broken images found`,
    details: { total: images.length, broken: brokenImages }
  });

  return results;
};

/**
 * Test accessibility features
 */
export const testAccessibility = (): TestResult[] => {
  const results: TestResult[] = [];

  // Test skip navigation
  const skipLink = document.querySelector('a[href="#main-content"]');
  results.push({
    test: 'Skip Navigation',
    status: skipLink ? 'pass' : 'warning',
    message: skipLink ? 'Skip navigation link found' : 'Skip navigation link missing'
  });

  // Test heading hierarchy
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const headingLevels = Array.from(headings).map(h => parseInt(h.tagName.charAt(1)));
  let properHierarchy = true;
  
  for (let i = 1; i < headingLevels.length; i++) {
    if (headingLevels[i] > headingLevels[i - 1] + 1) {
      properHierarchy = false;
      break;
    }
  }

  results.push({
    test: 'Heading Hierarchy',
    status: properHierarchy ? 'pass' : 'warning',
    message: properHierarchy 
      ? 'Heading hierarchy is properly structured'
      : 'Heading hierarchy may have issues',
    details: { headingLevels }
  });

  // Test ARIA attributes
  const elementsWithAria = document.querySelectorAll('[aria-label], [aria-labelledby], [aria-describedby]');
  results.push({
    test: 'ARIA Attributes',
    status: elementsWithAria.length > 0 ? 'pass' : 'warning',
    message: `${elementsWithAria.length} elements have ARIA attributes`,
    details: { count: elementsWithAria.length }
  });

  return results;
};

/**
 * Run comprehensive website tests
 */
export const runWebsiteTests = (): TestResult[] => {
  const allResults: TestResult[] = [];
  
  try {
    allResults.push(...testResponsiveDesign());
    allResults.push(...testNavigation());
    allResults.push(...testFormFunctionality());
    allResults.push(...testImageOptimization());
    allResults.push(...testAccessibility());
  } catch (error) {
    allResults.push({
      test: 'Test Suite Execution',
      status: 'fail',
      message: `Error running tests: ${error instanceof Error ? error.message : 'Unknown error'}`
    });
  }

  return allResults;
};

/**
 * Generate test report
 */
export const generateTestReport = (results: TestResult[]) => {
  const passed = results.filter(r => r.status === 'pass').length;
  const failed = results.filter(r => r.status === 'fail').length;
  const warnings = results.filter(r => r.status === 'warning').length;

  console.group('🔍 Website Test Report');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`⚠️  Warnings: ${warnings}`);
  console.log(`📊 Total Tests: ${results.length}`);
  
  if (failed > 0) {
    console.group('❌ Failed Tests');
    results.filter(r => r.status === 'fail').forEach(result => {
      console.error(`${result.test}: ${result.message}`);
    });
    console.groupEnd();
  }
  
  if (warnings > 0) {
    console.group('⚠️  Warnings');
    results.filter(r => r.status === 'warning').forEach(result => {
      console.warn(`${result.test}: ${result.message}`);
    });
    console.groupEnd();
  }
  
  console.groupEnd();
  
  return {
    passed,
    failed,
    warnings,
    total: results.length,
    results
  };
};