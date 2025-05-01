import { createContext, useContext, useState, ReactNode } from 'react';
import { TESTIMONIALS, BRAND_LOGOS } from '../constants/assets';

interface ContentContextType {
  content: Record<string, any>;
  updateContent: (page: string, data: any) => void;
  previewContent?: Record<string, any>;
  setPreviewContent?: (content: Record<string, any> | undefined) => void;
}

// Initial content structure that matches the actual website components
const defaultContent = {
  home: {
    hero: {
      title: "Transform Your Vision Into Reality",
      subtitle: "Supporting the coaches who change lives — and the individuals ready to transform theirs.",
      backgroundImage: "https://i.imgur.com/ww7VKq5.jpeg",
      button1: {
        label: "Explore Collection",
        url: "/products"
      },
      button2: {
        label: "Get Coaching",
        url: "/contact"
      }
    },
    counters: {
      trainersCount: 9536,
      satisfactionRate: 98,
      supportType: "24/7 Expert Support"
    },
    brands: {
      heading: "Experience with Leading Brands",
      subheading: "We've helped build and lead within the world’s top fitness brands — giving us unique insight into what drives success.",
      brands: BRAND_LOGOS
    },
    journey: {
      cards: [
        {
          title: "I'm a Personal Trainer",
          subtitle: "Access premium business tools, education resources, and professional-grade equipment.",
          bullet1: "Business development tools",
          bullet2: "Professional certification",
          bullet3: "Employment and business opportunities",
          buttonLabel: "Start today",
          buttonUrl: "/products"
        },
        {
          title: "I'm Here to Get Fit & Feel Better",
          subtitle: "Access personal coaching and the tools to transform your health.",
          bullet1: "Online coaching programs",
          bullet2: "Training equipment",
          bullet3: "Flexible workouts for home or gym",
          buttonLabel: "Start Training",
          buttonUrl: "/products"
        },
        {
          title: "I'm a Gym Owner",
          subtitle: "Drive growth, streamline operations, and empower your training team with our proven systems",
          bullet1: "End-to-end PT Management",
          bullet2: "Recruitment solutions",
          bullet3: "Take a hands off approach to PT",
          buttonLabel: "Partner With Us",
          buttonUrl: "/products"
        }
      ]
    },
    mission: {
      heading: "Our Mission",
      content: "We're on a mission to support Personal Trainers, Gym Owners, and everyday individuals with the knowledge, tools, and systems to thrive — in and out of the gym.",
      button1: {
        label: "Meet the Team",
        url: "/team"
      },
      button2: {
        label: "Our Vision",
        url: "/vision"
      }
    },
    testimonials: {
      testimonials: TESTIMONIALS
    },
    newsletter: {
      heading: "Stay Updated",
      subheading: "Subscribe to our newsletter for exclusive offers, new product releases, and expert fitness advice.",
      placeholder: "Enter your email",
      buttonLabel: "Subscribe"
    }
  },
  about: {
    hero: {
      title: "Building the Future of Fitness — Together",
      subtitle: "We're on a mission to support Personal Trainers, Gym Owners, and everyday individuals with the knowledge, tools, and systems to thrive — in and out of the gym.",
      backgroundImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
      button1: {
        label: "Contact us",
        url: "/products"
      },
      button2: {
        label: "Meet the Team",
        url: "#team-section"
      }
    },
    stats: {
      trainersCount: 9536,
      countriesCount: 30,
      livesCount: 125000,
      satisfactionRate: 98
    },
    story: {
      heading: "Our Story",
      content: "The Be Inspired Group has been making an impact across multiple industries for nearly 15 years. It all began with Be Inspired Fitness and Coaching, our PT management company, which gradually expanded into further Be Inspired companies being launched, that now comprise our diverse brand.\n\nThis unique collaboration of all of the Be Inspired businesses is the driving force behind the exceptional performance and results that our clients experience.\n\nAs we continued to add new business under the Be Inspired Group, it became increasingly evident that we could provide a powerful service by covering all aspects of our clients' needs. With more Be Inspired businesses engaged by a client, the more significant results we delivered.",
      milestones: [
        {
          year: 2020,
          title: "The Beginning",
          description: "Founded with a mission to transform the fitness industry through education and support."
        },
        {
          year: 2021,
          title: "Digital Evolution",
          description: "Launched our first online education platform and business development programs."
        },
        {
          year: 2022,
          title: "Global Expansion",
          description: "Expanded operations to 30+ countries, helping trainers worldwide."
        },
        {
          year: 2023,
          title: "Industry Innovation",
          description: "Introduced revolutionary PT management and recruitment services."
        },
        {
          year: 2024,
          title: "Community Growth",
          description: "Built a thriving community of over 10,000 fitness professionals."
        }
      ]
    },
    mission: {
      heading: "Our Mission",
      description: "We're on a mission to support Personal Trainers, Gym Owners, and everyday individuals with the knowledge, tools, and systems to thrive — in and out of the gym.",
      beliefs: [
        {
          title: "Exercise is the Best Medicine",
          description: "We believe in the transformative power of movement and its ability to change lives.",
          icon: "Dumbbell"
        },
        {
          title: "Coaches Deserve Better Support",
          description: "Every fitness professional should have access to world-class education and business tools.",
          icon: "Users"
        },
        {
          title: "Science Should Be Accessible",
          description: "Complex research should be translated into practical, actionable strategies.",
          icon: "Brain"
        },
        {
          title: "Results Through Innovation",
          description: "Continuous improvement and adaptation drive better outcomes for everyone.",
          icon: "Star"
        },
        {
          title: "Success is Holistic",
          description: "True transformation encompasses physical, mental, and business growth.",
          icon: "Trophy"
        },
        {
          title: "Global Impact",
          description: "We're building a worldwide community of exceptional fitness professionals.",
          icon: "Globe"
        }
      ]
    },
    team: {
      heading: "Meet the Team Behind the Mission",
      members: [
        {
          name: "James Hunt",
          role: "Co-Director",
          bio: "Former elite athlete turned exercise scientist, passionate about bridging the gap between research and real-world results.",
          extendedBio: "With over 15 years of industry experience, James has helped transform countless fitness businesses and professionals.",
          image: "https://i.imgur.com/zWOr7yy.png"
        },
        {
          name: "Jason Santiago",
          role: "Co-Director",
          bio: "Specializing in translating complex research into practical applications for fitness professionals.",
          extendedBio: "Leading our educational initiatives, Jason combines his background in sports science with 12 years of hands-on coaching experience.",
          image: "https://i.imgur.com/OS8XCxz.png"
        },
        {
          name: "Jake Powell",
          role: "National Business Manager",
          bio: "Helping gym owners and trainers build sustainable, profitable businesses that change lives.",
          extendedBio: "Former gym chain executive who has helped over 500 fitness businesses scale their operations effectively.",
          image: "https://i.imgur.com/bHwVB9Y.png"
        },
        {
          name: "Zoe Castellenos",
          role: "Head of Female Program Design",
          bio: "Dedicated to elevating the standard of personal training worldwide.",
          extendedBio: "20+ years in the fitness industry, having mentored more than 1,000 trainers to business success.",
          image: "https://i.imgur.com/jmfgQqF.png"
        },
        {
          name: "Dennis Tasiou",
          role: "NSW State Manager",
          bio: "Dedicated to elevating the standard of personal training worldwide.",
          extendedBio: "20+ years in the fitness industry, having mentored more than 1,000 trainers to business success.",
          image: "https://i.imgur.com/tcFTy2Y.png"
        },
        {
          name: "Blair Sheppard",
          role: "VIC State Manager",
          bio: "Dedicated to elevating the standard of personal training worldwide.",
          extendedBio: "20+ years in the fitness industry, having mentored more than 1,000 trainers to business success.",
          image: "https://i.imgur.com/dBcDMNS.png"
        },
        {
          name: "Lucy Lay",
          role: "Admin Assistant",
          bio: "Dedicated to elevating the standard of personal training worldwide.",
          extendedBio: "20+ years in the fitness industry, having mentored more than 1,000 trainers to business success.",
          image: "https://i.imgur.com/VRMZ1Cb.png"
        },
        {
          name: "Rhett Spiller",
          role: "VIC Regional Fitness Manager",
          bio: "Dedicated to elevating the standard of personal training worldwide.",
          extendedBio: "20+ years in the fitness industry, having mentored more than 1,000 trainers to business success.",
          image: "https://i.imgur.com/rORp742.png"
        },
        {
          name: "Tatum Wilder",
          role: "Customer Success Manager",
          bio: "Dedicated to elevating the standard of personal training worldwide.",
          extendedBio: "20+ years in the fitness industry, having mentored more than 1,000 trainers to business success.",
          image: "https://i.imgur.com/JHKf5YC.png"
        },
        {
          name: "Isabella Bianchi",
          role: "Head of Finance",
          bio: "Dedicated to elevating the standard of personal training worldwide.",
          extendedBio: "20+ years in the fitness industry, having mentored more than 1,000 trainers to business success.",
          image: "https://i.imgur.com/fscxsRH.png"
        }
      ]
    },
    cta: {
      heading: "Join the Movement",
      subheading: "Whether you're a trainer looking to grow your business, a gym owner seeking solutions, or someone passionate about fitness, there's a place for you in our community.",
      button1: {
        label: "Explore Our Solutions",
        url: "/products"
      },
      button2: {
        label: "Get in Touch",
        url: "/contact"
      }
    }
  },
  products: {
    hero: {
      title: "The Vault",
      subtitle: "Tools to Build Your Body, Your Business, or Both.",
      backgroundImage: "https://i.imgur.com/sjJ3lPF.jpeg"
    }
  },
  contact: {
    hero: {
      title: "Let's Connect",
      subtitle: "Got questions? We're here to help — whether you're a coach, gym owner, or client.",
      backgroundImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216"
    }
  }
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Deep merge function to properly merge nested objects
function deepMerge(target: any, source: any) {
  const result = { ...target };
  
  for (const key in source) {
    if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
      if (key in target && typeof target[key] === 'object' && !Array.isArray(target[key])) {
        result[key] = deepMerge(target[key], source[key]);
      } else {
        result[key] = { ...source[key] };
      }
    } else {
      result[key] = source[key];
    }
  }
  
  return result;
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState(defaultContent);
  const [previewContent, setPreviewContent] = useState<Record<string, any> | undefined>(undefined);

  const updateContent = (page: string, data: any) => {
    setContent(prev => {
      const newContent = {
        ...prev,
        [page]: deepMerge(prev[page], data)
      };
      return newContent;
    });
  };

  const value = {
    content: previewContent || content,
    updateContent,
    previewContent,
    setPreviewContent
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
}