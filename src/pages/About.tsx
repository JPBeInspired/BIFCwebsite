import { useState, useEffect } from 'react';
import { ArrowRight, Users, Dumbbell, Brain, Star, Trophy, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import DynamicCounter from '../components/DynamicCounter';
import { BRAND } from '../constants/assets';

const TEAM = [
  {
    name: 'James Hunt',
    role: 'Co-Director',
    image: 'https://i.imgur.com/zWOr7yy.png',
    bio: 'Multi-site business owner, with a passion for supporting and developing individuals across all aspects of business.',
    extended: 'With over 30 years of industry experience, James has helped transform countless fitness businesses and professionals.'
  },
  {
    name: 'Jason Santiago',
    role: 'Co-Director',
    image: 'https://i.imgur.com/OS8XCxz.png',
    bio: 'Former gym owner, Fuelled by a relentless drive to help people grow, lead, and succeed in every area of their lives. ',
    extended: 'Jason combines his teaching background with over 20 years of fitness industry experience to deliver results.'
  },
  {
    name: 'Jake Powell',
    role: 'National Business Manager',
    image: 'https://i.imgur.com/bHwVB9Y.png',
    bio: 'Oversees operations, strategy, and national partnerships to support PT growth across 30+ regions.',
    extended: 'From his early days managing sales and operations at Anytime Fitness to building recruitment pipelines and business development frameworks across the country, Jake has helped thousands of trainers thrive. He has built state-wide PT teams, led recruitment across multiple regions, and now shapes the national vision for Be Inspired Fitness & Coaching.'
  },
  {
    name: 'Zoe Castellenos',
    role: 'Head of Female Program Design',
    image: 'https://i.imgur.com/jmfgQqF.png',
    bio: 'Designs coaching systems tailored for female clients and leads our female performance initiatives.',
    extended: 'As a former elite athlete and certified S&C coach, Zoe brings deep expertise in biomechanics and program periodisation. Dedicated to elevating the role of women in the gym'
  },
   {
    name: 'Brenden Clark',
    role: 'National Recruitment Manager',
    image: 'https://i.imgur.com/TPU3HQi.png',
    bio: ' With a strong background in fitness, digital recruitment, and leadership, he connects the right talent with the right opportunities across Australia.',
    extended: 'With a degree in Education and a deep understanding of both people and performance, Brenden has helped shape recruitment strategies for some of Australia’s leading fitness organisations, including Goodlife, Crunch Fitness, and HealthyPeople.com.au.'
  },
  {
    name: 'Dennis Tasiou',
    role: 'NSW State Manager',
    image: 'https://i.imgur.com/tcFTy2Y.png',
    bio: 'Driven by precision, passion, and purpose, Dennis blends martial arts discipline with real-world coaching experience to mentor the next generation of Personal Trainers.',
    extended: 'Dennis has built his reputation on consistency, clarity, and results—both for clients and for the trainers he supports. His ability to blend traditional discipline with modern tools makes him a standout figure in the fitness industry and a valued leader within the Be Inspired network.'
  },
  {
    name: 'Blair Sheppard',
    role: 'VIC State Manager',
    image: 'https://i.imgur.com/dBcDMNS.png',
    bio: 'Culture creator. Lifelong footy tragic. Blair empowers Personal Trainers to grow through connection, leadership and execution.',
    extended: 'Known for his ability to build high-performing teams and thriving gym cultures, Blair thrives on mentoring trainers and empowering leaders. With a background spanning fitness management, coaching, and corporate partnerships, he blends business acumen with a deep understanding of what makes people tick.'
  },
  {
    name: 'Rhett Spiller',
    role: 'VIC Regional Fitness Manager',
    image: 'https://i.imgur.com/rORp742.png',
    bio: 'PT business mentor. Rowing coach. Strategy meets execution. Rhett helps trainers turn potential into performance—on and off the gym floor.',
    extended: 'With a passion for performance and structure, Rhett brings a coaching mindset into everything he does—from team development to client retention strategies. He is as comfortable mentoring new trainers as he is collaborating with club owners to drive results.'
  },
  {
    name: 'Tatum Wilder',
    role: 'Customer Success Manager',
    image: 'https://i.imgur.com/JHKf5YC.png',
    bio: 'A powerhouse of insight and empathy, Tatum is the go-to mentor for fitness professionals who want clarity, confidence, and momentum in their career.',
    extended: 'What sets her apart is not just experience — it is her unwavering belief in people. Tatum is passionate about simplifying complexity, removing roadblocks, and helping trainers unlock the version of themselves they know they are capable of becoming.'
  },
  {
    name: 'Isabella Bianchi',
    role: 'Head of Finance',
    image: 'https://i.imgur.com/fscxsRH.png',
    bio: 'The analytical engine behind Be Inspired — keeping growth scalable, decisions smart, and our global mission financially sound.',
    extended: 'She ensures Be Inspireds operations are both ambitious and sustainable, helping the team expand while staying grounded in data, ethics, and strategy. Whether building new forecasting tools or optimising how we reinvest in our coaches, Isabellas leadership is the reason our mission goes further, faster — without losing sight of what matters.'
  }
];

const MILESTONES = [
  {
    year: 2010,
    title: 'Humble Beginnings',
    description: 'Launched Be Inspired Fitness & Coaching (BIFC) in a single gym in Sydney, Australia.',
    emoji: '🚀'
  },
  {
    year: 2011,
    title: 'Growing Footprint',
    description: 'Expanded operations to support multiple gym sites across NSW.',
    emoji: '🏢'
  },
  {
    year: 2012,
    title: 'Interstate Expansion',
    description: 'Entered Victoria, building PT teams across both NSW and VIC.',
    emoji: '🌏'
  },
  {
    year: 2013,
    title: 'Rapid Growth',
    description: 'Demand exploded, and we doubled the size of our team to meet national needs.',
    emoji: '📈'
  },
  {
    year: 2014,
    title: 'Global Attention',
    description: 'Interest started pouring in from overseas operators and major fitness brands.',
    emoji: '🌍'
  },
  {
    year: 2015,
    title: 'Education Evolution',
    description: 'Our PT Education Program was completely revamped — becoming the industry\'s go-to for aspiring elite Trainers.',
    emoji: '🎓'
  },
  {
    year: 2016,
    title: 'International Expansion',
    description: 'BIFC entered Southeast Asia and began consulting for global fitness brands on successful PT operations.',
    emoji: '✈️'
  },
  {
    year: 2017,
    title: 'Business Transformation',
    description: 'A complete internal restructure was launched, increasing team capacity by 30%.',
    emoji: '🏗️'
  },
  {
    year: 2018,
    title: 'National Reach',
    description: 'BIFC expanded to support gyms across all Australian states and territories.',
    emoji: '🗺️'
  },
  {
    year: 2019,
    title: 'Undisputed Leader',
    description: 'BIFC became Australia\'s largest PT Management company, with over 2,000 Personal Trainers under contract.',
    emoji: '🇦🇺'
  },
  {
    year: 2020,
    title: 'Resilience Amidst Crisis',
    description: 'We survived the chaos (you know what we mean) — and kept pushing forward.',
    emoji: '🛑'
  },
  {
    year: 2021,
    title: 'Recovery Through Innovation',
    description: 'Despite the industry\'s 70% decline in PTs, we continued to perform, adapt, and grow.',
    emoji: '🔥'
  },
  {
    year: 2022,
    title: 'Nationwide Support',
    description: 'BIFC became the go-to PT partner for nearly every major fitness brand in Australia.',
    emoji: '🏆'
  },
  {
    year: 2023,
    title: 'Industry Recognition',
    description: 'BIFC became a recognised name alongside fitness industry giants.',
    emoji: '🏅'
  },
  {
    year: 2024,
    title: 'Program Evolution',
    description: 'Revamped our PT Development Program — now with international traction and demand from trainers around the globe.',
    emoji: '🌐'
  },
  {
    year: 2025,
    title: 'Expansion into B2C & Beyond',
    description: 'BIFC continues to lead as Australia\'s #1 PT Management company, while launching direct-to-consumer solutions and a powerful new suite of products.',
    emoji: '🚀'
  }
];

const BELIEFS = [
  {
    title: 'Exercise is the Best Medicine',
    description: 'We believe in the life-changing power of movement to heal, empower, and inspire lasting transformation.',
    icon: Dumbbell
  },
  {
    title: 'Coaches Deserve Better Support',
    description: 'Fitness professionals deserve more than surface-level advice — they need structured mentorship, proven business tools, and industry-leading education to thrive.',
    icon: Users
  },
  {
    title: 'Science Should Be Accessible',
    description: 'We break down complex research into clear, practical strategies that drive real-world results — in the gym and in business.',
    icon: Brain
  },
  {
    title: 'Driven by Innovation',
    description: 'We never stop evolving. Our programs, tools, and methods are designed to stay ahead of the curve and deliver what truly works.',
    icon: Star
  },
  {
    title: 'Success is Holistic',
    description: 'Transformation is not just physical. We help people grow mentally, emotionally, and professionally — because lasting results require all three.',
    icon: Trophy
  },
  {
    title: 'Global Impact',
    description: "With thousands of coaches supported across 30+ countries, we're leading a worldwide movement that's reshaping the fitness industry.",
    icon: Globe
  }
];

export default function About() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Handle scroll to sections with offset
    const hash = window.location.hash;
    if (hash === '#team-section' || hash === '#mission-section') {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        const offset = 100; // Adjust this value to control the scroll position
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background-main pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <div className="relative h-full">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1920"
              alt="Team working together"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background-main/95 via-background-main/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background-main via-background-main/50 to-transparent" />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6">
              Building the Future of Fitness — Together
            </h1>
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              We're on a mission to support Personal Trainers, Gym Owners, and everyday individuals with the knowledge, tools, and systems to thrive — in and out of the gym.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-accent-primary text-text-primary hover:bg-accent-hover transition-colors group"
              >
                Contact us
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#team-section"
                className="inline-flex items-center px-8 py-4 border-2 border-text-primary text-text-primary hover:bg-text-primary hover:text-background-main transition-colors"
              >
                Meet the Team
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-background-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <DynamicCounter baseValue={9536} minIncrease={1} maxIncrease={5} />
              <p className="text-text-secondary mt-2">Trainers Supported</p>
            </div>
            <div className="text-center">
              <DynamicCounter baseValue={30} minIncrease={0} maxIncrease={1} />
              <p className="text-text-secondary mt-2">Countries Reached</p>
            </div>
            <div className="text-center">
              <DynamicCounter baseValue={125000} minIncrease={10} maxIncrease={50} />
              <p className="text-text-secondary mt-2">Lives Transformed</p>
            </div>
            <div className="text-center">
              <span className="text-3xl font-bold text-accent-primary">98%</span>
              <p className="text-text-secondary mt-2">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-4xl font-bold text-text-primary mb-6">Our Story</h2>
              <div className="space-y-6 text-text-secondary">
                <p>
                  The Be Inspired Group has been making an impact across multiple industries for nearly 15 years. It all began with Be Inspired Fitness and Coaching, our PT management company, which gradually expanded into further Be Inspired companies being launched, that now comprise our diverse brand.
                </p>
                <p>
                  This unique collaboration of all of the Be Inspired businesses is the driving force behind the exceptional performance and results that our clients experience.
                </p>
                <p>
                  As we continued to add new business under the Be Inspired Group, it became increasingly evident that we could provide a powerful service by covering all aspects of our clients' needs. With more Be Inspired businesses engaged by a client, the more significant results we delivered.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="timeline-container overflow-hidden" style={{ height: '600px' }}>
                <div className="timeline-scroll animate-timeline space-y-8 pr-6">
                  {MILESTONES.map((milestone, index) => (
                    <div 
                      key={index} 
                      className="bg-background-card p-6 border border-ui-border hover:border-accent-primary transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-20">
                          <div className="text-2xl font-bold text-accent-primary">
                            {milestone.year}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">{milestone.emoji}</span>
                            <h3 className="text-xl font-bold text-text-primary">
                              {milestone.title}
                            </h3>
                          </div>
                          <p className="text-text-secondary">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Beliefs */}
      <section id="mission-section" className="scroll-mt-32 py-24 bg-background-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-6">Our Mission</h2>
            <p className="text-xl text-text-secondary leading-relaxed mb-8">
              We're on a mission to support Personal Trainers, Gym Owners, and everyday individuals with the knowledge, tools, and systems to thrive — in and out of the gym.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              Our beliefs guide everything we do — from how we support fitness professionals, to how we design education, programs, and tools that truly make a difference. These pillars shape the way we deliver lasting results and create a ripple effect of positive change across the industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BELIEFS.map((belief, index) => (
              <div key={index} className="bg-background-card p-8 border border-ui-border hover:border-accent-primary transition-colors">
                <belief.icon className={`h-12 w-12 text-accent-primary mb-6`} />
                <h3 className="text-xl font-bold text-text-primary mb-4">{belief.title}</h3>
                <p className="text-text-secondary">{belief.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team-section" className="scroll-mt-32 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-text-primary mb-16 text-center">
            Meet the Team Behind the Mission
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((member, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute inset-0 bg-accent-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex items-center justify-center">
                    <p className="text-text-primary text-center">
                      {member.extended}
                    </p>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-1">{member.name}</h3>
                <p className="text-accent-primary mb-2">{member.role}</p>
                <p className="text-text-secondary">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-24 bg-background-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-text-primary mb-6">
            Join the Movement
          </h2>
          <p className="text-xl text-text-secondary mb-12 max-w-3xl mx-auto">
            Whether you're a trainer looking to grow your business, a gym owner seeking solutions, or someone passionate about fitness, there's a place for you in our community.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/contact"
              className="px-8 py-4 bg-accent-primary text-text-primary hover:bg-accent-hover transition-colors"
            >
              Join the Movement
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border-2 border-text-primary text-text-primary hover:bg-text-primary hover:text-background-main transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}