import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";

// Translations for the about page
const translations = {
  pt: {
    nav: {
      sobreNos: "SOBRE NÓS",
      menu: "MENU",
      atmosfera: "ATMOSFERA",
      contactos: "CONTACTOS",
      voltar: "VOLTAR",
    },
    about: {
      title: "SOBRE O GRUPO",
      subtitle: "A nossa história",
      text1: "Somos um grupo de pessoas que se juntaram e que tentam fazer a vida valer da melhor maneira que conseguimos. Completamente diferentes, conseguimos encontrar o nosso equilíbrio e todas as noites conseguimos entregar refeições onde o objetivo é sempre um sorriso na cara das pessoas.",
      text2: "Criámos um espaço elegante, confortável e sem cerimónias desnecessárias, onde o foco está na partilha de comida, emoções e momentos.",
      text3: "Inspiramo-nos nas grandes steakhouses internacionais, mas mantemos uma identidade própria, enraizada no Porto, uma cidade de carácter, tradição e autenticidade. Acreditamos que a excelência não precisa de excessos, precisa de consistência, conhecimento e paixão.",
      reserveButton: "RESERVAR MESA",
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
      voltar: "BACK",
    },
    about: {
      title: "ABOUT THE GROUP",
      subtitle: "Our story",
      text1: "We are a group of people who came together trying to make life worthwhile in the best way we can. Completely different, we found our balance and every night we deliver meals where the goal is always a smile on people's faces.",
      text2: "We created an elegant, comfortable space without unnecessary ceremonies, where the focus is on sharing food, emotions and moments.",
      text3: "We are inspired by the great international steakhouses, but we maintain our own identity, rooted in Porto, a city of character, tradition and authenticity. We believe that excellence doesn't need excess, it needs consistency, knowledge and passion.",
      reserveButton: "BOOK A TABLE",
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

type Language = "pt" | "en";

// Elegant section divider
const SectionDivider = () => (
  <div className="flex items-center justify-center py-8">
    <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-600/50" />
    <div className="w-2 h-2 rotate-45 border border-amber-600/50 mx-4" />
    <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-600/50" />
  </div>
);

function SobrePage() {
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

  const t = translations[lang];

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
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
            className="w-32 animate-pulse"
          />
          <div className="mt-6 flex gap-1 justify-center">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>

      {/* Grain texture overlay */}
      <div className="fixed inset-0 pointer-events-none z-[90] opacity-[0.03]">
        <svg className="w-full h-full">
          <filter id="grain-about">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-about)" />
        </svg>
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-black/80 backdrop-blur-lg py-3 shadow-lg shadow-black/20" 
            : "bg-black/60 backdrop-blur-sm py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link 
            href="/"
            className="flex-shrink-0 group"
          >
            <img 
              src="./logo-transparent.png" 
              alt="100 Cerimónias" 
              className={`transition-all duration-300 group-hover:scale-105 ${isScrolled ? 'h-12' : 'h-16'}`}
            />
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <span className="text-sm tracking-[0.2em] text-amber-400 relative">
              {t.nav.sobreNos}
              <span className="absolute -bottom-1 left-0 w-full h-px bg-amber-400" />
            </span>
            <Link
              href="/#menu"
              className="text-sm tracking-[0.2em] text-amber-200/80 hover:text-amber-400 transition-all hover:scale-105 relative group"
            >
              {t.nav.menu}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/#atmosfera"
              className="text-sm tracking-[0.2em] text-amber-200/80 hover:text-amber-400 transition-all hover:scale-105 relative group"
            >
              {t.nav.atmosfera}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/#contactos"
              className="text-sm tracking-[0.2em] text-amber-200/80 hover:text-amber-400 transition-all hover:scale-105 relative group"
            >
              {t.nav.contactos}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300" />
            </Link>
            
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
            <span className="text-sm tracking-[0.2em] text-amber-400 py-2">
              {t.nav.sobreNos}
            </span>
            <Link
              href="/#menu"
              className="text-sm tracking-[0.2em] text-amber-200/80 hover:text-amber-400 transition-colors text-left py-2"
            >
              {t.nav.menu}
            </Link>
            <Link
              href="/#atmosfera"
              className="text-sm tracking-[0.2em] text-amber-200/80 hover:text-amber-400 transition-colors text-left py-2"
            >
              {t.nav.atmosfera}
            </Link>
            <Link
              href="/#contactos"
              className="text-sm tracking-[0.2em] text-amber-200/80 hover:text-amber-400 transition-colors text-left py-2"
            >
              {t.nav.contactos}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with restaurant image */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="./85045d6c-1f52-42a3-8a59-565b62ec4b13.jpg"
            alt="100 Cerimónias Restaurant"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        </div>

        {/* Hero Content */}
        <div className={`relative z-10 text-center px-6 ${isLoading ? "opacity-0" : "animate-fade-in"}`}>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-amber-400 mb-4 tracking-wide">
            {t.about.title}
          </h1>
          <p className="font-serif text-amber-200/70 text-xl md:text-2xl tracking-[0.3em] italic">
            {t.about.subtitle}
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <SectionDivider />

      {/* About Content Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-amber-950/10 to-black" />
        
        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="space-y-8 max-w-3xl mx-auto">
            <p className="text-amber-100/90 text-base md:text-lg leading-relaxed font-light tracking-wide animate-fade-in">
              {t.about.text1}
            </p>
            <p className="text-amber-100/90 text-base md:text-lg leading-relaxed font-light tracking-wide animate-fade-in" style={{ animationDelay: "200ms" }}>
              {t.about.text2}
            </p>
            <p className="text-amber-100/90 text-base md:text-lg leading-relaxed font-light tracking-wide animate-fade-in" style={{ animationDelay: "400ms" }}>
              {t.about.text3}
            </p>
          </div>
          
          <div className="mt-12 w-32 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
          
          {/* Values Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-6 border border-amber-900/30 bg-black/40 backdrop-blur-sm hover:border-amber-600/50 transition-all duration-500 group">
              <div className="w-16 h-16 mx-auto mb-4 border border-amber-600/50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-amber-400 mb-2 tracking-wider">
                {lang === "pt" ? "Paixão" : "Passion"}
              </h3>
              <p className="text-amber-200/60 text-sm">
                {lang === "pt" 
                  ? "Cada prato é preparado com amor e dedicação" 
                  : "Every dish is prepared with love and dedication"}
              </p>
            </div>
            
            <div className="text-center p-6 border border-amber-900/30 bg-black/40 backdrop-blur-sm hover:border-amber-600/50 transition-all duration-500 group">
              <div className="w-16 h-16 mx-auto mb-4 border border-amber-600/50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-amber-400 mb-2 tracking-wider">
                {lang === "pt" ? "Qualidade" : "Quality"}
              </h3>
              <p className="text-amber-200/60 text-sm">
                {lang === "pt" 
                  ? "Selecionamos apenas os melhores cortes" 
                  : "We select only the finest cuts"}
              </p>
            </div>
            
            <div className="text-center p-6 border border-amber-900/30 bg-black/40 backdrop-blur-sm hover:border-amber-600/50 transition-all duration-500 group">
              <div className="w-16 h-16 mx-auto mb-4 border border-amber-600/50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-amber-400 mb-2 tracking-wider">
                {lang === "pt" ? "Equipa" : "Team"}
              </h3>
              <p className="text-amber-200/60 text-sm">
                {lang === "pt" 
                  ? "Uma família unida pelo amor à gastronomia" 
                  : "A family united by the love of gastronomy"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Gallery Preview */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-black via-amber-950/5 to-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <img src="./0d3ca745-bfea-410b-969b-7df83d9607af.jpg" alt="Restaurant" className="w-full aspect-square object-cover opacity-70 hover:opacity-100 transition-opacity" />
            <img src="./39e5e286-7685-49e6-893a-385744302fdb.jpg" alt="Bar" className="w-full aspect-square object-cover opacity-70 hover:opacity-100 transition-opacity" />
            <img src="./99620f26-b610-42b4-a5bf-d0d7df4b54d9.jpg" alt="Food" className="w-full aspect-square object-cover opacity-70 hover:opacity-100 transition-opacity" />
            <img src="./a5e37b97-57ed-4949-8d6c-84ecde77bf38.jpg" alt="Steak" className="w-full aspect-square object-cover opacity-70 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* CTA Section */}
      <section className="py-20 md:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-amber-950/20 to-black" />
        
        <div className="max-w-4xl mx-auto px-6 relative text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-amber-400 mb-6">
            {lang === "pt" ? "Venha conhecer-nos" : "Come visit us"}
          </h2>
          <p className="text-amber-200/70 mb-8 max-w-xl mx-auto">
            {lang === "pt" 
              ? "Reserve a sua mesa e viva uma experiência gastronómica única no coração do Porto." 
              : "Book your table and enjoy a unique gastronomic experience in the heart of Porto."}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://tinyurl.com/100cerimonias"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block group overflow-hidden"
            >
              <div className="relative px-8 py-4 bg-amber-400 text-black font-medium tracking-[0.2em] group-hover:bg-amber-300 transition-all group-hover:scale-105">
                {t.about.reserveButton}
              </div>
            </a>
            
            <Link
              href="/"
              className="inline-block px-8 py-4 border border-amber-400 text-amber-400 font-medium tracking-[0.2em] hover:bg-amber-400/10 transition-all hover:scale-105"
            >
              {t.nav.voltar}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gradient-to-b from-black to-amber-950/20 relative border-t border-amber-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <img
                src="./logo-transparent.png"
                alt="100 Cerimónias"
                className="w-32 mb-4 opacity-70 mx-auto md:mx-0"
              />
              <p className="text-amber-200/50 text-sm">
                {t.contactos.established}
              </p>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-amber-200/70 text-sm mb-2">
                Rua de Santo Ildefonso, 210
              </p>
              <p className="text-amber-200/70 text-sm mb-2">
                Porto, Portugal
              </p>
              <a href="tel:+351933156603" className="text-amber-400 text-sm hover:text-amber-300 transition-colors">
                +351 933 156 603
              </a>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center gap-4 mt-8">
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
            <a
              href="https://g.page/r/Ccra-11PcYKrEAE/review"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-amber-900/50 flex items-center justify-center hover:border-amber-400 hover:scale-110 transition-all"
              aria-label="Google Reviews"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </a>
          </div>
          
          <div className="border-t border-amber-900/30 pt-8 mt-8 text-center">
            <p className="text-amber-200/30 text-xs">
              {t.contactos.copyright}
            </p>
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

      {/* Custom CSS animations */}
      <style>{`
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
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default SobrePage;
