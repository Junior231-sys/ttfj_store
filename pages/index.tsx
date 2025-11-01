"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // === PRODUITS ===
  const products = [
    {
      name: "T-shirt Adidas",
      price1: 39.0,
      price2: 45.0,
      image1: "/images/tshirt.jpg",
      image2: "/images/tshirt2.jpg",
      badge: "New",
    },
    {
      name: "Adidas Shoes",
      price1: 49.0,
      price2: 59.0,
      image1: "/images/shoes.jpg",
      image2: "/images/shoes2.jpg",
      badge: "Hot",
    },
    {
      name: "Jean Délavé",
      price1: 45.0,
      price2: 52.0,
      image1: "/images/jean.jpg",
      image2: "/images/jean2.jpg",
      badge: "Trend",
    },
    {
      name: "Sac à dos urbain",
      price1: 25.0,
      price2: 29.0,
      image1: "/images/backpack.jpg",
      image2: "/images/backpack2.jpg",
      badge: "Hot",
    },
     {
      name: "illustration",
      price1: 30.0,
      price2: 45.0,
      image1: "/images/illustration.jpg",
      image2: "/images/illustration2.jpg",
      badge: "New",
    },
     {
      name: "Hat",
      price1: 15.0,
      price2: 20.0,
      image1: "/images/hat.jpg",
      image2: "/images/hat2.jpg",
      badge: "New",
    },
     {
      name: "Glasses",
      price1: 10.0,
      price2: 20.0,
      image1: "/images/glasses.jpg",
      image2: "/images/glasses2.jpg",
      badge: "New",
    },
     {
      name: "Slippers",
      price1: 12.0,
      price2: 15.0,
      image1: "/images/slippers.jpg",
      image2: "/images/slippers2.jpg",
      badge: "New",
    },
  ];

  // === IMAGES DU HÉROS ===
  const slides = [
    { id: 1, src: "/images/hero1.jpg", alt: "TTFJ Collection 1" },
    { id: 2, src: "/images/hero2.jpg", alt: "TTFJ Collection 2" },
  ];

  return (
    <main className="bg-white relative">
      {/* === LOGO === */}
      <div className="absolute top-5 left-5 z-50" data-aos="fade-down">
        <Image
          src="/logo.png"
          alt="TTFJ Logo"
          width={80}
          height={80}
          className="rounded-full shadow-lg"
        />
      </div>

      {/* ===== SECTION HÉROS ===== */}
      <section className="relative overflow-hidden bg-white">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          effect="fade"
          slidesPerView={1}
        >
          {slides.map((s) => (
            <SwiperSlide key={s.id}>
              <div className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                <img
                  src={s.src}
                  alt={s.alt}
                  className="absolute inset-0 w-full h-full object-contain object-center bg-white"
                />
                <div className="relative z-10 max-w-6xl w-full px-8">
                  <div className="flex items-center h-[90vh]">
                    <div className="w-1/2 pl-16 text-left">
                      <h1 className="text-5xl font-light tracking-wide text-black">
                        TTFJ Collection
                      </h1>
                      <a
                        href="#products"
                        className="mt-6 inline-block border border-black px-6 py-3 text-sm hover:bg-black hover:text-white transition-all"
                      >
                        Shop Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ===== SECTION TREND ===== */}
      <section id="trend" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="flex flex-col md:flex-row items-center mb-10"
            data-aos="fade-up"
          >
            <img
              src="/images/trend.jpg"
              alt="Trend"
              className="w-full md:w-1/2 rounded-lg shadow-lg transition-transform duration-700 hover:scale-105"
            />
            <div className="md:ml-10 md:mt-0 mt-6 text-center md:text-left">
              <h2 className="text-4xl font-semibold mb-4 text-gray-800">#Trend</h2>
              <p className="text-gray-600 leading-relaxed">
                Découvrez les styles les plus recherchés du moment — des pièces
                modernes, minimalistes et élégantes pour affirmer votre
                personnalité.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GRILLE DE PRODUITS ===== */}
      <section id="products" className="max-w-7xl mx-auto py-20 px-6">
        <h2 className="text-4xl font-semibold mb-10 text-center text-gray-800">
          Nos Produits
        </h2>
        <div className="text-center my-10">
  <a
    href="/checkout"
    className="inline-block bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition"
  >
    Aller à la page de commande
  </a>
</div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {products.map((p, index) => {
            const promo =
              p.price2 > p.price1
                ? Math.round(((p.price2 - p.price1) / p.price2) * 100)
                : 0;

            return (
              <div
                key={index}
                className="group relative bg-gray-50 p-4 rounded-lg shadow hover:shadow-xl transition-all duration-300"
                data-aos="fade-up"
              >
                {/* IMAGE 1 & 2 avec effet hover et zoom */}
                <div className="relative w-full overflow-hidden rounded-lg product-image-wrapper">
                  <img
                    src={p.image1}
                    alt={p.name}
                    className="w-full transition-all duration-500 group-hover:opacity-0 group-hover:scale-110"
                  />
                  <img
                    src={p.image2}
                    alt={p.name}
                    className="w-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                  />

                  {/* Étiquette Promo */}
                  {promo > 0 && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      Promo -{promo}%
                    </span>
                  )}

                  {/* Badge */}
                  {p.badge && (
                    <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                      {p.badge}
                    </span>
                  )}
                </div>

                {/* Infos produit */}
                <div className="mt-4 text-center transition-all duration-500">
                  <h3 className="font-medium text-gray-800">{p.name}</h3>
                  <p className="text-gray-500 group-hover:hidden">
                    ${p.price1.toFixed(2)}
                  </p>
                  <p className="text-gray-800 font-semibold hidden group-hover:block">
                    ${p.price2.toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}