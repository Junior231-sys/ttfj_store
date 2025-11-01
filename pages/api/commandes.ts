// pages/api/commandes.ts
import { NextApiRequest, NextApiResponse } from 'next'

// Exemple d’API qui renvoie la liste des commandes (vide pour le moment)
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const orders: any[] = [] // Tu peux plus tard remplacer par ta vraie logique
  res.status(200).json({ orders })
}