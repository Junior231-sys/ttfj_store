import { useRouter } from "next/router";

export default function Confirmation() {
  const router = useRouter();
  const { name, price } = router.query;

  return (
    <main className="max-w-lg mx-auto py-16 px-6 text-center">
      <h1 className="text-3xl font-bold mb-6">Commande enregistrée ✅</h1>
      <p className="text-lg mb-4">
        Produit : <strong>{name}</strong>
      </p>
      <p className="text-lg mb-8">
        Prix : <strong>{price} FCFA</strong>
      </p>
      <a
        href="/"
        className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
      >
        Retour à l’accueil
      </a>
    </main>
  );
}