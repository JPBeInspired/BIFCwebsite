export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  forProfessionals: boolean;
  features: string[];
  inStock: boolean;
  rating: number;
  personas: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  image: string;
  text: string;
  rating: number;
  transformation?: {
    before: string;
    after: string;
  };
}