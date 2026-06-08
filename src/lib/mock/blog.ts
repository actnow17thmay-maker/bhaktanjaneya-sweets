export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  cover: string;
  readMinutes: number;
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "the-story-behind-bhaktanjaneya-sweets",
    title: "The Story Behind Bhaktanjaneya Sweets",
    excerpt:
      "How a family kitchen and a devotion to purity grew into a sweets brand trusted across Telugu homes.",
    date: "2026-05-20",
    author: "Bhaktanjaneya Sweets",
    cover: "/images/categories/sweets.svg",
    readMinutes: 4,
    content: [
      "Bhaktanjaneya Sweets began the way most good things do — in a home kitchen, with recipes passed down through generations.",
      "Every sweet we make starts with a simple promise: pure ghee, fresh ingredients, and absolutely no artificial flavouring. It is the same promise our family has kept for decades.",
      "Today we bring those same recipes to your doorstep, made fresh in small batches so that every bite tastes the way it should — like home.",
    ],
  },
  {
    slug: "why-we-make-everything-in-pure-ghee",
    title: "Why We Make Everything in Pure Ghee",
    excerpt:
      "Pure ghee is more than tradition — it is the secret to flavour, aroma, and the melt-in-your-mouth texture you love.",
    date: "2026-05-05",
    author: "Bhaktanjaneya Sweets",
    cover: "/images/categories/namkeen.svg",
    readMinutes: 3,
    content: [
      "Ask anyone who grew up on homemade sweets and they will tell you: nothing replaces the aroma of pure ghee.",
      "We never cut corners with cheaper oils. Pure ghee gives our Kaju Patisa its richness, our laddus their softness, and our namkeen its unmistakable crunch.",
      "It costs more and takes more care — but it is the difference between a sweet you eat and a sweet you remember.",
    ],
  },
  {
    slug: "gifting-sweets-for-festivals-and-occasions",
    title: "Gifting Sweets for Festivals & Occasions",
    excerpt:
      "From Diwali hampers to wedding boxes, here is how to choose the perfect sweet gift for every celebration.",
    date: "2026-04-18",
    author: "Bhaktanjaneya Sweets",
    cover: "/images/categories/sweets.svg",
    readMinutes: 5,
    content: [
      "Sweets are at the heart of every Indian celebration. The right box says more than words ever could.",
      "For festivals, our assorted boxes mix classic favourites so there is something for everyone. For weddings and corporate gifting, we offer bulk orders with custom packaging.",
      "Planning a large order? Reach out on WhatsApp and we will help you put together the perfect hamper.",
    ],
  },
];
