import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    const { amount, email, phone, name } = req.body;

    if (!amount || !email || !phone || !name) {
      return res.status(400).json({ error: "Données manquantes" });
    }

    const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY;

    if (!FLW_SECRET_KEY) {
      return res.status(500).json({ error: "Clé Flutterwave manquante" });
    }

    const response = await axios.post(
      "https://api.flutterwave.com/v3/payments",
      {
        tx_ref: tx-${Date.now()},
        amount,
        currency: "XAF",
        redirect_url: "http://localhost:3000/receipt", // redirection après paiement
        customer: {
          email,
          phonenumber: phone,
          name,
        },
        customizations: {
          title: "TTFJ Store",
          description: "Paiement de commande",
          logo: "https://your-logo-link.com/logo.png",
        },
      },
      {
        headers: {
          Authorization: Bearer ${FLW_SECRET_KEY},
          "Content-Type": "application/json",
        },
      }
    );

    return res.status(200).json(response.data);
  } catch (error: any) {
    console.error("Erreur Flutterwave:", error.response?.data || error.message);
    return res
      .status(500)
      .json({ error: "Erreur lors de la création du paiement Flutterwave" });
  }
}