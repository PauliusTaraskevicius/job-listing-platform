"use server";

import stripe from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";

export async function createCheckoutSession(priceId: string) {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/nustatymai/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    customer_email: user.emailAddresses[0].emailAddress,
    subscription_data: {
      metadata: {
        userId: user.id,
      },
    },
    custom_text: {
      terms_of_service_acceptance: {
        message: `Perskaičiau DarbasMan sąlygas ir [privatumo politikas](${process.env.NEXT_PUBLIC_BASE_URL}/privatumo_politika)`,
      },
    },
    consent_collection: {
      terms_of_service: "required",
    },
  });

  if (!session.url) {
    throw new Error("Failed to create checkout session");
  }

  return session.url;
}
