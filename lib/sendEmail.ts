import nodemailer from "nodemailer";

export async function sendOrderEmail({
  to,
  order,
}: {
  to: string;
  order: any;
}) {
  if (!to) return;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const mailOptions = {
    from: `"TTFJ Store" <${process.env.SMTP_USER}>`,
    to,
    subject: `Confirmation de votre commande #${order.id}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333">
        <h2>✅ Paiement confirmé !</h2>
        <p>Merci pour votre commande. Voici le résumé :</p>
        <ul>
          <li><b>ID commande :</b> ${order.id}</li>
          <li><b>Montant :</b> ${order.amount} ${order.currency.toUpperCase()}</li>
          <li><b>Moyen de paiement :</b> ${order.provider === "stripe" ? "Stripe 💳" : "Flutterwave 💰"}</li>
          <li><b>Statut :</b> ${order.status}</li>
          <li><b>Date :</b> ${new Date(order.date).toLocaleString("fr-FR")}</li>
        </ul>
        <p>Vous pouvez suivre vos commandes à tout moment ici :</p>
        <a href="${baseUrl}/suivi" style="background:#000;color:#fff;padding:10px 20px;text-decoration:none;border-radius:4px">Suivre mes commandes</a>
        <br/><br/>
        <p>Merci pour votre confiance 💚</p>
        <p><b>TTFJ Store</b></p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log(`📧 Email envoyé à ${to}`);
}
