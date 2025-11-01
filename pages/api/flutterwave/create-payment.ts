import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    const { amount, email, phone, name } = req.body;

    if (!amount || !email || !phone || !name) {
      return res.status(400).json({ error: "Informations de paiement manquantes" });
    }

    // Appel vers notre API Flutterwave interne
    const response = await axios.post("http://localhost:3000/api/flutterwave", {
      amount,
      email,
      phone,
      name,
    });

    return res.status(200).json(response.data);
  } catch (error: any) {
    console.error("Erreur create-payments:", error.response?.data || error.message);
    return res.status(500).json({ error: "Erreur lors de la création du paiement" });
  }
}