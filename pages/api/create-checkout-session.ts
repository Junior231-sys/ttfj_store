import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import products from "../../../data/products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2022-11-15" });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { id } = req.body;
  const product = products.find(p => p.id === id);
  if (!product) return res.status(400).json({ error: "Produit introuvable" });

  try {
    const amountInCents = Math.round(product.priceEUR * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "eur",
          product_data: { name: product.name, description: product.description },
          unit_amount: amountInCents
        },
        quantity: 1
      }],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/product/${product.id}`
    });

    return res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return res.status(500).json({ error: "Erreur Stripe", details: String(err) });
  }
}
