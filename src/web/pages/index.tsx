import { useState, useEffect } from "react";

// Menu data
const menuData = {
  entradas: [
    { name: "Croquetes de Alheira", description: "Croquetes crocantes de alheira tradicional portuguesa", price: "8,50" },
    { name: "Tacos de Xixinha", description: "Tacos recheados com carne desfiada temperada", price: "10,50" },
    { name: "Ovos Rotos 100 Cerimónias", description: "Ovos estrelados sobre batata frita com presunto", price: "13", signature: true },
    { name: "Tártaro de Novilho", description: "Carne de novilho picada à mão, temperada na hora", price: "15" },
    { name: "Camarão 100 Cerimónias", description: "Camarão grelhado com alho e ervas aromáticas", price: "12", signature: true },
  ],
  naBrasa: [
    { name: "Vazia", description: "Maturação de 22 dias", price: "28", weight: "250gr" },
    { name: "Picanha", description: "Corte típico argentino com gordura lateral", price: "48", weight: "500gr", signature: true },
    { name: "Txuletón", description: "Corte típico basco com osso", price: "79", weight: "1kg", bestseller: true },
    { name: "Tomahawk", description: "Corte invulgar com osso extenso", price: "89", weight: "1kg", signature: true, bestseller: true },
    { name: "T-Bone", description: "Osso em T que separa vazia e lombo", price: "79", weight: "1kg" },
    { name: "Tábua Premium 100 Cerimónias", description: "Carnes para todos os gostos", price: "172", weight: "2kg", signature: true },
  ],
  acompanhamentos: [
    { name: "Batata Rústica", description: "", price: "4,50", veggie: true },
    { name: "Salada Mista", description: "", price: "4", veggie: true },
    { name: "Legumes Grelhados na Brasa", description: "", price: "4,50", veggie: true },
    { name: "Arroz de Forno de Enchidos", description: "", price: "4" },
    { name: "Puré de Batata Trufado", description: "", price: "7,50", veggie: true },
  ],
  sobremesas: [
    { name: "Bola de Gelado 100 Cerimónias", description: "", price: "4" },
    { name: "Surpresa de Maracujá", description: "", price: "10" },
    { name: "Fondant de Doce de Leite", description: "", price: "12", bestseller: true },
    { name: "Brownie de Chocolate", description: "", price: "10" },
  ],
  vinhos: {
    brancos: [
      { name: "Vale do Homem Aditivo", price: "20" },
      { name: "Contacto Alvarinho", price: "28" },
      { name: "Dote Simplesmente", price: "22" },
    ],
    tintos: [
      { name: "Zip Unoaked", price: "20" },
      { name: "Vale da Aldeia", price: "26" },
      { name: "Vallado", price: "28" },
      { name: "Loek's Grande Reserva", price: "60" },
    ],
  },
  cocktails: {
    assinatura: [
      { name: "Lick My Peach", price: "12" },
      { name: "Em Brasa", price: "12" },
      { name: "Special Mojito", price: "12" },
      { name: "Cerimónias Mule", price: "12" },
    ],
    classicos: [
      { name: "Margarita", price: "8" },
      { name: "Cosmopolitan", price: "8" },
      { name: "Mojito", price: "8" },
      { name: "Caipirinha", price: "8" },
      { name: "Negroni", price: "8" },
    ],
  },
};

const navLinks = [
  { href: "#sobre", label: "SOBRE NÓS" },
  { href: "#menu", label: "MENU" },
  { href: "#atmosfera", label: "ATMOSFERA" },
  { href: "#equipa", label: "A EQUIPA" },
  { href: "#contactos", label: "CONTACTOS" },
];

const menuTabs = [
  { id: "entradas", label: "Entradas" },
  { id: "naBrasa", label: "Na Brasa" },
  { id: "acompanhamentos", label: "Acompanhamentos" },
  { id: "sobremesas", label: "Sobremesas" },
  { id: "vinhos", label: "Vinhos" },
  { id: "cocktails", label: "Cocktails" },
];

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
  price: string;
  weight?: string;
  signature?: boolean;
  bestseller?: boolean;
  veggie?: boolean;
}

const MenuItemRow = ({ item }: { item: MenuItem }) => (
  <div className="group border-b border-amber-900/30 py-4 hover:bg-amber-950/20 transition-colors px-2 -mx-2">
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
        {item.description && (
          <p className="text-amber-200/60 text-sm mt-1">{item.description}</p>
        )}
      </div>
      <span className="font-serif text-xl text-amber-400 whitespace-nowrap">
        €{item.price}
      </span>
    </div>
  </div>
);

const ColorfulCow = () => (
  <svg viewBox="0 0 200 160" className="w-48 h-auto">
    {/* Body */}
    <polygon points="40,100 80,60 140,60 160,100 140,140 60,140" fill="#FF6B35"/>
    <polygon points="80,60 110,40 140,60 110,80" fill="#FFD93D"/>
    <polygon points="40,100 60,140 80,120 60,90" fill="#6BCB77"/>
    <polygon points="140,60 160,100 140,100 130,80" fill="#4D96FF"/>
    <polygon points="60,140 100,140 80,120" fill="#FF6B9D"/>
    <polygon points="100,140 140,140 120,120" fill="#C9B1FF"/>
    {/* Head */}
    <polygon points="110,40 130,20 150,40 140,60 110,60" fill="#FF6B35"/>
    <polygon points="130,20 145,5 155,25 150,40" fill="#FFD93D"/>
    {/* Horns */}
    <polygon points="120,20 115,5 130,15" fill="#6BCB77"/>
    <polygon points="145,15 155,0 150,20" fill="#4D96FF"/>
    {/* Legs */}
    <rect x="55" y="140" width="12" height="18" fill="#FF6B9D"/>
    <rect x="85" y="140" width="12" height="18" fill="#C9B1FF"/>
    <rect x="115" y="140" width="12" height="18" fill="#6BCB77"/>
    <rect x="135" y="140" width="12" height="18" fill="#4D96FF"/>
    {/* Tail */}
    <path d="M40,100 Q20,90 25,70" stroke="#FFD93D" strokeWidth="4" fill="none"/>
    <circle cx="25" cy="70" r="5" fill="#FFD93D"/>
  </svg>
);

function Index() {
  const [activeTab, setActiveTab] = useState("entradas");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-amber-50 font-sans">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-black/95 backdrop-blur-md py-3" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <button onClick={() => scrollToSection("#hero")} className="flex-shrink-0">
            <img 
              src="./a3cfa0aa1472.png" 
              alt="100 Cerimónias" 
              className={`transition-all duration-300 ${isScrolled ? 'h-12' : 'h-16'}`}
            />
          </button>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-sm tracking-[0.2em] text-amber-200/80 hover:text-amber-400 transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-amber-400 p-2"
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

        {/* Mobile Nav */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 bg-black/98 backdrop-blur-md border-t border-amber-900/30 transition-all duration-300 ${
            mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-sm tracking-[0.2em] text-amber-200/80 hover:text-amber-400 transition-colors text-left py-2"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="./8b93502b-3f37-4894-9695-18b59fe1c30e.jpg"
            alt="Brasa viva"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 animate-fade-in">
          <img
            src="./a3cfa0aa1472.png"
            alt="100 Cerimónias Steakhouse Premium"
            className="w-64 sm:w-80 md:w-96 mx-auto mb-8 drop-shadow-2xl"
          />
          <p className="font-serif text-amber-400 text-xl md:text-2xl tracking-widest mb-12 opacity-90">
            STEAKHOUSE PREMIUM
          </p>
          
          {/* Nav links under logo */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {navLinks.map((link, i) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-xs md:text-sm tracking-[0.2em] text-amber-200/70 hover:text-amber-400 transition-colors"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {link.label}
              </button>
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

      {/* About / Passion Section */}
      <section id="sobre" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-amber-950/10 to-black" />
        
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-amber-400 mb-8 leading-tight">
                SOMOS UNS<br />APAIXONADOS
              </h2>
              <p className="text-amber-100/80 text-lg md:text-xl leading-relaxed font-light">
                No 100 Cerimónias Steakhouse, a carne é o centro de tudo. Selecionamos cortes premium, 
                trabalhados com rigor, respeito pelo produto e uma obsessão clara pela qualidade. 
                Aqui, cada prato é uma celebração do sabor, da textura e do ponto perfeito.
              </p>
              <div className="mt-8 w-24 h-px bg-gradient-to-r from-amber-400 to-transparent" />
            </div>
            
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-8 bg-amber-400/5 rounded-full blur-3xl" />
                <ColorfulCow />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 md:py-32 relative">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="./1277703a-2b54-4bf2-ac50-a3cddc437347.jpg"
            alt="Restaurant atmosphere"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative">
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-center text-amber-400 mb-16">
            MENU
          </h2>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
            {menuTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm tracking-[0.15em] transition-all border ${
                  activeTab === tab.id
                    ? "bg-amber-400 text-black border-amber-400"
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
                  <MenuItemRow key={i} item={item} />
                ))}
              </div>
            )}

            {activeTab === "naBrasa" && (
              <div className="animate-fade-in">
                {menuData.naBrasa.map((item, i) => (
                  <MenuItemRow key={i} item={item} />
                ))}
              </div>
            )}

            {activeTab === "acompanhamentos" && (
              <div className="animate-fade-in">
                {menuData.acompanhamentos.map((item, i) => (
                  <MenuItemRow key={i} item={item} />
                ))}
              </div>
            )}

            {activeTab === "sobremesas" && (
              <div className="animate-fade-in">
                {menuData.sobremesas.map((item, i) => (
                  <MenuItemRow key={i} item={item} />
                ))}
              </div>
            )}

            {activeTab === "vinhos" && (
              <div className="animate-fade-in space-y-8">
                <div>
                  <h3 className="text-amber-400 font-serif text-xl mb-4 tracking-wider">BRANCOS</h3>
                  {menuData.vinhos.brancos.map((item, i) => (
                    <div key={i} className="flex justify-between py-2 border-b border-amber-900/20">
                      <span className="text-amber-100">{item.name}</span>
                      <span className="text-amber-400">€{item.price}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="text-amber-400 font-serif text-xl mb-4 tracking-wider">TINTOS</h3>
                  {menuData.vinhos.tintos.map((item, i) => (
                    <div key={i} className="flex justify-between py-2 border-b border-amber-900/20">
                      <span className="text-amber-100">{item.name}</span>
                      <span className="text-amber-400">€{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "cocktails" && (
              <div className="animate-fade-in space-y-8">
                <div>
                  <h3 className="text-amber-400 font-serif text-xl mb-4 tracking-wider">ASSINATURA • €12</h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {menuData.cocktails.assinatura.map((item, i) => (
                      <div key={i} className="text-amber-100 py-2 border-b border-amber-900/20">
                        {item.name}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-amber-400 font-serif text-xl mb-4 tracking-wider">CLÁSSICOS • €8</h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {menuData.cocktails.classicos.map((item, i) => (
                      <div key={i} className="text-amber-100 py-2 border-b border-amber-900/20">
                        {item.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Floating nav in menu */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-12 text-xs tracking-[0.15em]">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-amber-200/50 hover:text-amber-400 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Atmosfera Section */}
      <section id="atmosfera" className="py-24 md:py-32 bg-gradient-to-b from-black via-amber-950/5 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-center text-amber-400 mb-16">
            ATMOSFERA
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {atmosphereImages.map((img, i) => (
              <div
                key={i}
                className="relative aspect-[4/5] overflow-hidden group cursor-pointer"
              >
                <img
                  src={img}
                  alt={`100 Cerimónias atmosphere ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>

          {/* Floating nav */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-16 text-xs tracking-[0.15em]">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-amber-200/50 hover:text-amber-400 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* A Equipa Section */}
      <section id="equipa" className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-amber-950/10 to-black" />
        
        <div className="max-w-6xl mx-auto px-6 relative">
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-center text-amber-400 mb-6">
            A EQUIPA
          </h2>
          <h3 className="font-serif text-xl md:text-2xl text-center text-amber-200/60 mb-8">
            100 CERIMÓNIAS
          </h3>
          
          <p className="text-center text-amber-100/70 max-w-3xl mx-auto mb-16 text-lg leading-relaxed">
            Por trás de cada prato extraordinário existe uma equipa apaixonada. 
            Profissionais dedicados que transformam ingredientes premium em experiências memoráveis, 
            unindo técnica, tradição e criatividade em cada detalhe.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Chef */}
            <div className="group">
              <div className="relative aspect-[3/4] overflow-hidden mb-6">
                <img
                  src="./1b8daf33-f44a-4004-9a78-9ac0575641d1.jpg"
                  alt="Head Chef"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </div>
              <h4 className="font-serif text-2xl text-amber-400 mb-2">Head Chef</h4>
              <p className="text-amber-100/60 text-sm leading-relaxed">
                Mestre da brasa, com anos de experiência nos melhores cortes do mundo. 
                Cada peça é tratada com a precisão que só a paixão proporciona.
              </p>
            </div>

            {/* Sommelier */}
            <div className="group">
              <div className="relative aspect-[3/4] overflow-hidden mb-6">
                <img
                  src="./85045d6c-1f52-42a3-8a59-565b62ec4b13.jpg"
                  alt="Sommelier"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </div>
              <h4 className="font-serif text-2xl text-amber-400 mb-2">Sommelier</h4>
              <p className="text-amber-100/60 text-sm leading-relaxed">
                Curador da nossa carta de vinhos, selecionando rótulos que 
                complementam e elevam cada corte servido à mesa.
              </p>
            </div>

            {/* Gerente */}
            <div className="group">
              <div className="relative aspect-[3/4] overflow-hidden mb-6">
                <img
                  src="./39e5e286-7685-49e6-893a-385744302fdb.jpg"
                  alt="Gerente"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </div>
              <h4 className="font-serif text-2xl text-amber-400 mb-2">Gerente</h4>
              <p className="text-amber-100/60 text-sm leading-relaxed">
                O maestro que orquestra cada serviço, garantindo que cada 
                visita seja uma cerimónia perfeita do início ao fim.
              </p>
            </div>
          </div>

          {/* Floating nav */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-16 text-xs tracking-[0.15em]">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-amber-200/50 hover:text-amber-400 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Contactos / Footer */}
      <footer id="contactos" className="py-24 md:py-32 bg-gradient-to-b from-black to-amber-950/20 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Logo & Tagline */}
            <div className="lg:col-span-2">
              <img
                src="./a3cfa0aa1472.png"
                alt="100 Cerimónias"
                className="w-48 mb-6 opacity-70"
              />
              <p className="text-amber-200/50 text-sm">
                Steakhouse Premium • Estabelecido 2023
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-serif text-amber-400 text-lg mb-4 tracking-wider">CONTACTOS</h4>
              <div className="space-y-3 text-amber-200/70 text-sm">
                <p>Porto, Portugal</p>
                <p>
                  <a href="tel:+351222000100" className="hover:text-amber-400 transition-colors">
                    +351 222 000 100
                  </a>
                </p>
                <p>
                  <a href="mailto:reservas@100cerimonias.pt" className="hover:text-amber-400 transition-colors">
                    reservas@100cerimonias.pt
                  </a>
                </p>
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-serif text-amber-400 text-lg mb-4 tracking-wider">SIGA-NOS</h4>
              <div className="flex gap-4">
                {/* Facebook */}
                <a
                  href="#"
                  className="w-10 h-10 border border-amber-900/50 flex items-center justify-center text-amber-200/70 hover:text-amber-400 hover:border-amber-400 transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="#"
                  className="w-10 h-10 border border-amber-900/50 flex items-center justify-center text-amber-200/70 hover:text-amber-400 hover:border-amber-400 transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2.16c3.2,0,3.58.01,4.85.07,3.25.15,4.77,1.69,4.92,4.92.06,1.27.07,1.65.07,4.85s-.01,3.58-.07,4.85c-.15,3.23-1.66,4.77-4.92,4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38,3.92,3.9,2.38,7.15,2.23,8.42,2.17,8.8,2.16,12,2.16ZM12,0C8.74,0,8.33.01,7.05.07c-4.35.2-6.78,2.62-6.98,6.98C.01,8.33,0,8.74,0,12s.01,3.67.07,4.95c.2,4.36,2.62,6.78,6.98,6.98,1.28.06,1.69.07,4.95.07s3.67-.01,4.95-.07c4.35-.2,6.78-2.62,6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01,15.26,0,12,0Zm0,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM18.41,4.15a1.44,1.44,0,1,0,1.44,1.44A1.44,1.44,0,0,0,18.41,4.15Z"/>
                  </svg>
                </a>
                {/* TripAdvisor */}
                <a
                  href="#"
                  className="w-10 h-10 border border-amber-900/50 flex items-center justify-center text-amber-200/70 hover:text-amber-400 hover:border-amber-400 transition-colors"
                  aria-label="TripAdvisor"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10,10-4.48,10-10S17.52,2,12,2Zm0,18c-4.41,0-8-3.59-8-8s3.59-8,8-8,8,3.59,8,8-3.59,8-8,8Zm-3.5-6.5c0-.83.67-1.5,1.5-1.5s1.5.67,1.5,1.5-.67,1.5-1.5,1.5-1.5-.67-1.5-1.5Zm5,0c0-.83.67-1.5,1.5-1.5s1.5.67,1.5,1.5-.67,1.5-1.5,1.5-1.5-.67-1.5-1.5ZM12,8c-2.76,0-5,2.24-5,5h2c0-1.66,1.34-3,3-3s3,1.34,3,3h2c0-2.76-2.24-5-5-5Z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-amber-900/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-amber-200/30 text-xs">
              © 2023 100 Cerimónias Steakhouse. Todos os direitos reservados.
            </p>
            <div className="flex gap-8 text-xs tracking-[0.15em]">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-amber-200/40 hover:text-amber-400 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>

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

        html {
          scroll-behavior: smooth;
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
