import { useRouter } from "next/router";
import { products } from "../../data/products";
import Head from "next/head";
import { loadStripe } from "@stripe/stripe-js";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const product = products.find((p) => p.id === id);

  if (!product) return <div className="container mx-auto p-6">Produit introuvable</div>;

  const handleStripe = async () => {
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: product.id })
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.sessionId) {
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
        await stripe?.redirectToCheckout({ sessionId: data.sessionId });
      } else {
        alert("Erreur lors de l'initialisation du paiement Stripe.");
        console.error(data);
      }
    } catch (err) {
      console.error(err);
      alert("Erreur réseau Stripe");
    }
  };

  const handleMobileMoney = async () => {
    try {
      const body = {
        id: product.id,
        customer_email: "client@test.com",
        customer_phone: "690000000",
        customer_name: "Client Test",
        redirect_url: `${process.env.NEXT_PUBLIC_URL}/confirmation`
      };
      const res = await fetch("/api/flutterwave/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (data.link) {
        window.location.href = data.link;
      } else {
        alert("Erreur lors de l'initiation Mobile Money.");
        console.error(data);
      }
    } catch (err) {
      console.error(err);
      alert("Erreur réseau Mobile Money");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Head><title>{product?.name} — TTFJ Store</title></Head>

      <div className="grid md:grid-cols-2 gap-6">
        <img src={product?.image} alt={product?.name} className="w-full h-96 object-cover rounded" />
        <div>
          <h1 className="text-2xl font-bold">{product?.name}</h1>
          <p className="mt-2 text-gray-700">{product?.description}</p>

          <div className="mt-4">
            <p className="text-lg">Prix :</p>
            <p className="font-semibold text-2xl">{product?.priceEUR.toFixed(2)} €</p>
            <p className="text-sm text-gray-600">{product?.priceXAF.toLocaleString()} XAF</p>
          </div>

          <div className="mt-6 flex gap-3">
            <button onClick={handleStripe} className="px-4 py-2 bg-black text-white rounded">Payer par carte (Stripe)</button>
            <button onClick={handleMobileMoney} className="px-4 py-2 bg-yellow-500 text-black rounded">Payer Mobile Money (Orange / MTN)</button>
          </div>
        </div>
      </div>
    </div>
  );
}
