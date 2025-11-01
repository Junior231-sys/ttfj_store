import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

type Order = {
  id: string;
  provider: string;
  amount: number;
  currency: string;
  customer_email?: string;
  customer_phone?: string;
  status: string;
  date: string;
};

export default function SuiviCommandesPage() {
  const [input, setInput] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setSearched(true);

    const res = await fetch("/api/orders");
    const data = await res.json();

    const results = data.filter(
      (o: Order) =>
        o.customer_email?.toLowerCase() === input.toLowerCase() ||
        o.customer_phone?.replace(/\s+/g, "") === input.replace(/\s+/g, "")
    );

    setOrders(results);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50">
      <Head>
        <title>Suivi de commande</title>
      </Head>

      <h1 className="text-3xl font-bold mb-6">📦 Suivre ma commande</h1>

      <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-md">
        <p className="text-gray-600 mb-4 text-sm">
          Entrez votre <strong>e-mail</strong> (Stripe) ou votre{" "}
          <strong>numéro de téléphone</strong> (Flutterwave) pour voir vos
          commandes.
        </p>

        <input
          type="text"
          placeholder="ex: client@email.com ou 690123456"
          className="border px-4 py-2 rounded w-full mb-4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded w-full hover:bg-gray-800 transition"
        >
          {loading ? "Recherche..." : "Rechercher"}
        </button>
      </div>

      {searched && !loading && orders.length === 0 && (
        <p className="text-gray-500 mt-6">Aucune commande trouvée 😕</p>
      )}

      {orders.length > 0 && (
        <div className="mt-8 w-full max-w-2xl">
          <h2 className="text-xl font-semibold mb-4">Résultats :</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border">ID</th>
                  <th className="py-2 px-4 border">Montant</th>
                  <th className="py-2 px-4 border">Paiement</th>
                  <th className="py-2 px-4 border">Statut</th>
                  <th className="py-2 px-4 border">Date</th>
                  <th className="py-2 px-4 border">Reçu</th>
                </tr>
              </thead>
              <tbody>
                {orders
                  .sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                  )
                  .map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border text-sm">{order.id}</td>
                      <td className="py-2 px-4 border">
                        {order.amount} {order.currency.toUpperCase()}
                      </td>
                      <td className="py-2 px-4 border capitalize">
                        {order.provider}
                      </td>
                      <td className="py-2 px-4 border">
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            order.status === "paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-2 px-4 border text-sm">
                        {new Date(order.date).toLocaleString()}
                      </td>
                      <td className="py-2 px-4 border text-center">
                        <a
                          href={`/api/receipt/${order.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                        >
                          Télécharger PDF
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Link href="/" className="mt-8 text-blue-600 underline">
        ← Retour à la boutique
      </Link>
    </div>
  );
}
