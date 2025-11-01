interface ProductProps {
  product: {
    name: string;
    priceUSD: string;
    image: string;
    badge?: string;
  };
}

export default function ProductCard({ product }: ProductProps) {
  return (
    <div className="text-center group relative">
      <div className="overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Badge (New / Hot / Trend / Sold out) */}
      {product.badge && (
        <span
          className={`absolute top-3 right-3 text-xs font-medium px-2 py-1 rounded ${
            product.badge === "Hot"
              ? "bg-red-500 text-white"
              : product.badge === "Trend"
              ? "bg-blue-500 text-white"
              : product.badge === "New"
              ? "bg-green-500 text-white"
              : "bg-gray-400 text-white"
          }`}
        >
          {product.badge}
        </span>
      )}

      <div className="mt-4">
        <h3 className="text-sm text-gray-800 font-light">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-1">${product.priceUSD}</p>
      </div>
    </div>
  );
}