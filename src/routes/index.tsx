import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  Shield,
  Compass,
  Sparkles,
  Calendar,
  Instagram,
  Twitter,
  Facebook,
  ArrowRight,
  Quote,
} from "lucide-react";
import parisImg from "@/assets/paris-1889.jpg";
import cretaceImg from "@/assets/cretace.jpg";
import florenceImg from "@/assets/florence-1504.jpg";
import { Chatbot } from "@/components/Chatbot";
import { Quiz } from "@/components/Quiz";

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
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

function Stars() {
  const stars = useMemo(
    () =>
      Array.from({ length: 90 }).map((_, i) => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 6,
        duration: Math.random() * 4 + 3,
        gold: i % 11 === 0,
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s, i) => (
        <span
          key={i}
          className={`star ${s.gold ? "star-gold" : ""}`}
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center justify-center gap-4 py-2" aria-hidden="true">
      <span className="h-px w-24 md:w-40 bg-gradient-to-r from-transparent to-gold/60" />
      <Sparkles className="w-3.5 h-3.5 text-gold" />
      <span className="h-px w-24 md:w-40 bg-gradient-to-l from-transparent to-gold/60" />
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
          className="hidden md:inline-flex items-center gap-2 border border-gold/50 text-gold px-5 py-2 text-xs tracking-[0.2em] uppercase hover:bg-gold hover:text-primary-foreground transition-all duration-300"
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
    <section
      id="top"
      className="relative min-h-dvh flex items-center justify-center hero-vignette overflow-hidden"
    >
      <Stars />
      <motion.div
        style={{ y }}
        className="relative z-10 mx-auto max-w-6xl px-6 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-block text-gold text-[0.7rem] tracking-[0.5em] uppercase mb-10"
        >
          — Depuis 2087 —
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] tracking-[-0.035em] text-foreground"
        >
          Explorez l'histoire,
          <br />
          <span className="italic font-medium text-gold">réinventée</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-10 text-base md:text-xl text-foreground/70 max-w-2xl mx-auto font-light"
        >
          L'agence de voyage temporel de luxe — voyagez dans le temps en toute sécurité.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-14 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#destinations"
            className="group inline-flex items-center gap-3 bg-gold text-primary-foreground px-9 py-4 text-xs font-medium tracking-[0.2em] uppercase hover:shadow-2xl hover:shadow-gold/30 transition-all duration-500 hover:-translate-y-0.5"
          >
            Découvrir les destinations
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 border border-gold/60 text-gold px-9 py-4 text-xs font-medium tracking-[0.2em] uppercase hover:bg-gold hover:text-primary-foreground transition-all duration-500"
          >
            Réserver maintenant
          </a>
        </motion.div>
      </motion.div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-foreground/40 text-[0.65rem] tracking-[0.4em] uppercase">
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
          <span className="text-gold text-[0.7rem] tracking-[0.5em] uppercase">L'agence</span>
          <h2 className="mt-4 font-serif text-4xl md:text-6xl leading-[1.05] tracking-[-0.02em]">
            Un luxe hors du <span className="italic text-gold">temps</span>.
          </h2>
          <p className="mt-6 text-foreground/70 text-lg font-light">
            Nous façonnons depuis trois décennies des voyages qui défient la chronologie.
            Discrétion, raffinement et précision absolue.
          </p>
        </motion.div>

        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-sm border border-gold/20 bg-card p-8 hover:border-gold/60 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-sm border border-gold/40 flex items-center justify-center mb-6 group-hover:bg-gold transition-all duration-500">
                <v.icon className="w-5 h-5 text-gold group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-serif text-xl mb-3 leading-snug">{v.title}</h3>
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
    yearLabel: "1889",
    title: "Paris, Belle Époque",
    desc: "Vivez l'inauguration de la Tour Eiffel et l'effervescence de l'Exposition Universelle.",
    price: "12 500 €",
    image: parisImg,
    alt: "Paris en 1889, vue de la Tour Eiffel et de l'Exposition Universelle",
  },
  {
    era: "Crétacé",
    yearLabel: "-65 000 000",
    title: "Crétacé supérieur",
    desc: "Côtoyez les dinosaures dans une nature préhistorique vierge, sous escorte armée.",
    price: "18 900 €",
    image: cretaceImg,
    alt: "Paysage du Crétacé avec dinosaures dans une forêt préhistorique",
  },
  {
    era: "1504",
    yearLabel: "1504",
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
            <span className="text-gold text-[0.7rem] tracking-[0.5em] uppercase">Catalogue</span>
            <h2 className="mt-4 font-serif text-4xl md:text-6xl leading-[1.05] tracking-[-0.02em]">
              Destinations <span className="italic text-gold">d'exception</span>
            </h2>
          </div>
          <p className="text-foreground/65 max-w-md font-light">
            Une sélection confidentielle d'époques accessibles uniquement à nos clients privilégiés.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {destinations.map((d, i) => (
            <motion.article
              key={d.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="group relative rounded-sm overflow-hidden bg-card border border-gold/30 hover:border-gold/70 hover:gold-shadow transition-all duration-500"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={d.image}
                  alt={d.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-110"
                />
                {/* Bottom dark gradient for title readability */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-card via-card/80 to-transparent" />
                {/* Year badge top-left */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-background/80 backdrop-blur-sm border border-gold/50 text-gold px-3 py-1.5 text-[0.65rem] tracking-[0.2em] font-medium">
                  <Calendar className="w-3 h-3" />
                  {d.yearLabel}
                </div>
                {/* Title overlay on image */}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="text-gold text-[0.65rem] tracking-[0.4em] uppercase mb-2">
                    {d.era}
                  </div>
                  <h3 className="font-serif text-3xl leading-tight tracking-tight">{d.title}</h3>
                </div>
              </div>
              <div className="p-7">
                <p className="text-foreground/70 text-sm font-light leading-relaxed line-clamp-2">
                  {d.desc}
                </p>
                <div className="mt-6 pt-6 border-t border-gold/20 flex items-end justify-between gap-3">
                  <div>
                    <div className="text-[0.65rem] text-foreground/50 uppercase tracking-[0.25em]">
                      À partir de
                    </div>
                    <div className="text-gold font-serif text-2xl mt-1">{d.price}</div>
                  </div>
                  <button className="inline-flex items-center gap-2 bg-gold text-primary-foreground px-5 py-2.5 text-[0.7rem] font-medium tracking-[0.2em] uppercase hover:shadow-lg hover:shadow-gold/30 transition-all">
                    Réserver
                    <ArrowRight className="w-3.5 h-3.5" />
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
          <span className="text-gold text-[0.7rem] tracking-[0.5em] uppercase">Témoignages</span>
          <h2 className="mt-4 font-serif text-4xl md:text-6xl leading-[1.05] tracking-[-0.02em]">
            Ils ont franchi le <span className="italic text-gold">seuil</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-sm border border-gold/20 bg-card p-8"
            >
              <Quote className="w-8 h-8 text-gold/60 mb-4" />
              <blockquote className="text-foreground/85 font-light text-base leading-relaxed italic">
                « {t.quote} »
              </blockquote>
              <figcaption className="mt-6 pt-6 border-t border-gold/20">
                <div className="font-serif text-lg">{t.name}</div>
                <div className="text-[0.65rem] text-gold tracking-[0.3em] uppercase mt-1">
                  {t.role}
                </div>
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
    <footer
      id="contact"
      className="relative border-t border-gold/20 bg-secondary/40 pt-20 pb-10 px-6"
    >
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
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
              <label htmlFor="newsletter-email" className="sr-only">
                Adresse email
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Votre adresse email"
                className="flex-1 bg-background border border-gold/30 px-5 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
              />
              <button
                type="submit"
                className="bg-gold text-primary-foreground px-6 py-3 text-xs font-medium tracking-[0.2em] uppercase hover:shadow-lg hover:shadow-gold/30 transition-all"
              >
                S'inscrire
              </button>
            </form>
            <div className="flex items-center gap-3 mt-6">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Facebook, label: "Facebook" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 border border-gold/30 flex items-center justify-center text-foreground/70 hover:text-gold hover:border-gold transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gold/15 pt-8 flex flex-col md:flex-row gap-4 justify-between items-center text-xs text-foreground/50">
          <p>© 2087 TimeTravel Agency. Tous droits réservés à travers toutes les époques.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold transition-colors">
              Mentions légales
            </a>
            <a href="#" className="hover:text-gold transition-colors">
              Confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="bg-background text-foreground antialiased">
      <Header />
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Destinations />
      <Divider />
      <Quiz />
      <Divider />
      <Testimonials />
      <Footer />
      <Chatbot />
    </main>
  );
}
