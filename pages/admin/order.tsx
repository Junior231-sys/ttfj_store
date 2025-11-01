import { useEffect, useState } from "react";
import fs from "fs";
import path from "path";

interface Order {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  date: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/getorders");
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (error) {
        console.error("Erreur lors du chargement des commandes :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Chargement des commandes...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">📦 Liste des Commandes</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">Aucune commande trouvée.</p>
      ) : (
        <table className="min-w-full border border-gray-300 bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Nom</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Adresse</th>
              <th className="p-3 border">Téléphone</th>
              <th className="p-3 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="p-3 border">{order.id}</td>
                <td className="p-3 border">{order.name}</td>
                <td className="p-3 border">{order.email}</td>
                <td className="p-3 border">{order.address}</td>
                <td className="p-3 border">{order.phone}</td>
                <td className="p-3 border">{new Date(order.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}