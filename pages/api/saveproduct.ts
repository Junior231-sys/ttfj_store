import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    const body = req.body;

    // ✅ Créer un nouveau produit
    const newProduct = {
      id: prod_${Date.now()}, // identifiant unique du produit
      ...body,
      createdAt: new Date().toISOString(),
    };

    // ✅ Déterminer le chemin du fichier JSON
    const filePath = path.join(process.cwd(), "data", "products.json");

    // ✅ Lire le fichier JSON existant, ou créer un tableau vide s'il n'existe pas
    const raw = fs.existsSync(filePath)
      ? fs.readFileSync(filePath, "utf8")
      : "[]";
    const products = JSON.parse(raw);

    // ✅ Ajouter le nouveau produit
    products.push(newProduct);

    // ✅ Sauvegarder le tout
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2), "utf8");

    return res
      .status(200)
      .json({ message: "Produit enregistré avec succès", product: newProduct });
  } catch (error) {
    console.error("Erreur lors de la sauvegarde du produit:", error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la sauvegarde du produit" });
  }
}