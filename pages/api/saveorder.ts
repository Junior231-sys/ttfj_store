import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    const body = req.body;

    // ✅ Créer une nouvelle commande
    const newOrder = {
      id: `order_${Date.now()}`,
      ...body,
      date: new Date().toISOString(),
    };

    // ✅ Déterminer le chemin du fichier JSON
    const filePath = path.join(process.cwd(), "data", "orders.json");

    // ✅ Lire le fichier existant ou créer un tableau vide
    const raw = fs.existsSync(filePath)
      ? fs.readFileSync(filePath, "utf8")
      : "[]";
    const orders = JSON.parse(raw);

    // ✅ Ajouter la commande
    orders.push(newOrder);

    // ✅ Sauvegarder les commandes mises à jour
    fs.writeFileSync(filePath, JSON.stringify(orders, null, 2), "utf8");

    return res.status(200).json({ message: "Commande enregistrée", newOrder });
  } catch (error) {
    console.error("Erreur saveorder :", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}