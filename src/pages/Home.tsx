import { ArrowRight, ArrowDown, Users, Dumbbell, User, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import TestimonialCard from '../components/TestimonialCard';
import BrandLogo from '../components/BrandLogo';
import DynamicCounter from '../components/DynamicCounter';
import { useContent } from '../contexts/ContentContext';

export default function Home() {
  const { content } = useContent();
  const { hero, counters, brands, journey, mission, testimonials } = content.home;

  return (
    <div className="min-h-screen bg-background-main">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <div className="relative h-full">
            <img
              src={hero.backgroundImage}
              alt="Professional athlete training"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background-main/95 via-background-main/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background-main via-background-main/50 to-transparent" />
          </div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="pt-20 lg:pt-0">
              <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6 leading-tight">
                {hero.title}
              </h1>
              <p className="text-xl text-text-secondary mb-8 max-w-2xl leading-relaxed">
                {hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-text-primary bg-accent-primary hover:bg-accent-hover transition-colors duration-300 rounded-none group"
                >
                  Explore Collection
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium border-2 border-text-primary text-text-primary hover:bg-text-primary hover:text-background-main transition-colors duration-300 rounded-none group"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Get Coaching
                </Link>
              </div>
              
              <div className="grid grid-cols-3 gap-8 mt-16">
                <div>
                  <DynamicCounter baseValue={counters.trainersCount} minIncrease={1} maxIncrease={5} />
                  <p className="text-text-secondary mt-2">Personal Trainers Supported</p>
                </div>
                <div>
                  <span className="text-3xl font-bold text-accent-primary">{counters.satisfactionRate}%</span>
                  <p className="text-text-secondary mt-2">Satisfaction Rate</p>
                </div>
                <div>
                  <span className="text-3xl font-bold text-accent-primary">24/7</span>
                  <p className="text-text-secondary mt-2">Expert Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-text-primary animate-bounce">
          <ArrowDown className="h-8 w-8" />
        </div>
      </section>

      {/* Brand Showcase */}
      <section className="py-16 bg-background-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-4 text-text-primary">{brands.heading}</h2>
          <p className="text-text-secondary text-center max-w-2xl mx-auto">
            {brands.subheading}
          </p>
        </div>
        <div className="brands-container relative w-full overflow-hidden">
          <div className="brands-scroll flex items-center">
            {[...brands.brands, ...brands.brands].map((brand, index) => (
              <BrandLogo
                key={index}
                name={brand.name}
                logo={brand.logo}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Start Your Journey Section */}
      <section className="py-24 bg-background-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {journey.cards.map((card, index) => (
              <div key={index} className="group bg-background-card border border-ui-border hover:border-accent-primary transition-colors duration-300 flex flex-col">
                <div className="p-8 flex-grow">
                  <div className="mb-6 flex justify-center">
                    {index === 0 && <Dumbbell className="h-16 w-16 text-accent-primary" />}
                    {index === 1 && <User className="h-16 w-16 text-accent-primary" />}
                    {index === 2 && <Building2 className="h-16 w-16 text-accent-primary" />}
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary text-center mb-4">{card.title}</h3>
                  <p className="text-text-secondary text-center mb-6">
                    {card.subtitle}
                  </p>
                  <ul className="space-y-3 mb-8 text-text-secondary">
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 text-accent-primary mr-2" />
                      {card.bullet1}
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 text-accent-primary mr-2" />
                      {card.bullet2}
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 text-accent-primary mr-2" />
                      {card.bullet3}
                    </li>
                  </ul>
                </div>
                <Link
                  to="/products"
                  className="block w-full text-center py-4 px-6 bg-accent-primary text-text-primary hover:bg-accent-hover transition-colors duration-300 mt-auto"
                >
                  {card.buttonLabel}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-24 bg-background-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-text-primary">{mission.heading}</h2>
            <p className="text-xl text-text-secondary leading-relaxed mb-12">
              {mission.content}
            </p>
            <div className="flex justify-center gap-6">
              <Link
                to="/about#team-section"
                className="px-6 py-3 bg-accent-primary text-text-primary hover:bg-accent-hover transition-colors duration-300"
              >
                Meet the Team
              </Link>
              <Link
                to="/about#mission-section"
                className="px-6 py-3 border-2 border-text-primary text-text-primary hover:bg-text-primary hover:text-background-main transition-colors duration-300"
              >
                Our Mission
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background-section overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <h2 className="text-4xl font-bold text-center mb-4 text-text-primary">What Our Clients Say</h2>
          <p className="text-text-secondary text-center max-w-2xl mx-auto">
            Hear from the professionals and enthusiasts who trust Be Inspired for their fitness journey.
          </p>
        </div>
        <div className="testimonials-container relative w-full overflow-hidden">
          <div className="testimonials-scroll flex">
            {[...testimonials.testimonials, ...testimonials.testimonials].map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                role={testimonial.role}
                company={testimonial.company}
                quote={testimonial.quote}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}