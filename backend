// ============================================
// PORTFOLIO WEBSITE - BACKEND STRUCTURE
// ============================================

// 1. DATA CONFIGURATION
// ============================================

// config/siteData.js
export const siteData = {
  // Personal Information
  profile: {
    name: "Your Name",
    title: "Your Professional Title",
    email: "your.email@example.com",
    location: "City, Country",
    bio: "Brief professional bio that appears on home page",
    profileImage: "/images/profile.jpg", // Path to your profile picture
  },

  // Social Links
  socialLinks: {
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/yourusername",
    twitter: "https://twitter.com/yourhandle", // Optional
    email: "mailto:your.email@example.com",
    portfolio: "https://yourportfolio.com", // Optional
    resume: "/documents/resume.pdf", // Optional
  },

  // About Page Content
  about: {
    headline: "About Me",
    introduction: "Detailed introduction paragraph...",
    sections: [
      {
        title: "Background",
        content: "Your professional background and journey..."
      },
      {
        title: "Skills",
        items: [
          { category: "Frontend", skills: ["React", "TypeScript", "CSS"] },
          { category: "Backend", skills: ["Node.js", "Python", "PostgreSQL"] },
          { category: "Tools", skills: ["Git", "Docker", "AWS"] }
        ]
      },
      {
        title: "Education",
        items: [
          {
            degree: "Degree Name",
            institution: "University Name",
            year: "2020-2024",
            description: "Relevant coursework or achievements"
          }
        ]
      },
      {
        title: "Experience",
        items: [
          {
            role: "Job Title",
            company: "Company Name",
            period: "2023 - Present",
            description: "Key responsibilities and achievements",
            highlights: ["Achievement 1", "Achievement 2"]
          }
        ]
      }
    ]
  },

  // Projects Data
  projects: [
    {
      id: 1,
      title: "Project Name 1",
      slug: "project-name-1",
      category: "Web Development",
      year: "2024",
      featured: true,
      thumbnail: "/images/projects/project1-thumb.jpg",
      images: [
        "/images/projects/project1-1.jpg",
        "/images/projects/project1-2.jpg"
      ],
      description: "Brief description of the project",
      longDescription: "Detailed description of the project, the problem it solves, your approach, etc.",
      technologies: ["React", "Node.js", "MongoDB"],
      features: [
        "Key feature 1",
        "Key feature 2",
        "Key feature 3"
      ],
      links: {
        live: "https://project-url.com",
        github: "https://github.com/yourusername/project",
        demo: "https://demo-url.com" // Optional
      },
      challenges: "Challenges faced and how you overcame them",
      outcome: "Results and impact of the project"
    },
    {
      id: 2,
      title: "Project Name 2",
      slug: "project-name-2",
      category: "Mobile App",
      year: "2023",
      featured: false,
      thumbnail: "/images/projects/project2-thumb.jpg",
      description: "Brief description of the project",
      longDescription: "Detailed description...",
      technologies: ["React Native", "Firebase"],
      features: ["Feature 1", "Feature 2"],
      links: {
        github: "https://github.com/yourusername/project2"
      }
    }
    // Add more projects as needed
  ]
};

// ============================================
// 2. API ROUTES (Next.js App Router example)
// ============================================

// app/api/profile/route.js
import { NextResponse } from 'next/server';
import { siteData } from '@/config/siteData';

export async function GET() {
  return NextResponse.json({
    profile: siteData.profile,
    socialLinks: siteData.socialLinks
  });
}

// app/api/about/route.js
import { NextResponse } from 'next/server';
import { siteData } from '@/config/siteData';

export async function GET() {
  return NextResponse.json(siteData.about);
}

// app/api/projects/route.js
import { NextResponse } from 'next/server';
import { siteData } from '@/config/siteData';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get('featured');
  const category = searchParams.get('category');
  
  let projects = [...siteData.projects];
  
  // Filter by featured if requested
  if (featured === 'true') {
    projects = projects.filter(p => p.featured);
  }
  
  // Filter by category if provided
  if (category) {
    projects = projects.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  return NextResponse.json(projects);
}

// app/api/projects/[slug]/route.js
import { NextResponse } from 'next/server';
import { siteData } from '@/config/siteData';

export async function GET(request, { params }) {
  const project = siteData.projects.find(p => p.slug === params.slug);
  
  if (!project) {
    return NextResponse.json(
      { error: 'Project not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(project);
}

// ============================================
// 3. UTILITY FUNCTIONS
// ============================================

// utils/dataHelpers.js

// Get featured projects
export const getFeaturedProjects = (projects, limit = 3) => {
  return projects
    .filter(project => project.featured)
    .slice(0, limit);
};

// Get projects by category
export const getProjectsByCategory = (projects, category) => {
  return projects.filter(
    project => project.category.toLowerCase() === category.toLowerCase()
  );
};

// Get unique categories
export const getCategories = (projects) => {
  const categories = new Set(projects.map(p => p.category));
  return Array.from(categories);
};

// Sort projects by year
export const sortProjectsByYear = (projects, ascending = false) => {
  return [...projects].sort((a, b) => {
    const yearA = parseInt(a.year);
    const yearB = parseInt(b.year);
    return ascending ? yearA - yearB : yearB - yearA;
  });
};

// Search projects
export const searchProjects = (projects, query) => {
  const lowercaseQuery = query.toLowerCase();
  return projects.filter(project =>
    project.title.toLowerCase().includes(lowercaseQuery) ||
    project.description.toLowerCase().includes(lowercaseQuery) ||
    project.technologies.some(tech => 
      tech.toLowerCase().includes(lowercaseQuery)
    )
  );
};

// ============================================
// 4. DATA FETCHING HOOKS (React)
// ============================================

// hooks/useProfile.js
import { useState, useEffect } from 'react';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile');
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading, error };
};

// hooks/useProjects.js
import { useState, useEffect } from 'react';

export const useProjects = (options = {}) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const params = new URLSearchParams();
        if (options.featured) params.append('featured', 'true');
        if (options.category) params.append('category', options.category);
        
        const response = await fetch(`/api/projects?${params}`);
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [options.featured, options.category]);

  return { projects, loading, error };
};

// ============================================
// 5. SEO METADATA GENERATOR
// ============================================

// utils/seo.js
export const generateMetadata = (page, data = {}) => {
  const baseMetadata = {
    title: 'Your Name - Portfolio',
    description: 'Professional portfolio showcasing my work and projects',
    url: 'https://yourwebsite.com',
    image: '/images/og-image.jpg',
    twitter: '@yourhandle'
  };

  const pageMetadata = {
    home: {
      title: baseMetadata.title,
      description: baseMetadata.description,
    },
    about: {
      title: `About - ${baseMetadata.title}`,
      description: 'Learn more about my background, skills, and experience',
    },
    projects: {
      title: `Projects - ${baseMetadata.title}`,
      description: 'Explore my portfolio of projects and work',
    },
    project: {
      title: `${data.title} - ${baseMetadata.title}`,
      description: data.description || baseMetadata.description,
      image: data.thumbnail || baseMetadata.image,
    }
  };

  return pageMetadata[page] || baseMetadata;
};

// ============================================
// 6. CONTACT FORM HANDLER
// ============================================

// app/api/contact/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Send email using a service like SendGrid, Resend, or Nodemailer
    // 2. Save to database if needed
    // 3. Send confirmation email to user

    // Example with a placeholder for email service
    // await sendEmail({
    //   to: 'your.email@example.com',
    //   from: email,
    //   subject: subject || 'New Contact Form Submission',
    //   text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    // });

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

// ============================================
// 7. ENVIRONMENT VARIABLES (.env.local)
// ============================================

/*
# Database (if using)
DATABASE_URL=your_database_url

# Email Service
EMAIL_SERVICE_API_KEY=your_api_key
EMAIL_FROM=noreply@yourwebsite.com
EMAIL_TO=your.email@example.com

# Analytics (optional)
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# API URLs
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Image Storage (if using external service)
CLOUDINARY_URL=your_cloudinary_url
*/

// ============================================
// 8. PACKAGE.JSON DEPENDENCIES
// ============================================

/*
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "typescript": "^5.0.0"
  }
}
*/
