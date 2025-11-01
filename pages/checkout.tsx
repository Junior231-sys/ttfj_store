import { useState } from "react";
import axios from "axios";

export default function CheckoutPage() {
  // Informations du client
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Produit en cours de saisie
  const [product, setProduct] = useState({
    name: "",
    price: "",
  });

  // Liste des produits ajoutés
  const [products, setProducts] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  // Gérer la saisie des infos client
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gérer la saisie du produit
  const handleProductChange = (e: any) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // ➕ Ajouter un produit
  const addProduct = () => {
    if (!product.name || !product.price) {
      alert("Veuillez saisir le nom et le prix du produit.");
      return;
    }

    const newProduct = {
      name: product.name,
      price: parseFloat(product.price),
    };

    setProducts([...products, newProduct]);
    setProduct({ name: "", price: "" }); // réinitialiser le formulaire du produit
  };

  // 🗑 Supprimer un produit
  const removeProduct = (index: number) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  // 🧾 Envoyer la commande complète
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (products.length === 0) {
      alert("Veuillez ajouter au moins un produit à la commande !");
      return;
    }

    const total = products.reduce((sum, p) => sum + p.price, 0);

    const orderData = {
      ...formData,
      products,
      total,
    };

    try {
      await axios.post("/api/saveorder", orderData);
      setMessage("✅ Commande enregistrée avec succès !");
      setProducts([]);
      setFormData({ name: "", email: "", phone: "", address: "" });
    } catch (err) {
      setMessage("❌ Impossible d’enregistrer la commande.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow rounded mt-6">
      <h1 className="text-2xl font-bold mb-4 text-center">🛒 Finaliser la commande</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Nom complet"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <input
          name="phone"
          placeholder="Téléphone"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <input
          name="address"
          placeholder="Adresse"
          value={formData.address}
          onChange={handleChange}
          className="border p-2 w-full mb-4"
        />

        <h2 className="text-lg font-semibold mt-4 mb-2">🧩 Ajouter un produit</h2>
        <div className="flex gap-2 mb-3">
          <input
            name="name"
            placeholder="Nom du produit"
            value={product.name}
            onChange={handleProductChange}
            className="border p-2 flex-1"
          />
          <input
            name="price"
            placeholder="Prix (FCFA)"
            value={product.price}
            onChange={handleProductChange}
            className="border p-2 w-32"
            type="number"
          />
          <button
            type="button"
            onClick={addProduct}
            className="bg-green-600 text-white px-3 rounded"
          >
            ➕
          </button>
        </div>

        {products.length > 0 && (
          <div className="border-t pt-2 mt-3">
            <h3 className="font-semibold mb-2">🧾 Produits ajoutés :</h3>
            <ul className="mb-3">
              {products.map((p, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center border-b py-1"
                >
                  <span>
                    {p.name} -{" "}
                    <strong>{p.price.toLocaleString()} FCFA</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => removeProduct(i)}
                    className="text-red-600 font-bold hover:text-red-800"
                    title="Supprimer le produit"
                  >
                    🗑
                  </button>
                </li>
              ))}
            </ul>
            <p className="font-bold text-right">
              Total :{" "}
              {products
                .reduce((sum, p) => sum + p.price, 0)
                .toLocaleString()}{" "}
              FCFA
            </p>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 w-full rounded mt-4"
        >
          Valider la commande
        </button>
      </form>

      {message && (
        <p
          className={`mt-3 text-center ${
            message.includes("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}