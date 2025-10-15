# IdiomKu

## Overview

IdiomKu is a web-based educational platform designed to teach Malay idioms (peribahasa) through interactive learning experiences. The application provides multiple learning modes including categorized browsing, interactive flashcards, and a comprehensive glossary. Created during an internship at Dewan Bahasa dan Pustaka, the platform aims to make learning Bahasa Malaysia idioms fun and accessible for language learners.

The application focuses on presenting Malay idioms with English translations, explanations, and example sentences across 8 different categories (starting with "Emotions and Feelings"). It features a mascot-driven, user-friendly interface with cultural content about Malaysia.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Static Site Structure**
- Pure HTML/CSS/JavaScript implementation without frameworks
- Multi-page application with dedicated pages for different learning modes:
  - `index.html` - Main landing page with category selection
  - `flashcards.html` - Interactive flashcard learning interface
  - `glossary.html` - Complete idiom reference list
  - `about.html` - Project background and creator information
  - `malaysia.html` - Cultural context and travel guide
- SEO-optimized with comprehensive meta tags (Open Graph, Twitter Cards, structured data)
- Responsive design using Bootstrap 5.3.0 framework
- Accessibility features including skip-to-content links and ARIA labels

**Styling Approach**
- Custom CSS with Poppins font family from Google Fonts
- Sticky header navigation with mobile-responsive hamburger menu
- Consistent color scheme: Primary blue (#4a90e8, #1a73e8) with light gray backgrounds
- External CSS library support (Lightbox2 for image galleries)

**JavaScript Architecture**
- Vanilla JavaScript for interactivity (no frameworks)
- JSON-based data storage for idiom content (`js/idioms.json`)
- Category-based filtering using URL parameters
- Fisher-Yates shuffle algorithm for randomized flashcard presentation
- Event-driven navigation and UI interactions

### Data Architecture

**Content Storage**
- JSON file (`js/idioms.json`) serves as the data source
- Hierarchical structure: Categories → Idioms → Properties
- Each idiom contains:
  - Original Malay idiom text
  - English translation
  - Detailed explanation
  - Example sentences in both Bahasa Malaysia and English

**Data Schema Pattern**
```
categories[] {
  name: string
  idioms[] {
    idiom: string
    translation: string
    explanation: string
    example: {
      BM: string
      English: string
    }
  }
}
```

### Development Server

**Local Development**
- Python-based HTTP server (`server.py`) for local development
- No-cache headers implementation for development workflow
- Runs on port 5000 with 0.0.0.0 binding for network accessibility
- SimpleHTTPRequestHandler with custom cache control headers

### SEO and Discoverability

**Search Optimization** (Updated: October 2025)
- **Comprehensive SEO Meta Tags** on all 5 HTML pages:
  - Unique, keyword-rich meta descriptions for each page
  - Relevant keywords targeting Malay language learners
  - Author and language meta tags
  - Robots meta tags for indexing control
- **Canonical URLs** for all pages pointing to idiomku.com
- **Open Graph Tags** for Facebook/LinkedIn sharing with:
  - Page-specific titles and descriptions
  - Social media images (mascot and cultural content)
  - Site name and locale information
- **Twitter Card Tags** for enhanced Twitter previews:
  - Summary and summary_large_image card types
  - Page-specific content and images
- **JSON-LD Structured Data** on homepage:
  - WebSite schema with organization details
  - Author information
  - Language and topic metadata
- **sitemap.xml** with all pages, priorities, change frequencies, and lastmod dates
- **robots.txt** configured to:
  - Allow all search engine crawlers
  - Reference sitemap location
  - Set crawl-delay directive to 1 second

## External Dependencies

### Frontend Libraries

**Bootstrap 5.3.0**
- Purpose: Responsive grid system and UI components
- Delivery: CDN (jsdelivr.net)
- Usage: Layout, navigation, cards, responsive utilities

**Google Fonts**
- Font: Poppins (weights: 400, 500, 600)
- Purpose: Consistent typography across the application

**Lightbox2 (v2.11.3)**
- Purpose: Image gallery functionality (used on malaysia.html)
- Delivery: CDN (cdnjs.cloudflare.com)
- Features: Modal image viewing with navigation

### Hosting and Domain

**Production Environment**
- Domain: idiomku.com (referenced in canonical URLs and meta tags)
- Static site hosting (implementation details not specified in repository)
- HTTPS enabled (URLs use https://)

### Browser APIs

**Web APIs Used**
- Fetch API for JSON data loading
- URLSearchParams for category filtering
- History API for navigation (window.history.back())
- DOM Manipulation APIs for dynamic content rendering
- Event listeners for user interactions

### Asset Dependencies

**Static Assets**
- Favicon: `images/favicon.ico`
- Mascot image: `images/mascot.jpeg` (used in social media meta tags)
- Cultural content images: `images/cameron_highlands.jpg`, etc.
- No indication of image processing or optimization pipeline