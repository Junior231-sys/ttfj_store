import { useEffect, useState } from "react";

interface Order {
  id: string;
  date: string;
  customer?: string;
  total?: number;
}

export default function CommandesPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch("/data/orders.json")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Erreur chargement commandes:", err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Liste des Commandes</h1>
      {orders.length === 0 ? (
        <p>Aucune commande enregistrée.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Client</th>
              <th className="border p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="border p-2">{order.id}</td>
                <td className="border p-2">
                  {new Date(order.date).toLocaleString()}
                </td>
                <td className="border p-2">{order.customer || "N/A"}</td>
                <td className="border p-2">{order.total || 0} FCFA</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}