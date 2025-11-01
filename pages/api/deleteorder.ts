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
      return res.status(400).json({ error: "ID de commande manquant" });
    }

    const filePath = path.join(process.cwd(), "data", "orders.json");
    const raw = fs.existsSync(filePath)
      ? fs.readFileSync(filePath, "utf8")
      : "[]";
    const orders = JSON.parse(raw);

    const updatedOrders = orders.filter((order: any) => order.id !== id);

    if (orders.length === updatedOrders.length) {
      return res.status(404).json({ error: "Commande non trouvée" });
    }

    fs.writeFileSync(filePath, JSON.stringify(updatedOrders, null, 2), "utf8");

    return res.status(200).json({ message: "Commande supprimée avec succès" });
  } catch (error) {
    console.error("Erreur deleteorder:", error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la suppression de la commande" });
  }
}