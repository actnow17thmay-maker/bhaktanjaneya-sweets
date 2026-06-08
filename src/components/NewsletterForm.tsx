"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p className="text-sm text-cream-100">
        Thank you! We&apos;ll keep you posted on fresh batches and offers.
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email.trim()) setDone(true);
      }}
      className="flex w-full max-w-sm gap-2"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        className="h-11 flex-1 rounded-full border border-cream-100/30 bg-cream-50/10 px-4 text-sm text-cream-50 placeholder:text-cream-100/60 focus:outline-none focus:ring-2 focus:ring-saffron-400"
      />
      <Button type="submit" variant="secondary" size="md">
        Subscribe
      </Button>
    </form>
  );
}
