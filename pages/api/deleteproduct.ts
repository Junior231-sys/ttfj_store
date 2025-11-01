import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    const { id } = req.query;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "ID du produit manquant" });
    }

    const filePath = path.join(process.cwd(), "data", "products.json");
    const raw = fs.existsSync(filePath)
      ? fs.readFileSync(filePath, "utf8")
      : "[]";
    const products = JSON.parse(raw);

    const updatedProducts = products.filter((prod: any) => prod.id !== id);

    if (products.length === updatedProducts.length) {
      return res.status(404).json({ error: "Produit non trouvé" });
    }

    fs.writeFileSync(filePath, JSON.stringify(updatedProducts, null, 2), "utf8");

    return res.status(200).json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    console.error("Erreur deleteproduct:", error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la suppression du produit" });
  }
}