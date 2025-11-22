import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripeInstance) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error("STRIPE_SECRET_KEY is not defined");
    }
    stripeInstance = new Stripe(secretKey, {
      apiVersion: "2025-03-31.basil",
    });
  }
  return stripeInstance;
}

// Lazy initialization using Proxy - only creates stripe instance when actually accessed
// This prevents build-time errors when env vars aren't available during build
const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    const instance = getStripe();
    const value = (instance as any)[prop];
    return typeof value === 'function' ? value.bind(instance) : value;
  },
});

export default stripe;
