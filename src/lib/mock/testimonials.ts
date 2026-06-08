export interface Testimonial {
  name: string;
  role?: string;
  quote: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Lakshmi Prasad",
    role: "Hyderabad",
    quote:
      "The Kaju Patisa tastes exactly like my grandmother used to make. Fresh, pure ghee, and beautifully packed.",
    initials: "LP",
  },
  {
    name: "Ravi Teja",
    role: "Vijayawada",
    quote:
      "Ordered the Agra Mixture for Diwali — crunchy, perfectly spiced, and delivered on time. Highly recommend!",
    initials: "RT",
  },
  {
    name: "Sneha Reddy",
    role: "Bengaluru",
    quote:
      "Finally a sweets brand that doesn't use artificial flavours. The Junnu was a delightful surprise.",
    initials: "SR",
  },
  {
    name: "Anil Kumar",
    role: "Corporate gifting",
    quote:
      "We ordered bulk gift boxes for our office. Professional service and everyone loved the quality.",
    initials: "AK",
  },
];
