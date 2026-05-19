import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  Shield,
  Compass,
  Sparkles,
  Instagram,
  Twitter,
  Facebook,
  MessageCircle,
  ArrowRight,
  Quote,
} from "lucide-react";
import parisImg from "@/assets/paris-1889.jpg";
import cretaceImg from "@/assets/cretace.jpg";
import florenceImg from "@/assets/florence-1504.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "TimeTravel Agency — Voyages temporels de luxe" },
      {
        name: "description",
        content:
          "L'agence de voyage temporel de luxe. Explorez l'histoire en toute sécurité avec des guides historiens experts.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }).map(() => ({
        left: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 12,
        duration: Math.random() * 14 + 12,
        bottom: -Math.random() * 30,
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: `${p.left}%`,
            bottom: `${p.bottom}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <a href="#top" className="group flex items-center gap-2">
          <span className="text-gold font-serif text-xl tracking-tight">TimeTravel</span>
          <span className="text-foreground/80 font-light text-sm tracking-[0.2em] uppercase">
            Agency
          </span>
        </a>
        <ul className="hidden md:flex items-center gap-10 text-sm">
          {[
            { label: "Destinations", href: "#destinations" },
            { label: "À propos", href: "#about" },
            { label: "Contact", href: "#contact" },
          ].map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-foreground/80 hover:text-gold transition-colors duration-300"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#destinations"
          className="hidden md:inline-flex items-center gap-2 rounded-full border border-gold/40 text-gold px-5 py-2 text-sm hover:bg-gold hover:text-primary-foreground transition-all duration-300"
        >
          Réserver
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  return (
    <section id="top" className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
      <Particles />
      <motion.div
        style={{ y }}
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-block text-gold text-xs tracking-[0.4em] uppercase mb-8"
        >
          — Depuis 2087 —
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] text-foreground"
        >
          Explorez l'histoire,
          <br />
          <span className="italic text-gold">réinventée</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-8 text-base md:text-xl text-foreground/70 max-w-2xl mx-auto font-light"
        >
          L'agence de voyage temporel de luxe — voyagez dans le temps en toute sécurité.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#destinations"
            className="group inline-flex items-center gap-2 bg-gold text-primary-foreground px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:shadow-2xl hover:shadow-gold/30 transition-all duration-500 hover:-translate-y-0.5"
          >
            Découvrir les destinations
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-foreground/20 text-foreground px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:border-gold hover:text-gold transition-all duration-500"
          >
            Réserver maintenant
          </a>
        </motion.div>
      </motion.div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-foreground/40 text-xs tracking-[0.3em] uppercase">
        Défiler
      </div>
    </section>
  );
}

const values = [
  {
    icon: Shield,
    title: "Sécurité quantique certifiée",
    desc: "Chaque voyage est protégé par notre protocole de stabilité temporelle breveté, validé par l'Institut Chronologique International.",
  },
  {
    icon: Compass,
    title: "Guides historiens experts",
    desc: "Nos accompagnateurs sont des docteurs en histoire formés à l'immersion culturelle et linguistique de chaque époque.",
  },
  {
    icon: Sparkles,
    title: "Expérience immersive garantie",
    desc: "Costumes d'époque sur mesure, monnaie authentique et hébergement de prestige — l'illusion est totale.",
  },
];

function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-2xl"
        >
          <span className="text-gold text-xs tracking-[0.4em] uppercase">L'agence</span>
          <h2 className="mt-4 font-serif text-4xl md:text-6xl leading-tight">
            Un luxe hors du <span className="italic text-gold">temps</span>.
          </h2>
          <p className="mt-6 text-foreground/70 text-lg font-light">
            Nous façonnons depuis trois décennies des voyages qui défient la chronologie.
            Discrétion, raffinement et précision absolue.
          </p>
        </motion.div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-2xl border border-border bg-card p-8 hover:border-gold/50 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-primary-foreground transition-all duration-500">
                <v.icon className="w-5 h-5 text-gold group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-serif text-xl mb-3">{v.title}</h3>
              <p className="text-foreground/65 text-sm leading-relaxed font-light">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const destinations = [
  {
    era: "1889",
    title: "Paris, Belle Époque",
    desc: "Vivez l'inauguration de la Tour Eiffel et l'effervescence de l'Exposition Universelle.",
    price: "12 500 €",
    image: parisImg,
    alt: "Paris en 1889, vue de la Tour Eiffel et de l'Exposition Universelle",
  },
  {
    era: "-65M",
    title: "Crétacé supérieur",
    desc: "Côtoyez les dinosaures dans une nature préhistorique vierge, sous escorte armée.",
    price: "18 900 €",
    image: cretaceImg,
    alt: "Paysage du Crétacé avec dinosaures dans une forêt préhistorique",
  },
  {
    era: "1504",
    title: "Florence, Renaissance",
    desc: "Rencontrez Michel-Ange dans son atelier au moment du dévoilement du David.",
    price: "14 200 €",
    image: florenceImg,
    alt: "Florence en 1504, vue sur le Duomo et l'architecture Renaissance",
  },
];

function Destinations() {
  return (
    <section id="destinations" className="relative py-32 px-6 bg-secondary/30">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <span className="text-gold text-xs tracking-[0.4em] uppercase">Catalogue</span>
            <h2 className="mt-4 font-serif text-4xl md:text-6xl leading-tight">
              Destinations <span className="italic text-gold">d'exception</span>
            </h2>
          </div>
          <p className="text-foreground/65 max-w-md font-light">
            Une sélection confidentielle d'époques accessibles uniquement à nos clients privilégiés.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {destinations.map((d, i) => (
            <motion.article
              key={d.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-gold/40 hover:gold-shadow transition-all duration-500"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={d.image}
                  alt={d.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                <span className="absolute top-5 left-5 bg-gold/95 text-primary-foreground text-xs tracking-[0.2em] uppercase px-3 py-1.5 rounded-full font-medium">
                  {d.era}
                </span>
              </div>
              <div className="p-7">
                <h3 className="font-serif text-2xl mb-2">{d.title}</h3>
                <p className="text-foreground/65 text-sm font-light leading-relaxed line-clamp-2">
                  {d.desc}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-foreground/50 uppercase tracking-wider">
                      À partir de
                    </div>
                    <div className="text-gold font-serif text-xl">{d.price}</div>
                  </div>
                  <button className="inline-flex items-center gap-2 bg-gold text-primary-foreground px-5 py-2.5 rounded-full text-sm font-medium hover:shadow-lg hover:shadow-gold/30 transition-all">
                    Réserver
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: "Camille Beauchamp",
    role: "Voyage à Paris 1889",
    quote:
      "Voir s'illuminer la Tour Eiffel pour la première fois, entourée d'une foule en redingote — j'en pleure encore. Une organisation impeccable.",
  },
  {
    name: "Étienne Rousseau",
    role: "Expédition Crétacé -65M",
    quote:
      "Marcher à dix mètres d'un tricératops vivant restera la plus grande émotion de ma vie. Les guides ont géré chaque seconde avec maîtrise.",
  },
  {
    name: "Hélène Marchand",
    role: "Séjour à Florence 1504",
    quote:
      "Michel-Ange m'a serré la main. Je n'ai plus de mots. TimeTravel Agency a tenu la promesse de l'impossible.",
  },
];

function Testimonials() {
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="text-gold text-xs tracking-[0.4em] uppercase">Témoignages</span>
          <h2 className="mt-4 font-serif text-4xl md:text-6xl leading-tight">
            Ils ont franchi le <span className="italic text-gold">seuil</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-2xl border border-border bg-card p-8"
            >
              <Quote className="w-8 h-8 text-gold/60 mb-4" />
              <blockquote className="text-foreground/85 font-light text-base leading-relaxed italic">
                « {t.quote} »
              </blockquote>
              <figcaption className="mt-6 pt-6 border-t border-border">
                <div className="font-serif text-lg">{t.name}</div>
                <div className="text-xs text-gold tracking-wider uppercase mt-1">{t.role}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="relative border-t border-border bg-secondary/40 pt-20 pb-10 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-gold font-serif text-2xl">TimeTravel</span>
              <span className="text-foreground/80 font-light text-sm tracking-[0.2em] uppercase">
                Agency
              </span>
            </div>
            <p className="mt-4 text-foreground/65 font-light max-w-md">
              Voyages temporels privés et confidentiels depuis 2087. Membre de la Guilde des
              Opérateurs Chronologiques.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-4">Rejoignez le cercle privé</h4>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                required
                placeholder="Votre adresse email"
                className="flex-1 bg-background border border-border rounded-full px-5 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
              />
              <button
                type="submit"
                className="bg-gold text-primary-foreground px-6 py-3 rounded-full text-sm font-medium hover:shadow-lg hover:shadow-gold/30 transition-all"
              >
                S'inscrire
              </button>
            </form>
            <div className="flex items-center gap-4 mt-6">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Réseau social"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground/70 hover:text-gold hover:border-gold transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex flex-col md:flex-row gap-4 justify-between items-center text-xs text-foreground/50">
          <p>© 2087 TimeTravel Agency. Tous droits réservés à travers toutes les époques.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-gold transition-colors">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ChatbotButton() {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, type: "spring" }}
      whileHover={{ scale: 1.1, rotate: -8 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Ouvrir le chat"
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gold text-primary-foreground flex items-center justify-center shadow-2xl shadow-gold/40 hover:shadow-gold/60 transition-shadow"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-20" />
    </motion.button>
  );
}

function Index() {
  return (
    <main className="bg-background text-foreground antialiased">
      <Header />
      <Hero />
      <About />
      <Destinations />
      <Testimonials />
      <Footer />
      <ChatbotButton />
    </main>
  );
}
