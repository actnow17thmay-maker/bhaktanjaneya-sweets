// Editable marketing & policy copy. Kept in one place so the owner (or the
// backend later) can update wording without touching page components.

export const aboutContent = {
  intro:
    "Bhaktanjaneya Sweets began in a family kitchen with a simple promise — pure ghee, fresh ingredients, and absolutely no artificial flavour. Today we bring those same time-honoured recipes to your doorstep.",
  story: [
    "What started as sweets made for family and festivals slowly grew into a small-batch kitchen trusted by Telugu homes across the country.",
    "We still make everything the way we always have: in small batches, with premium ingredients, and with the patience that traditional recipes demand. Nothing leaves our kitchen unless we would happily serve it at our own table.",
    "Whether it is a festive box of Kaju Patisa or an everyday packet of Agra Mixture, every order carries the same care that started it all.",
  ],
  stats: [
    { value: "100%", label: "Pure ghee" },
    { value: "8+", label: "Signature items" },
    { value: "5★", label: "Customer rated" },
    { value: "Fresh", label: "Made to order" },
  ],
};

export const bulkContent = {
  intro:
    "Planning a wedding, festival, or corporate gifting order? We make bulk ordering simple, with custom packaging and pricing for large quantities.",
  benefits: [
    {
      title: "Festivals & Weddings",
      text: "Assorted boxes and hampers in the quantities you need, packed fresh for the occasion.",
    },
    {
      title: "Corporate Gifting",
      text: "Branded or custom-packed gift boxes for clients and teams, delivered on schedule.",
    },
    {
      title: "Best Bulk Pricing",
      text: "Special per-kg pricing on large orders — the bigger the order, the better the rate.",
    },
    {
      title: "Made to Order",
      text: "Everything is prepared fresh for your delivery date, never sitting on a shelf.",
    },
  ],
};

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: "How do I place an order?",
    a: "Add items to your cart and check out on WhatsApp. We'll confirm availability, the final total, and delivery details with you directly.",
  },
  {
    q: "Do you use pure ghee?",
    a: "Yes. Every sweet is made with 100% pure ghee and natural ingredients — never any artificial flavour or hydrogenated fats.",
  },
  {
    q: "How fresh are the products?",
    a: "We make everything in small batches, often to order, so your sweets and namkeen reach you as fresh as possible.",
  },
  {
    q: "What areas do you deliver to?",
    a: "We deliver across India. Shipping is free on orders above ₹700; smaller orders have shipping confirmed at checkout.",
  },
  {
    q: "Can I place a bulk or gifting order?",
    a: "Absolutely. Visit our Bulk Orders page or message us on WhatsApp and we'll help you put together the perfect order with custom packaging.",
  },
  {
    q: "When will online card/UPI payment be available?",
    a: "Secure online payments (cards, UPI, netbanking via Razorpay) are coming soon. For now, ordering on WhatsApp is quick and easy.",
  },
];

export interface PolicySection {
  heading: string;
  body: string[];
}

export interface Policy {
  title: string;
  updated: string;
  intro: string;
  sections: PolicySection[];
}

export const policies: Record<string, Policy> = {
  shipping: {
    title: "Shipping Policy",
    updated: "2026-05-01",
    intro:
      "We aim to get your sweets and namkeen to you as fresh as possible. Here's how shipping works.",
    sections: [
      {
        heading: "Delivery areas & charges",
        body: [
          "We deliver across India. Shipping is free on all orders above ₹700.",
          "For orders below ₹700, a small shipping charge is confirmed with you at the time of order.",
        ],
      },
      {
        heading: "Dispatch & delivery time",
        body: [
          "Because items are made fresh, orders are typically dispatched within 1–3 business days.",
          "Delivery timelines depend on your location and courier; we'll share tracking details where available.",
        ],
      },
      {
        heading: "Packaging",
        body: [
          "All products are sealed and packed to preserve freshness during transit.",
        ],
      },
    ],
  },
  returns: {
    title: "Returns & Refunds",
    updated: "2026-05-01",
    intro:
      "As we deal in fresh food products, we follow food-safety best practices for returns.",
    sections: [
      {
        heading: "Perishable items",
        body: [
          "For hygiene and safety reasons, sweets and namkeen cannot be returned once delivered.",
        ],
      },
      {
        heading: "Damaged or incorrect orders",
        body: [
          "If your order arrives damaged, spoiled, or incorrect, contact us within 24 hours of delivery with photos.",
          "We will arrange a replacement or refund after verifying the issue.",
        ],
      },
      {
        heading: "How to reach us",
        body: [
          "Message us on WhatsApp or email with your order details and we'll resolve it quickly.",
        ],
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    updated: "2026-05-01",
    intro:
      "We respect your privacy and only collect the information needed to process your orders.",
    sections: [
      {
        heading: "Information we collect",
        body: [
          "We collect your name, phone number, and delivery details when you place an order or log in.",
          "Your phone number is used to verify your identity (OTP) and to confirm and update your orders.",
        ],
      },
      {
        heading: "How we use it",
        body: [
          "Your information is used solely to process orders, provide support, and (if you opt in) share offers.",
          "We do not sell your personal information to third parties.",
        ],
      },
      {
        heading: "Payments",
        body: [
          "When online payments launch, transactions are processed securely by our payment partner. We never store your card details.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    updated: "2026-05-01",
    intro:
      "By using this website and placing orders, you agree to the following terms.",
    sections: [
      {
        heading: "Orders & pricing",
        body: [
          "All orders are subject to availability and confirmation. Prices are shown in INR and may change without notice.",
          "We reserve the right to cancel any order; in such cases any amount paid will be refunded.",
        ],
      },
      {
        heading: "Product information",
        body: [
          "We try to describe products as accurately as possible. Slight variations in appearance may occur as items are handmade.",
        ],
      },
      {
        heading: "Contact",
        body: [
          "For any questions about these terms, please reach out to us via WhatsApp or email.",
        ],
      },
    ],
  },
};

export const policySlugs = Object.keys(policies);
