// pages/commandes.tsx
import React, { useEffect, useState } from "react"

interface Order {
  id: number
  name: string
}

export default function CommandesPage() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    // On récupère la liste des commandes depuis l'API
    fetch("/api/commandes")
      .then(res => res.json())
      .then(data => setOrders(data.orders))
      .catch(err => console.error("Erreur lors du chargement des commandes :", err))
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Liste des Commandes</h1>

      {orders.length === 0 ? (
        <p>Aucune commande enregistrée.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id} className="mb-2 border-b pb-2">
              {order.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}