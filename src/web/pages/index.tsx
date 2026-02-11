import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "wouter";

// Hero slideshow images
const heroImages = [
  "./8b93502b-3f37-4894-9695-18b59fe1c30e.jpg", // brasa viva
  "./99620f26-b610-42b4-a5bf-d0d7df4b54d9.jpg", // tomahawk being cut
  "./1b2d7f29-bff0-4c2e-98b4-14c29160e462.jpg", // stacked steaks
  "./51921946-db12-4b63-b5e0-867f0d6e6b5e.jpg", // raw tomahawk
  "./a5e37b97-57ed-4949-8d6c-84ecde77bf38.jpg", // sliced steak
];

// Menu section background slideshow images
const menuBackgroundImages = [
  "./0d3ca745-bfea-410b-969b-7df83d9607af.jpg", // dining room with neon
  "./39e5e286-7685-49e6-893a-385744302fdb.jpg", // bar area
  "./85045d6c-1f52-42a3-8a59-565b62ec4b13.jpg", // wine cellar with neon
  "./1277703a-2b54-4bf2-ac50-a3cddc437347.jpg", // dining room
];

// Translations
const translations = {
  pt: {
    nav: {
      sobreNos: "SOBRE NÓS",
      menu: "MENU",
      atmosfera: "ATMOSFERA",
      contactos: "CONTACTOS",
    },
    hero: {
      slogan: "A arte da carne, servida com elegância",
      premium: "STEAKHOUSE PREMIUM",
    },
    about: {
      title: "SOBRE O RESTAURANTE",
      text1: "Somos um grupo de pessoas que se juntaram e que tentam fazer a vida valer da melhor maneira que conseguimos. Completamente diferentes, conseguimos encontrar o nosso equilíbrio e todas as noites conseguimos entregar refeições onde o objetivo é sempre um sorriso na cara das pessoas.",
      text2: "Criámos um espaço elegante, confortável e sem cerimónias desnecessárias, onde o foco está na partilha de comida, emoções e momentos.",
      text3: "Inspiramo-nos nas grandes steakhouses internacionais, mas mantemos uma identidade própria, enraizada no Porto, uma cidade de carácter, tradição e autenticidade. Acreditamos que a excelência não precisa de excessos, precisa de consistência, conhecimento e paixão.",
      reserveButton: "RESERVAR MESA",
    },
    menu: {
      title: "MENU",
      tabs: {
        entradas: "Entradas",
        naBrasa: "Na Brasa",
        acompanhamentos: "Acompanhamentos",
        sobremesas: "Sobremesas",
        vinhos: "Vinhos",
        bebidas: "Bebidas",
      },
      categories: {
        brancos: "VINHOS BRANCOS",
        tintos: "VINHOS TINTOS",
        rose: "ROSÉ",
        espumante: "ESPUMANTE",
        copo: "VINHO A COPO",
        assinatura: "COCKTAILS DE ASSINATURA",
        classicos: "COCKTAILS CLÁSSICOS",
        mocktails: "MOCKTAILS",
        destilados: "DESTILADOS",
        cervejas: "CERVEJAS",
        sumosNaturais: "SUMOS NATURAIS",
        refrigerantes: "REFRIGERANTES",
        sangrias: "SANGRIAS",
        vodka: "VODKA",
        rum: "RUM",
        gin: "GIN",
        whisky: "WHISKY",
        cognac: "CONHAQUE",
        vermouth: "VERMUTES",
        tequila: "TEQUILA",
      },
      vatNote: "Todos os preços incluem IVA à taxa legal em vigor",
    },
    atmosfera: {
      title: "ATMOSFERA",
    },
    contactos: {
      title: "CONTACTOS",
      followUs: "SIGA-NOS",
      established: "Steakhouse Premium • Estabelecido 2023",
      hours: "Terça a Domingo | 19h00 – 00h00",
      closed: "Encerrado à Segunda",
      copyright: "© 2023 100 Cerimónias Steakhouse. Todos os direitos reservados.",
      reviews: "Avaliações Google",
      complaints: "Livro de Reclamações",
    },
  },
  en: {
    nav: {
      sobreNos: "ABOUT US",
      menu: "MENU",
      atmosfera: "ATMOSPHERE",
      contactos: "CONTACT",
    },
    hero: {
      slogan: "The art of meat, served with elegance",
      premium: "PREMIUM STEAKHOUSE",
    },
    about: {
      title: "ABOUT THE RESTAURANT",
      text1: "We are a group of people who came together trying to make life worthwhile in the best way we can. Completely different, we found our balance and every night we deliver meals where the goal is always a smile on people's faces.",
      text2: "We created an elegant, comfortable space without unnecessary ceremonies, where the focus is on sharing food, emotions and moments.",
      text3: "We are inspired by the great international steakhouses, but we maintain our own identity, rooted in Porto, a city of character, tradition and authenticity. We believe that excellence doesn't need excess, it needs consistency, knowledge and passion.",
      reserveButton: "BOOK A TABLE",
    },
    menu: {
      title: "MENU",
      tabs: {
        entradas: "Starters",
        naBrasa: "From the Grill",
        acompanhamentos: "Sides",
        sobremesas: "Desserts",
        vinhos: "Wines",
        bebidas: "Drinks",
      },
      categories: {
        brancos: "WHITE WINES",
        tintos: "RED WINES",
        rose: "ROSÉ",
        espumante: "SPARKLING",
        copo: "WINE BY THE GLASS",
        assinatura: "SIGNATURE COCKTAILS",
        classicos: "CLASSIC COCKTAILS",
        mocktails: "MOCKTAILS",
        destilados: "SPIRITS",
        cervejas: "BEERS",
        sumosNaturais: "NATURAL JUICES",
        refrigerantes: "SOFT DRINKS",
        sangrias: "SANGRIAS",
        vodka: "VODKA",
        rum: "RUM",
        gin: "GIN",
        whisky: "WHISKY",
        cognac: "COGNAC",
        vermouth: "VERMOUTH",
        tequila: "TEQUILA",
      },
      vatNote: "All prices include VAT",
    },
    atmosfera: {
      title: "ATMOSPHERE",
    },
    contactos: {
      title: "CONTACT",
      followUs: "FOLLOW US",
      established: "Premium Steakhouse • Established 2023",
      hours: "Tuesday to Sunday | 7:00 PM – 12:00 AM",
      closed: "Closed on Monday",
      copyright: "© 2023 100 Cerimónias Steakhouse. All rights reserved.",
      reviews: "Google Reviews",
      complaints: "Complaints Book",
    },
  },
};

// Menu data
const menuData = {
  entradas: [
    { name: "Croquetes de Alheira", description: "Croquetes crocantes de alheira tradicional portuguesa", descriptionEn: "Crispy alheira croquettes, traditional Portuguese style", price: "8,50" },
    { name: "Tacos de Xixinha", description: "Tacos recheados com carne desfiada temperada", descriptionEn: "Tacos filled with seasoned shredded meat", price: "10,50" },
    { name: "Ovos Rotos 100 Cerimónias", description: "Ovos estrelados sobre batata frita com presunto", descriptionEn: "Fried eggs over crispy potatoes with cured ham", price: "13", signature: true },
    { name: "Tártaro de Novilho", description: "Carne de novilho picada à mão, temperada na hora", descriptionEn: "Hand-chopped beef tartare, freshly seasoned", price: "15" },
    { name: "Camarão 100 Cerimónias", description: "Camarão grelhado com alho e ervas aromáticas", descriptionEn: "Grilled shrimp with garlic and aromatic herbs", price: "12", signature: true },
  ],
  naBrasa: [
    { name: "Vazia", description: "Maturação de 22 dias", descriptionEn: "22-day aged", price: "28", weight: "250gr" },
    { name: "Picanha", description: "Corte típico argentino com gordura lateral", descriptionEn: "Typical Argentine cut with side fat cap", price: "48", weight: "500gr", signature: true },
    { name: "Txuletón", description: "Corte típico basco com osso", descriptionEn: "Typical Basque bone-in cut", price: "79", weight: "1kg", bestseller: true },
    { name: "Tomahawk", description: "Corte invulgar com osso extenso", descriptionEn: "Distinctive cut with extended bone", price: "89", weight: "1kg", signature: true, bestseller: true },
    { name: "T-Bone", description: "Osso em T que separa vazia e lombo", descriptionEn: "T-shaped bone separating sirloin and tenderloin", price: "79", weight: "1kg" },
    { name: "Tábua Premium 100 Cerimónias", description: "Carnes para todos os gostos", descriptionEn: "Premium meats for all tastes", price: "172", weight: "2kg", signature: true },
  ],
  acompanhamentos: [
    { name: "Batata Rústica", description: "", descriptionEn: "", price: "4,50", veggie: true },
    { name: "Salada Mista", description: "", descriptionEn: "", price: "4", veggie: true },
    { name: "Legumes Grelhados na Brasa", description: "", descriptionEn: "", price: "4,50", veggie: true },
    { name: "Arroz de Forno de Enchidos", description: "", descriptionEn: "", price: "4" },
    { name: "Puré de Batata Trufado", description: "", descriptionEn: "", price: "7,50", veggie: true },
  ],
  sobremesas: [
    { name: "Bola de Gelado 100 Cerimónias", description: "", descriptionEn: "", price: "4" },
    { name: "Surpresa de Maracujá", description: "", descriptionEn: "", price: "10" },
    { name: "Fondant de Doce de Leite", description: "", descriptionEn: "", price: "12", bestseller: true },
    { name: "Brownie de Chocolate", description: "", descriptionEn: "", price: "10" },
  ],
  vinhos: {
    brancos: [
      { name: "Vale do Homem Arinto", region: "Vinho Verde", price: "20" },
      { name: "Contacto Alvarinho", price: "28" },
      { name: "Dote Simplesmente Batonnage", region: "Douro", price: "22" },
      { name: "Quinta Vale D'Aldeia Grande", region: "Douro", price: "45" },
    ],
    tintos: [
      { name: "ZIP Unoaked", region: "Douro", price: "20" },
      { name: "Vale da Aldeia", region: "Douro", price: "20" },
      { name: "Vallado", region: "Douro", price: "28" },
      { name: "Loek's Grande Reserva", region: "Douro", price: "60" },
      { name: "Quinta da Lapa Pinot Noir Reserva", region: "Tejo", price: "28" },
      { name: "Quinta da Lapa Reserva Cabernet Sauvignon", region: "Tejo", price: "28" },
      { name: "Quinta do Paral", region: "Alentejo", price: "32" },
    ],
    rose: [
      { name: "Quinta do Paral", price: "25" },
    ],
    espumante: [
      { name: "Lagoa Velha", region: "Bairrada", price: "22" },
    ],
    copo: [
      { name: "Vale do Homem Arinto", region: "Vinho Verde", price: "6" },
      { name: "Dote Simplesmente Batonnage", region: "Maduro Branco Douro", price: "6" },
      { name: "Zip Unoaked", region: "Maduro Tinto Douro", price: "6" },
    ],
  },
  bebidas: {
    destilados: {
      vodka: [
        { name: "Grey Goose", price: "10" },
        { name: "Cîroc", price: "10" },
      ],
      rum: [
        { name: "Bacardi Carta Blanca", price: "8" },
        { name: "Bacardi 8", price: "12" },
      ],
      gin: [
        { name: "Bombay Sapphire", price: "10" },
        { name: "Bombay Pressé", price: "10" },
        { name: "Bombay Bramble", price: "10" },
        { name: "Bulldog", price: "11" },
        { name: "Hendrick's", price: "12" },
        { name: "Bombay Premier Cru", price: "13" },
        { name: "Monkey 47", price: "15" },
      ],
      whisky: [
        { name: "Dewar's 8", price: "8" },
        { name: "Johnnie Walker Red Label", price: "8" },
        { name: "Jack Daniel's Apple", price: "10" },
        { name: "Jack Daniel's Honey", price: "10" },
        { name: "Jack Daniel's Tennessee", price: "10" },
        { name: "Dewar's 21", price: "12" },
        { name: "Jack Daniel's Single Barrel", price: "12" },
        { name: "Cutty Sark Discovery 18", price: "13" },
      ],
      cognac: [
        { name: "Hubert Rocheeboit Fine", price: "10" },
        { name: "Courvoisier VSOP", price: "23" },
      ],
      vermouth: [
        { name: "Martini Special Rubino", price: "8" },
        { name: "Martini Special Ambrato", price: "8" },
      ],
      tequila: [
        { name: "Patrón Silver", price: "10" },
      ],
    },
    cervejas: [
      { name: "Stella Artois", price: "3,50" },
      { name: "Leffe Blond", price: "5,50" },
      { name: "Franziskaner", price: "5,50" },
    ],
    sumosNaturais: [
      { name: "Limonada", price: "3" },
      { name: "Sumo de Laranja Natural", price: "4" },
    ],
    refrigerantes: [
      { name: "Coca Cola", price: "3" },
      { name: "Coca Cola Zero", price: "3" },
      { name: "Nestea Pêssego", price: "3" },
      { name: "Água Tónica", price: "3" },
      { name: "Ginger Beer", price: "3" },
      { name: "Ginger Ale", price: "3" },
    ],
    sangrias: [
      { name: "Espumante", description: "Maracujá, frutos vermelhos, maçã, mojito", descriptionEn: "Passion fruit, red fruits, apple, mojito", price: "35" },
      { name: "Magic Bubbles (Mimadu)", price: "40" },
      { name: "Champagne 100 Cerimónias", description: "Preço s/ consulta", descriptionEn: "Price on request", price: "—" },
    ],
    cocktailsAssinatura: [
      { name: "Lick My Peach", description: "Vodka, licor de laranja, citrinos, pêssego, clara de ovo", descriptionEn: "Vodka, orange liqueur, citrus, peach, egg white", price: "12" },
      { name: "Em Brasa", description: "Gin, puré de morango, sumo de laranja, soda e angustura", descriptionEn: "Gin, strawberry purée, orange juice, soda and angostura", price: "12" },
      { name: "Special Mojito", description: "Vinho do Porto branco, tangerina, ginger ale, citrinos, hortelã", descriptionEn: "White Port wine, tangerine, ginger ale, citrus, mint", price: "12" },
      { name: "Cerimónias Mule", description: "Vodka, ginger beer, citrinos, espuma de gengibre", descriptionEn: "Vodka, ginger beer, citrus, ginger foam", price: "12" },
      { name: "Afrodite", description: "Vodka, licor de laranja, maracujá, framboesa, citrinos, clara de ovo", descriptionEn: "Vodka, orange liqueur, passion fruit, raspberry, citrus, egg white", price: "12" },
      { name: "Invicta", description: "Vodka, blue curaçao, sumo de laranja, sumo de arando", descriptionEn: "Vodka, blue curaçao, orange juice, cranberry juice", price: "12" },
    ],
    cocktailsClassicos: [
      { name: "Margarita", price: "8" },
      { name: "Cosmopolitan", price: "8" },
      { name: "Mojito", price: "8" },
      { name: "Caipirinha", price: "8" },
      { name: "Pornstar Martini", price: "8" },
      { name: "Negroni", price: "8" },
      { name: "Espresso Martini", price: "8" },
      { name: "Old Fashioned", price: "8" },
      { name: "Daiquiri", price: "8" },
      { name: "Aperol Spritz", price: "8" },
    ],
    mocktails: [
      { name: "Belle Vie", description: "Abacaxi, sumo de lima, cereja marrasquino, puré de pêssego", descriptionEn: "Pineapple, lime juice, maraschino cherry, peach purée", price: "5" },
      { name: "Ginger Swizzle", description: "Sumo de limão, xarope de gengibre, soda", descriptionEn: "Lemon juice, ginger syrup, soda", price: "5" },
      { name: "Raspberry Fizz", description: "Menta fresca, framboesa, sumo de limão e ginger-ale", descriptionEn: "Fresh mint, raspberry, lemon juice and ginger-ale", price: "5" },
    ],
  },
};

const atmosphereImages = [
  "./0d3ca745-bfea-410b-969b-7df83d9607af.jpg",
  "./85045d6c-1f52-42a3-8a59-565b62ec4b13.jpg",
  "./39e5e286-7685-49e6-893a-385744302fdb.jpg",
  "./99620f26-b610-42b4-a5bf-d0d7df4b54d9.jpg",
  "./1277703a-2b54-4bf2-ac50-a3cddc437347.jpg",
  "./a5e37b97-57ed-4949-8d6c-84ecde77bf38.jpg",
];

interface MenuItem {
  name: string;
  description?: string;
  descriptionEn?: string;
  price: string;
  weight?: string;
  signature?: boolean;
  bestseller?: boolean;
  veggie?: boolean;
}

type Language = "pt" | "en";

const MenuItemRow = ({ item, lang, isVisible }: { item: MenuItem; lang: Language; isVisible: boolean }) => (
  <div 
    className={`group border-b border-amber-900/30 py-4 hover:bg-amber-950/20 transition-all duration-700 px-2 -mx-2 ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    }`}
  >
    <div className="flex justify-between items-start gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-serif text-lg text-amber-50 group-hover:text-amber-400 transition-colors">
            {item.name}
          </span>
          {item.weight && (
            <span className="text-amber-600 text-sm">({item.weight})</span>
          )}
          {item.signature && (
            <span className="text-[10px] uppercase tracking-widest bg-amber-600 text-black px-2 py-0.5 font-medium">
              Signature
            </span>
          )}
          {item.bestseller && (
            <span className="text-[10px] uppercase tracking-widest bg-rose-600 text-white px-2 py-0.5 font-medium">
              Bestseller
            </span>
          )}
          {item.veggie && (
            <span className="text-[10px] uppercase tracking-widest bg-emerald-600 text-white px-2 py-0.5 font-medium">
              Veggie
            </span>
          )}
        </div>
        {(item.description || item.descriptionEn) && (
          <p className="text-amber-200/60 text-sm mt-1">
            {lang === "pt" ? item.description : item.descriptionEn}
          </p>
        )}
      </div>
      <span className="font-serif text-xl text-amber-400 whitespace-nowrap group-hover:scale-110 transition-transform">
        €{item.price}
      </span>
    </div>
  </div>
);

// Elegant section divider
const SectionDivider = () => (
  <div className="flex items-center justify-center py-8">
    <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-600/50" />
    <div className="w-2 h-2 rotate-45 border border-amber-600/50 mx-4" />
    <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-600/50" />
  </div>
);

// Lightbox Component
const Lightbox = ({ 
  images, 
  currentIndex, 
  isOpen, 
  onClose, 
  onNext, 
  onPrev 
}: { 
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center animate-lightbox-in"
      onClick={onClose}
    >
      {/* Close button */}
      <button 
        className="absolute top-6 right-6 text-amber-400 hover:text-amber-300 transition-colors z-10 p-2"
        onClick={onClose}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation arrows */}
      <button 
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-300 transition-colors p-2 hover:scale-110"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
      >
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-300 transition-colors p-2 hover:scale-110"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
      >
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Image */}
      <div 
        className="max-w-[90vw] max-h-[85vh] relative animate-lightbox-image"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          className="max-w-full max-h-[85vh] object-contain"
        />
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <div 
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              i === currentIndex ? "bg-amber-400 w-6" : "bg-amber-400/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Icon components for menu categories
const WineGlassIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6l-2.5 7.5c-.5 1.5-1.5 2.5-2.5 2.5s-2-.5-2.5-2.5L9 3zm3 10v8m-3 0h6" />
  </svg>
);

const CocktailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l-1.3 4.55a2.25 2.25 0 01-2.163 1.65h-8.674a2.25 2.25 0 01-2.163-1.65L5 14.5" />
  </svg>
);

const BeerIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 4h8v14a2 2 0 01-2 2H8a2 2 0 01-2-2V4zm8 3h4a2 2 0 012 2v4a2 2 0 01-2 2h-4" />
  </svg>
);

const JuiceIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 3v2m8-2v2M6 7h12l-1 12a2 2 0 01-2 2H9a2 2 0 01-2-2L6 7zm3 4v6m4-6v6" />
  </svg>
);

const SodaIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6v3H9V3zm0 3l-1 15a1 1 0 001 1h6a1 1 0 001-1L15 6H9z" />
  </svg>
);

const BottleIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 3h4v2h-4V3zm0 2l-2 3v13a1 1 0 001 1h6a1 1 0 001-1V8l-2-3h-4z" />
  </svg>
);

const SangriaIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 10h10a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6a2 2 0 012-2zm5-7v7m-3-4l3 4 3-4" />
  </svg>
);

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg 
    className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

// Collapsible drink section component
const CollapsibleDrinkSection = ({ 
  title, 
  icon, 
  children, 
  defaultOpen = false 
}: { 
  title: string; 
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-amber-900/30 mb-3 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-amber-950/30 hover:bg-amber-950/50 transition-colors"
      >
        <div className="flex items-center gap-3 text-amber-400">
          {icon}
          <span className="font-serif text-lg tracking-wider">{title}</span>
        </div>
        <ChevronIcon isOpen={isOpen} />
      </button>
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 bg-black/40">
          {children}
        </div>
      </div>
    </div>
  );
};

// Simple drink item
const DrinkItem = ({ name, price, description, descriptionEn, lang }: { name: string; price: string; description?: string; descriptionEn?: string; lang: Language }) => (
  <div className="flex justify-between items-start py-2 border-b border-amber-900/20 hover:bg-amber-950/20 transition-colors px-2 -mx-2 group">
    <div>
      <span className="text-amber-100 group-hover:text-amber-300 transition-colors">{name}</span>
      {(description || descriptionEn) && (
        <p className="text-amber-200/50 text-xs mt-0.5">{lang === "pt" ? description : descriptionEn}</p>
      )}
    </div>
    <span className="text-amber-400 ml-4">{price !== "—" ? `€${price}` : price}</span>
  </div>
);

function Index() {
  const [activeTab, setActiveTab] = useState("entradas");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("100cerimonias-lang") as Language) || "pt";
    }
    return "pt";
  });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [heroParallax, setHeroParallax] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [currentMenuBgImage, setCurrentMenuBgImage] = useState(0);

  const menuRef = useRef<HTMLDivElement>(null);

  const t = translations[lang];

  const navLinks = [
    { href: "/sobre", label: t.nav.sobreNos, isPage: true },
    { href: "#menu", label: t.nav.menu, isPage: false },
    { href: "#atmosfera", label: t.nav.atmosfera, isPage: false },
    { href: "#contactos", label: t.nav.contactos, isPage: false },
  ];

  const menuTabs = [
    { id: "entradas", label: t.menu.tabs.entradas },
    { id: "naBrasa", label: t.menu.tabs.naBrasa },
    { id: "acompanhamentos", label: t.menu.tabs.acompanhamentos },
    { id: "sobremesas", label: t.menu.tabs.sobremesas },
    { id: "vinhos", label: t.menu.tabs.vinhos },
    { id: "bebidas", label: t.menu.tabs.bebidas },
  ];

  // Language toggle
  const toggleLanguage = useCallback(() => {
    const newLang = lang === "pt" ? "en" : "pt";
    setLang(newLang);
    localStorage.setItem("100cerimonias-lang", newLang);
  }, [lang]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      setShowScrollTop(scrollY > 500);
      setHeroParallax(scrollY * 0.5);

      // Check if menu section is visible
      if (menuRef.current) {
        const rect = menuRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          setMenuVisible(true);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Hero slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5500); // Change every 5.5 seconds

    return () => clearInterval(interval);
  }, []);

  // Menu background slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMenuBgImage((prev) => (prev + 1) % menuBackgroundImages.length);
    }, 6000); // Change every 6 seconds (slightly offset from hero)

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Lightbox handlers
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  
  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % atmosphereImages.length);
  };
  
  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + atmosphereImages.length) % atmosphereImages.length);
  };

  return (
    <div className="min-h-screen bg-black text-amber-50 font-sans relative">
      {/* Loading Screen */}
      <div 
        className={`fixed inset-0 z-[200] bg-black flex items-center justify-center transition-opacity duration-1000 ${
          isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="text-center">
          <img 
            src="./logo-transparent.png" 
            alt="100 Cerimónias" 
            className="w-32 animate-pulse-slow"
          />
          <div className="mt-6 flex gap-1 justify-center">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-loading-dot" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-loading-dot" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-loading-dot" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>

      {/* Grain texture overlay */}
      <div className="fixed inset-0 pointer-events-none z-[90] opacity-[0.03]">
        <svg className="w-full h-full">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-black/80 backdrop-blur-lg py-3 shadow-lg shadow-black/20" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <button 
            onClick={() => scrollToSection("#hero")} 
            className="flex-shrink-0 group"
          >
            <img 
              src="./logo-transparent.png" 
              alt="100 Cerimónias" 
              className={`transition-all duration-300 group-hover:scale-105 ${isScrolled ? 'h-12' : 'h-16'}`}
            />
          </button>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              link.isPage ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm tracking-[0.2em] text-amber-200/80 hover:text-amber-400 transition-all hover:scale-105 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300" />
                </Link>
              ) : (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm tracking-[0.2em] text-amber-200/80 hover:text-amber-400 transition-all hover:scale-105 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300" />
                </button>
              )
            ))}
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="ml-4 px-3 py-1 border border-amber-600/50 text-amber-400 text-sm tracking-wider hover:bg-amber-600/20 hover:border-amber-400 transition-all hover:scale-105"
            >
              {lang === "pt" ? "EN" : "PT"}
            </button>
          </div>

          {/* Mobile menu button + language toggle */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="px-2 py-1 border border-amber-600/50 text-amber-400 text-xs tracking-wider"
            >
              {lang === "pt" ? "EN" : "PT"}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-amber-400 p-2"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 bg-black/98 backdrop-blur-lg border-t border-amber-900/30 transition-all duration-300 ${
            mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              link.isPage ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm tracking-[0.2em] text-amber-200/80 hover:text-amber-400 transition-colors text-left py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm tracking-[0.2em] text-amber-200/80 hover:text-amber-400 transition-colors text-left py-2"
                >
                  {link.label}
                </button>
              )
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Images Slideshow with Ken Burns effect */}
        <div className="absolute inset-0">
          {heroImages.map((img, index) => (
            <div
              key={img}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentHeroImage ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={img}
                alt={`100 Cerimónias Steakhouse ${index + 1}`}
                className={`w-full h-full object-cover animate-ken-burns ${
                  index === currentHeroImage ? "animate-running" : "animate-paused"
                }`}
                style={{ 
                  transform: `translateY(${heroParallax}px)`,
                  animationPlayState: index === currentHeroImage ? "running" : "paused"
                }}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />
        </div>

        {/* Slideshow indicators */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroImages.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-500 ${
                index === currentHeroImage 
                  ? "w-8 bg-amber-400" 
                  : "w-2 bg-amber-400/30"
              }`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className={`relative z-10 text-center px-6 ${isLoading ? "opacity-0" : "animate-hero-entrance"}`}>
          <div className="group">
            {/* Square container for prominent logo display */}
            <div className="w-72 h-72 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] mx-auto mb-6 flex items-center justify-center">
              <img
                src="./logo-transparent.png"
                alt="100 Cerimónias Steakhouse Premium"
                className="w-full h-full object-contain drop-shadow-2xl animate-logo-entrance group-hover:animate-logo-float transition-transform"
              />
            </div>
          </div>
          
          {/* Slogan */}
          <p className="font-serif text-amber-200/90 text-lg md:text-xl tracking-[0.3em] mb-6 animate-slogan-entrance italic">
            {t.hero.slogan}
          </p>
          
          <p className="font-serif text-amber-400 text-xl md:text-2xl tracking-widest mb-8 opacity-90">
            {t.hero.premium}
          </p>

          {/* Hero Reservation Button with shimmer effect */}
          <div className="mb-12 animate-hero-button-entrance">
            <a
              href="https://tinyurl.com/100cerimonias"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block group overflow-hidden"
            >
              <div className="relative px-8 py-4 bg-transparent border-2 border-amber-400 group-hover:border-amber-300 transition-all group-hover:scale-105">
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-amber-400/10 to-transparent" />
                <span className="relative font-serif text-lg md:text-xl tracking-[0.25em] text-amber-400 group-hover:text-amber-300 transition-colors">
                  {t.about.reserveButton}
                </span>
              </div>
            </a>
          </div>
          
          {/* Nav links under logo */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {navLinks.map((link, i) => (
              link.isPage ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs md:text-sm tracking-[0.2em] text-amber-200/70 hover:text-amber-400 transition-all hover:scale-110"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-xs md:text-sm tracking-[0.2em] text-amber-200/70 hover:text-amber-400 transition-all hover:scale-110"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {link.label}
                </button>
              )
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <SectionDivider />

      {/* Menu Section */}
      <section id="menu" className="py-24 md:py-32 relative overflow-hidden" ref={menuRef}>
        {/* Background Slideshow with Ken Burns effect */}
        <div className="absolute inset-0">
          {menuBackgroundImages.map((img, index) => (
            <div
              key={img}
              className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
                index === currentMenuBgImage ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={img}
                alt={`Restaurant atmosphere ${index + 1}`}
                className={`w-full h-full object-cover ${
                  index === currentMenuBgImage ? "animate-menu-ken-burns" : ""
                }`}
                style={{ 
                  animationPlayState: index === currentMenuBgImage ? "running" : "paused"
                }}
              />
            </div>
          ))}
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/80 to-black/90" />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative">
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-center text-amber-400 mb-16">
            {t.menu.title}
          </h2>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
            {menuTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm tracking-[0.15em] transition-all border hover:scale-105 ${
                  activeTab === tab.id
                    ? "bg-amber-400 text-black border-amber-400 shadow-lg shadow-amber-400/20"
                    : "bg-transparent text-amber-200/70 border-amber-900/50 hover:border-amber-400 hover:text-amber-400"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Menu Content */}
          <div className="bg-black/60 backdrop-blur-sm border border-amber-900/30 p-6 md:p-10">
            {activeTab === "entradas" && (
              <div className="animate-fade-in">
                {menuData.entradas.map((item, i) => (
                  <MenuItemRow key={i} item={item} lang={lang} isVisible={menuVisible} />
                ))}
              </div>
            )}

            {activeTab === "naBrasa" && (
              <div className="animate-fade-in">
                {menuData.naBrasa.map((item, i) => (
                  <MenuItemRow key={i} item={item} lang={lang} isVisible={menuVisible} />
                ))}
              </div>
            )}

            {activeTab === "acompanhamentos" && (
              <div className="animate-fade-in">
                {menuData.acompanhamentos.map((item, i) => (
                  <MenuItemRow key={i} item={item} lang={lang} isVisible={menuVisible} />
                ))}
              </div>
            )}

            {activeTab === "sobremesas" && (
              <div className="animate-fade-in">
                {menuData.sobremesas.map((item, i) => (
                  <MenuItemRow key={i} item={item} lang={lang} isVisible={menuVisible} />
                ))}
              </div>
            )}

            {activeTab === "vinhos" && (
              <div className="animate-fade-in space-y-8">
                {/* White Wines */}
                <div>
                  <h3 className="text-amber-400 font-serif text-xl mb-4 tracking-wider flex items-center gap-3">
                    <WineGlassIcon />
                    {t.menu.categories.brancos}
                  </h3>
                  {menuData.vinhos.brancos.map((item, i) => (
                    <div key={i} className="flex justify-between py-2 border-b border-amber-900/20 hover:bg-amber-950/20 transition-colors px-2 -mx-2">
                      <div className="flex flex-col">
                        <span className="text-amber-100">{item.name}</span>
                        {item.region && <span className="text-amber-600/70 text-sm">({item.region})</span>}
                      </div>
                      <span className="text-amber-400">€{item.price}</span>
                    </div>
                  ))}
                </div>

                {/* Red Wines */}
                <div>
                  <h3 className="text-amber-400 font-serif text-xl mb-4 tracking-wider flex items-center gap-3">
                    <WineGlassIcon />
                    {t.menu.categories.tintos}
                  </h3>
                  {menuData.vinhos.tintos.map((item, i) => (
                    <div key={i} className="flex justify-between py-2 border-b border-amber-900/20 hover:bg-amber-950/20 transition-colors px-2 -mx-2">
                      <div className="flex flex-col">
                        <span className="text-amber-100">{item.name}</span>
                        {item.region && <span className="text-amber-600/70 text-sm">({item.region})</span>}
                      </div>
                      <span className="text-amber-400">€{item.price}</span>
                    </div>
                  ))}
                </div>

                {/* Rosé */}
                <div>
                  <h3 className="text-amber-400 font-serif text-xl mb-4 tracking-wider flex items-center gap-3">
                    <WineGlassIcon />
                    {t.menu.categories.rose}
                  </h3>
                  {menuData.vinhos.rose.map((item, i) => (
                    <div key={i} className="flex justify-between py-2 border-b border-amber-900/20 hover:bg-amber-950/20 transition-colors px-2 -mx-2">
                      <div className="flex flex-col">
                        <span className="text-amber-100">{item.name}</span>
                        {item.region && <span className="text-amber-600/70 text-sm">({item.region})</span>}
                      </div>
                      <span className="text-amber-400">€{item.price}</span>
                    </div>
                  ))}
                </div>

                {/* Sparkling */}
                <div>
                  <h3 className="text-amber-400 font-serif text-xl mb-4 tracking-wider flex items-center gap-3">
                    <WineGlassIcon />
                    {t.menu.categories.espumante}
                  </h3>
                  {menuData.vinhos.espumante.map((item, i) => (
                    <div key={i} className="flex justify-between py-2 border-b border-amber-900/20 hover:bg-amber-950/20 transition-colors px-2 -mx-2">
                      <div className="flex flex-col">
                        <span className="text-amber-100">{item.name}</span>
                        {item.region && <span className="text-amber-600/70 text-sm">({item.region})</span>}
                      </div>
                      <span className="text-amber-400">€{item.price}</span>
                    </div>
                  ))}
                </div>

                {/* Wine by the Glass */}
                <div>
                  <h3 className="text-amber-400 font-serif text-xl mb-4 tracking-wider flex items-center gap-3">
                    <WineGlassIcon />
                    {t.menu.categories.copo}
                  </h3>
                  {menuData.vinhos.copo.map((item, i) => (
                    <div key={i} className="flex justify-between py-2 border-b border-amber-900/20 hover:bg-amber-950/20 transition-colors px-2 -mx-2">
                      <div className="flex flex-col">
                        <span className="text-amber-100">{item.name}</span>
                        {item.region && <span className="text-amber-600/70 text-sm">({item.region})</span>}
                      </div>
                      <span className="text-amber-400">€{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "bebidas" && (
              <div className="animate-fade-in space-y-4">
                {/* Signature Cocktails */}
                <CollapsibleDrinkSection title={`${t.menu.categories.assinatura} • €12`} icon={<CocktailIcon />} defaultOpen={true}>
                  {menuData.bebidas.cocktailsAssinatura.map((item, i) => (
                    <DrinkItem key={i} name={item.name} price={item.price} description={item.description} descriptionEn={item.descriptionEn} lang={lang} />
                  ))}
                </CollapsibleDrinkSection>

                {/* Classic Cocktails */}
                <CollapsibleDrinkSection title={`${t.menu.categories.classicos} • €8`} icon={<CocktailIcon />}>
                  <div className="grid sm:grid-cols-2 gap-x-4">
                    {menuData.bebidas.cocktailsClassicos.map((item, i) => (
                      <DrinkItem key={i} name={item.name} price={item.price} lang={lang} />
                    ))}
                  </div>
                </CollapsibleDrinkSection>

                {/* Mocktails */}
                <CollapsibleDrinkSection title={`${t.menu.categories.mocktails} • €5`} icon={<JuiceIcon />}>
                  {menuData.bebidas.mocktails.map((item, i) => (
                    <DrinkItem key={i} name={item.name} price={item.price} description={item.description} descriptionEn={item.descriptionEn} lang={lang} />
                  ))}
                </CollapsibleDrinkSection>

                {/* Sangrias */}
                <CollapsibleDrinkSection title={t.menu.categories.sangrias} icon={<SangriaIcon />}>
                  {menuData.bebidas.sangrias.map((item, i) => (
                    <DrinkItem key={i} name={item.name} price={item.price} description={item.description} descriptionEn={item.descriptionEn} lang={lang} />
                  ))}
                </CollapsibleDrinkSection>

                {/* Spirits */}
                <CollapsibleDrinkSection title={t.menu.categories.destilados} icon={<BottleIcon />}>
                  <div className="space-y-6">
                    {/* Vodka */}
                    <div>
                      <h4 className="text-amber-500 text-sm font-medium tracking-wider mb-2">{t.menu.categories.vodka}</h4>
                      {menuData.bebidas.destilados.vodka.map((item, i) => (
                        <DrinkItem key={i} name={item.name} price={item.price} lang={lang} />
                      ))}
                    </div>
                    {/* Rum */}
                    <div>
                      <h4 className="text-amber-500 text-sm font-medium tracking-wider mb-2">{t.menu.categories.rum}</h4>
                      {menuData.bebidas.destilados.rum.map((item, i) => (
                        <DrinkItem key={i} name={item.name} price={item.price} lang={lang} />
                      ))}
                    </div>
                    {/* Gin */}
                    <div>
                      <h4 className="text-amber-500 text-sm font-medium tracking-wider mb-2">{t.menu.categories.gin}</h4>
                      {menuData.bebidas.destilados.gin.map((item, i) => (
                        <DrinkItem key={i} name={item.name} price={item.price} lang={lang} />
                      ))}
                    </div>
                    {/* Whisky */}
                    <div>
                      <h4 className="text-amber-500 text-sm font-medium tracking-wider mb-2">{t.menu.categories.whisky}</h4>
                      {menuData.bebidas.destilados.whisky.map((item, i) => (
                        <DrinkItem key={i} name={item.name} price={item.price} lang={lang} />
                      ))}
                    </div>
                    {/* Cognac */}
                    <div>
                      <h4 className="text-amber-500 text-sm font-medium tracking-wider mb-2">{t.menu.categories.cognac}</h4>
                      {menuData.bebidas.destilados.cognac.map((item, i) => (
                        <DrinkItem key={i} name={item.name} price={item.price} lang={lang} />
                      ))}
                    </div>
                    {/* Vermouth */}
                    <div>
                      <h4 className="text-amber-500 text-sm font-medium tracking-wider mb-2">{t.menu.categories.vermouth}</h4>
                      {menuData.bebidas.destilados.vermouth.map((item, i) => (
                        <DrinkItem key={i} name={item.name} price={item.price} lang={lang} />
                      ))}
                    </div>
                    {/* Tequila */}
                    <div>
                      <h4 className="text-amber-500 text-sm font-medium tracking-wider mb-2">{t.menu.categories.tequila}</h4>
                      {menuData.bebidas.destilados.tequila.map((item, i) => (
                        <DrinkItem key={i} name={item.name} price={item.price} lang={lang} />
                      ))}
                    </div>
                  </div>
                </CollapsibleDrinkSection>

                {/* Beers */}
                <CollapsibleDrinkSection title={t.menu.categories.cervejas} icon={<BeerIcon />}>
                  {menuData.bebidas.cervejas.map((item, i) => (
                    <DrinkItem key={i} name={item.name} price={item.price} lang={lang} />
                  ))}
                </CollapsibleDrinkSection>

                {/* Natural Juices */}
                <CollapsibleDrinkSection title={t.menu.categories.sumosNaturais} icon={<JuiceIcon />}>
                  {menuData.bebidas.sumosNaturais.map((item, i) => (
                    <DrinkItem key={i} name={item.name} price={item.price} lang={lang} />
                  ))}
                </CollapsibleDrinkSection>

                {/* Soft Drinks */}
                <CollapsibleDrinkSection title={t.menu.categories.refrigerantes} icon={<SodaIcon />}>
                  <div className="grid sm:grid-cols-2 gap-x-4">
                    {menuData.bebidas.refrigerantes.map((item, i) => (
                      <DrinkItem key={i} name={item.name} price={item.price} lang={lang} />
                    ))}
                  </div>
                </CollapsibleDrinkSection>

                {/* VAT Note */}
                <p className="text-center text-amber-200/40 text-xs mt-8 italic">
                  {t.menu.vatNote}
                </p>
              </div>
            )}
          </div>

          {/* Floating nav in menu */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-12 text-xs tracking-[0.15em]">
            {navLinks.map((link) => (
              link.isPage ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-amber-200/50 hover:text-amber-400 transition-all hover:scale-110"
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-amber-200/50 hover:text-amber-400 transition-all hover:scale-110"
                >
                  {link.label}
                </button>
              )
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Atmosfera Section */}
      <section id="atmosfera" className="py-24 md:py-32 bg-gradient-to-b from-black via-amber-950/5 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-center text-amber-400 mb-16">
            {t.atmosfera.title}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {atmosphereImages.map((img, i) => (
              <div
                key={i}
                className="relative aspect-[4/5] overflow-hidden group cursor-pointer"
                onClick={() => openLightbox(i)}
              >
                <img
                  src={img}
                  alt={`100 Cerimónias atmosphere ${i + 1}`}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 border-2 border-amber-400 rounded-full flex items-center justify-center bg-black/50">
                    <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Floating nav */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-16 text-xs tracking-[0.15em]">
            {navLinks.map((link) => (
              link.isPage ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-amber-200/50 hover:text-amber-400 transition-all hover:scale-110"
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-amber-200/50 hover:text-amber-400 transition-all hover:scale-110"
                >
                  {link.label}
                </button>
              )
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Contactos / Footer */}
      <footer id="contactos" className="py-24 md:py-32 bg-gradient-to-b from-black to-amber-950/20 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Logo & Tagline */}
            <div className="lg:col-span-2">
              <img
                src="./logo-transparent.png"
                alt="100 Cerimónias"
                className="w-48 mb-6 opacity-70 hover:opacity-100 transition-opacity"
              />
              <p className="text-amber-200/50 text-sm mb-4">
                {t.contactos.established}
              </p>
              <p className="text-amber-200/70 text-sm">
                {t.contactos.hours}
              </p>
              <p className="text-amber-400/70 text-sm">
                {t.contactos.closed}
              </p>
              
              {/* Reservation Button */}
              <a
                href="https://tinyurl.com/100cerimonias"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 px-6 py-3 border border-amber-400 text-amber-400 text-sm tracking-widest hover:bg-amber-400 hover:text-black transition-all hover:scale-105"
              >
                {t.about.reserveButton}
              </a>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-serif text-amber-400 text-lg mb-4 tracking-wider">{t.contactos.title}</h4>
              <div className="space-y-3 text-amber-200/70 text-sm">
                <p>Rua de Santo Ildefonso, 210</p>
                <p>Porto, Portugal</p>
                <p>
                  <a href="tel:+351933156603" className="hover:text-amber-400 transition-colors">
                    +351 933 156 603
                  </a>
                </p>
                <p>
                  <a href="mailto:reservas@100cerimonias.pt" className="hover:text-amber-400 transition-colors">
                    reservas@100cerimonias.pt
                  </a>
                </p>
              </div>
            </div>

            {/* Social & Links */}
            <div>
              <h4 className="font-serif text-amber-400 text-lg mb-4 tracking-wider">{t.contactos.followUs}</h4>
              <div className="flex gap-3 mb-4">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/100.cerimonias.steakhouse/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-amber-900/50 flex items-center justify-center text-amber-200/70 hover:text-amber-400 hover:border-amber-400 hover:scale-110 transition-all"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2.16c3.2,0,3.58.01,4.85.07,3.25.15,4.77,1.69,4.92,4.92.06,1.27.07,1.65.07,4.85s-.01,3.58-.07,4.85c-.15,3.23-1.66,4.77-4.92,4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38,3.92,3.9,2.38,7.15,2.23,8.42,2.17,8.8,2.16,12,2.16ZM12,0C8.74,0,8.33.01,7.05.07c-4.35.2-6.78,2.62-6.98,6.98C.01,8.33,0,8.74,0,12s.01,3.67.07,4.95c.2,4.36,2.62,6.78,6.98,6.98,1.28.06,1.69.07,4.95.07s3.67-.01,4.95-.07c4.35-.2,6.78-2.62,6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01,15.26,0,12,0Zm0,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM18.41,4.15a1.44,1.44,0,1,0,1.44,1.44A1.44,1.44,0,0,0,18.41,4.15Z"/>
                  </svg>
                </a>
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/p/100-Cerim%C3%B3nias-61552994880023/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-amber-900/50 flex items-center justify-center text-amber-200/70 hover:text-amber-400 hover:border-amber-400 hover:scale-110 transition-all"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                {/* Google Reviews */}
                <a
                  href="https://g.page/r/Ccra-11PcYKrEAE/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-amber-900/50 flex items-center justify-center hover:border-amber-400 hover:scale-110 transition-all"
                  aria-label="Google Reviews"
                >
                  {/* Colorful Google G Logo */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </a>
              </div>
              
              <p className="text-amber-200/50 text-sm mb-6">
                @100.cerimonias.steakhouse
              </p>

              {/* Additional Links */}
              <div className="space-y-2 text-sm">
                <a
                  href="https://g.page/r/Ccra-11PcYKrEAE/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-amber-200/60 hover:text-amber-400 transition-colors"
                >
                  {/* Colorful Google G Logo */}
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  {t.contactos.reviews}
                </a>
                <a
                  href="https://www.livroreclamacoes.pt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-amber-200/60 hover:text-amber-400 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {t.contactos.complaints}
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-amber-900/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-amber-200/30 text-xs">
              {t.contactos.copyright}
            </p>
            <div className="flex gap-8 text-xs tracking-[0.15em]">
              {navLinks.map((link) => (
                link.isPage ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-amber-200/40 hover:text-amber-400 transition-all hover:scale-110"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="text-amber-200/40 hover:text-amber-400 transition-all hover:scale-110"
                  >
                    {link.label}
                  </button>
                )
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 bg-black/80 border border-amber-600/50 rounded-full flex items-center justify-center text-amber-400 hover:bg-amber-400 hover:text-black hover:scale-110 transition-all duration-300 backdrop-blur-sm ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>

      {/* Lightbox */}
      <Lightbox 
        images={atmosphereImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />

      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

        .font-serif {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }

        .font-sans {
          font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        /* Hero entrance animation */
        @keyframes hero-entrance {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-hero-entrance {
          animation: hero-entrance 1.5s ease-out forwards;
          animation-delay: 0.5s;
          opacity: 0;
        }

        /* Logo entrance animation */
        @keyframes logo-entrance {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-logo-entrance {
          animation: logo-entrance 1s ease-out forwards;
          animation-delay: 0.7s;
          opacity: 0;
        }

        /* Logo float animation on hover */
        @keyframes logo-float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .group:hover .animate-logo-float {
          animation: logo-float 2s ease-in-out infinite;
        }

        /* Slogan entrance animation */
        @keyframes slogan-entrance {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slogan-entrance {
          animation: slogan-entrance 1s ease-out forwards;
          animation-delay: 1.2s;
          opacity: 0;
        }

        /* Reservation button glow */
        @keyframes reservation-glow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-reservation-glow {
          animation: reservation-glow 2s ease-in-out infinite;
        }

        /* Pulse slow */
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        /* Loading dots */
        @keyframes loading-dot {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-8px);
            opacity: 1;
          }
        }

        .animate-loading-dot {
          animation: loading-dot 1s ease-in-out infinite;
        }

        /* Lightbox animations */
        @keyframes lightbox-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-lightbox-in {
          animation: lightbox-in 0.3s ease-out forwards;
        }

        @keyframes lightbox-image {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-lightbox-image {
          animation: lightbox-image 0.4s ease-out forwards;
        }

        /* Ken Burns effect for hero slideshow */
        @keyframes ken-burns {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.15);
          }
        }

        .animate-ken-burns {
          animation: ken-burns 6s ease-out forwards;
        }

        /* Ken Burns effect for menu background slideshow - slightly different timing and zoom */
        @keyframes menu-ken-burns {
          0% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1.2);
          }
        }

        .animate-menu-ken-burns {
          animation: menu-ken-burns 7s ease-out forwards;
        }

        .animate-running {
          animation-play-state: running;
        }

        .animate-paused {
          animation-play-state: paused;
        }

        /* Shimmer effect for hero button */
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }

        /* Hero button entrance */
        @keyframes hero-button-entrance {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-hero-button-entrance {
          animation: hero-button-entrance 0.8s ease-out forwards;
          animation-delay: 1.4s;
          opacity: 0;
        }

        html {
          scroll-behavior: smooth;
        }

        /* Custom transition duration for smooth crossfade */
        .duration-1500 {
          transition-duration: 1500ms;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #000;
        }

        ::-webkit-scrollbar-thumb {
          background: #78350f;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #92400e;
        }
      `}</style>
    </div>
  );
}

export default Index;
