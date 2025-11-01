import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const filePath = path.join(process.cwd(), "data", "orders.json");

    if (!fs.existsSync(filePath)) {
      return res.status(200).json({ orders: [] });
    }

    const fileData = fs.readFileSync(filePath, "utf-8");
    const orders = JSON.parse(fileData);

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Erreur lecture commandes :", error);
    res.status(500).json({ error: "Impossible de charger les commandes." });
  }
}