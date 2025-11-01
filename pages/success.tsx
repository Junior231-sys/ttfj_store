import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Success() {
  const router = useRouter();
  const { session_id, tx_ref } = router.query;
  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    if (tx_ref) {
      fetch(`/api/flutterwave/verify/${tx_ref}`)
        .then(r => r.json())
        .then(setInfo)
        .catch(console.error);
    }
  }, [tx_ref]);

  return (
    <div className="text-center p-10">
      <h1 className="text-3xl font-bold mb-4">✅ Paiement reçu — merci !</h1>
      <p>Nous vérifions votre paiement. Vous recevrez bientôt une confirmation par e-mail.</p>

      {info && (
        <div className="mt-6 text-left max-w-xl mx-auto p-4 border rounded">
          <h2 className="font-semibold mb-2">Détails de la transaction (Flutterwave)</h2>
          <pre className="text-sm">{JSON.stringify(info, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
