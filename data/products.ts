import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), "data", "products.json");

  try {
    if (!fs.existsSync(filePath)) {
      return res.status(200).json([]);
    }

    const raw = fs.readFileSync(filePath, "utf8");
    const products = raw ? JSON.parse(raw) : [];

    return res.status(200).json(products);
  } catch (err) {
    console.error("Erreur lors de la lecture des produits:", err);
    return res.status(500).json({ error: "Erreur lors du chargement des produits" });
  }
}