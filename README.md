# TTFJ Store - Next.js prototype

This archive contains a minimal Next.js + Tailwind project configured with:
- Stripe (card payments)
- Flutterwave (Mobile Money)
- Webhooks (Stripe & Flutterwave) storing orders to `data/orders.json`
- Nodemailer for sending confirmation emails
- PDF receipt generation with `pdfkit`
- Admin page to view orders and a customer order tracking page

## Quick start

1. Unzip and open the folder in VS Code.
2. Run `npm install`
3. Copy `.env.example` to `.env.local` and fill keys.
4. Run `npm run dev`
5. Open http://localhost:3000

