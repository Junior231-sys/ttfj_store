import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const ordersFile = path.join(process.cwd(), "data", "orders.json");

  if (!fs.existsSync(ordersFile)) {
    return res.status(404).send("Aucune commande trouvée");
  }

  const orders = JSON.parse(fs.readFileSync(ordersFile, "utf8"));
  const order = orders.find((o: any) => o.id === id);

  if (!order) {
    return res.status(404).send("Commande introuvable");
  }

  // Configuration du PDF
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=recu_${id}.pdf`);

  const doc = new PDFDocument({ margin: 50 });
  doc.pipe(res);

  // --- LOGO ---
  const logoPath = path.join(process.cwd(), "public", "images", "logo.png");
  if (fs.existsSync(logoPath)) {
    try {
      doc.image(logoPath, (doc.page.width - 120) / 2, 40, { width: 120 });
    } catch (e) {
      // ignore if image fails
    }
    doc.moveDown(4);
  }

  doc
    .fillColor("#333")
    .fontSize(20)
    .text("TTFJ Store", { align: "center" })
    .moveDown(0.5);

  doc
    .fontSize(13)
    .fillColor("#666")
    .text("Reçu de paiement officiel", { align: "center" })
    .moveDown(1.5);

  doc.moveTo(50, doc.y).lineTo(550, doc.y).strokeColor("#999").stroke();
  doc.moveDown(1);

  doc.fontSize(12).fillColor("#000");
  const leftX = 60;
  const rightX = 300;

  doc.text("Numéro de commande :", leftX);
  doc.text(`${order.id}`, rightX);
  doc.moveDown();

  doc.text("Date :", leftX);
  doc.text(new Date(order.date).toLocaleString("fr-FR"), rightX);
  doc.moveDown();

  doc.text("Statut :", leftX);
  doc.text(order.status === "paid" ? "✅ Payé" : "❌ En attente", rightX);
  doc.moveDown(1);

  doc.moveDown();
  doc.fontSize(14).fillColor("#333").text("Détails du paiement :", { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(12).fillColor("#000");
  doc.text(`Montant total : ${order.amount} ${order.currency.toUpperCase()}`);
  doc.text(
    `Moyen de paiement : ${
      order.provider === "stripe" ? "Stripe 💳" : "Flutterwave 💰"
    }`
  );
  if (order.customer_email) doc.text(`Client : ${order.customer_email}`);
  if (order.customer_phone) doc.text(`Téléphone : ${order.customer_phone}`);
  doc.moveDown(1);

  doc.roundedRect(50, doc.y, 500, 80, 8).stroke("#aaa");
  const summaryY = doc.y + 10;
  doc.moveDown(0.5);
  doc.fontSize(12).fillColor("#444");
  doc.text("Résumé de la transaction :", 70, summaryY);
  doc.text(`Identifiant : ${order.id}`, 70, summaryY + 20);
  doc.text(`Montant : ${order.amount} ${order.currency.toUpperCase()}`, 70, summaryY + 40);

  doc.moveDown(6);
  doc
    .fontSize(12)
    .fillColor("#333")
    .text("Merci pour votre achat 💚", { align: "center" })
    .moveDown(0.3);
  doc
    .fontSize(10)
    .fillColor("#777")
    .text("TTFJ Store — https://ttfj-store.example", { align: "center" });

  doc.end();
}
