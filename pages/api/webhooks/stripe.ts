import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import fs from "fs";
import path from "path";
import { sendOrderEmail } from "../../../lib/sendEmail";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2022-11-15" });
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
const ordersFile = path.join(process.cwd(), "data", "orders.json");

export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable: any) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err: any) {
    console.error("⚠️ Erreur de vérification Stripe:", err.message);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const order = {
      id: session.id,
      provider: "stripe",
      amount: session.amount_total! / 100,
      currency: session.currency,
      customer_email: session.customer_details?.email,
      status: "paid",
      date: new Date().toISOString(),
    };

    const orders = JSON.parse(fs.readFileSync(ordersFile, "utf8"));
    orders.push(order);
    fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));

    console.log("✅ Commande Stripe enregistrée :", order);

    if (session.customer_details?.email) {
      await sendOrderEmail({
        to: session.customer_details.email,
        order,
      });
    }
  }

  res.status(200).json({ received: true });
}
