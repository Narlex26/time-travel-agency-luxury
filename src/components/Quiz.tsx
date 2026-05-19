import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2, RotateCcw, Sparkles } from "lucide-react";
import parisImg from "@/assets/paris-1889.jpg";
import cretaceImg from "@/assets/cretace.jpg";
import florenceImg from "@/assets/florence-1504.jpg";

type DestinationKey = "paris" | "cretace" | "florence";

type Choice = { label: string; destination: DestinationKey };
type Question = { prompt: string; choices: Choice[] };

const QUESTIONS: Question[] = [
  {
    prompt: "Quel type d'expérience recherchez-vous ?",
    choices: [
      { label: "Culturelle et artistique", destination: "florence" },
      { label: "Aventure et nature", destination: "cretace" },
      { label: "Élégance et raffinement", destination: "paris" },
    ],
  },
  {
    prompt: "Votre période préférée ?",
    choices: [
      { label: "Histoire moderne (XIXe–XXe siècle)", destination: "paris" },
      { label: "Temps anciens et origines", destination: "cretace" },
      { label: "Renaissance et classicisme", destination: "florence" },
    ],
  },
  {
    prompt: "Vous préférez :",
    choices: [
      { label: "L'effervescence urbaine", destination: "paris" },
      { label: "La nature sauvage", destination: "cretace" },
      { label: "L'art et l'architecture", destination: "florence" },
    ],
  },
  {
    prompt: "Votre activité idéale ?",
    choices: [
      { label: "Visiter des monuments", destination: "paris" },
      { label: "Observer la faune", destination: "cretace" },
      { label: "Explorer des musées", destination: "florence" },
    ],
  },
];

const DESTINATIONS: Record<
  DestinationKey,
  { name: string; era: string; price: string; image: string; alt: string; fallback: string }
> = {
  paris: {
    name: "Paris 1889",
    era: "1889 — Belle Époque",
    price: "12 500 €",
    image: parisImg,
    alt: "Paris 1889",
    fallback:
      "Vos réponses révèlent un goût marqué pour le raffinement urbain et l'effervescence culturelle. Paris 1889 vous offrira l'inauguration de la Tour Eiffel, les cafés littéraires de Montmartre et la magie de l'Exposition Universelle.",
  },
  cretace: {
    name: "Le Crétacé",
    era: "-65 millions d'années",
    price: "18 900 €",
    image: cretaceImg,
    alt: "Période du Crétacé",
    fallback:
      "Votre appétit pour l'aventure et la nature brute s'accorde parfaitement avec la période du Crétacé. Vous y observerez tricératops, T-rex et ptérosaures dans leurs forêts primaires, sous escorte historienne experte.",
  },
  florence: {
    name: "Florence 1504",
    era: "1504 — Renaissance",
    price: "14 200 €",
    image: florenceImg,
    alt: "Florence 1504",
    fallback:
      "Votre sensibilité artistique et culturelle trouvera son écho à Florence 1504, au cœur de la Renaissance italienne — ateliers de Michel-Ange et Léonard de Vinci, palais Médicis, art et gastronomie inoubliables.",
  },
};

function recommend(answers: DestinationKey[]): DestinationKey {
  const counts: Record<DestinationKey, number> = { paris: 0, cretace: 0, florence: 0 };
  for (const a of answers) counts[a]++;
  const max = Math.max(counts.paris, counts.cretace, counts.florence);
  const candidates = (Object.keys(counts) as DestinationKey[]).filter((k) => counts[k] === max);
  if (candidates.length === 1) return candidates[0];
  for (let i = answers.length - 1; i >= 0; i--) {
    if (candidates.includes(answers[i])) return answers[i];
  }
  return candidates[0];
}

async function generateRationale(
  destination: DestinationKey,
  picks: { question: string; answer: string }[],
): Promise<string> {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) throw new Error("VITE_GROQ_API_KEY manquante");

  const dest = DESTINATIONS[destination];
  const userPrompt = `Le client vient de compléter notre quiz de préférences et la destination recommandée est ${dest.name}.

Ses réponses :
${picks.map((p) => `- ${p.question} → ${p.answer}`).join("\n")}

Rédige en français une recommandation personnalisée et chaleureuse de 2 à 3 phrases qui explique pourquoi ${dest.name} est parfaite pour lui, en citant 1 ou 2 éléments précis de la destination qui font écho à ses choix. Vouvoiement systématique. Ton enthousiaste mais professionnel. Pas de salutation, va directement à l'explication. N'utilise jamais le mot "Crète" : notre destination préhistorique s'appelle "le Crétacé".`;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      max_tokens: 300,
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content:
            "Tu es le conseiller expert de TimeTravel Agency, agence de voyage temporel de luxe. Vouvoiement systématique. Pas de salutation ni de formule d'ouverture : l'explication directement, en 2-3 phrases.",
        },
        { role: "user", content: userPrompt },
      ],
    }),
  });

  if (!res.ok) throw new Error(`Groq API: ${res.status}`);
  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== "string") throw new Error("Réponse Groq invalide");
  return content.trim();
}

export function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<DestinationKey[]>([]);
  const [phase, setPhase] = useState<"questions" | "loading" | "result">("questions");
  const [rationale, setRationale] = useState("");
  const [destination, setDestination] = useState<DestinationKey | null>(null);

  async function handleChoice(choice: Choice) {
    const next = [...answers, choice.destination];
    if (next.length < QUESTIONS.length) {
      setAnswers(next);
      setStep(step + 1);
      return;
    }
    setAnswers(next);
    setPhase("loading");
    const dest = recommend(next);
    setDestination(dest);
    try {
      const picks = QUESTIONS.map((q, i) => ({
        question: q.prompt,
        answer: q.choices.find((c) => c.destination === next[i])!.label,
      }));
      const text = await generateRationale(dest, picks);
      setRationale(text);
    } catch {
      setRationale(DESTINATIONS[dest].fallback);
    }
    setPhase("result");
  }

  function reset() {
    setStep(0);
    setAnswers([]);
    setRationale("");
    setDestination(null);
    setPhase("questions");
  }

  const currentQuestion = QUESTIONS[step];

  return (
    <section id="quiz" className="relative py-32 px-6">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <span className="text-gold text-[0.7rem] tracking-[0.5em] uppercase">
            Recommandation IA
          </span>
          <h2 className="mt-4 font-serif text-4xl md:text-6xl leading-[1.05] tracking-[-0.02em]">
            Quelle époque vous <span className="italic text-gold">appelle</span> ?
          </h2>
          <p className="mt-6 text-foreground/65 font-light max-w-xl mx-auto">
            Quatre questions pour révéler la destination temporelle qui résonne avec votre
            sensibilité.
          </p>
        </motion.div>

        <div className="relative rounded-sm border border-gold/25 bg-card p-8 md:p-12 min-h-[460px] flex items-center">
          <AnimatePresence mode="wait">
            {phase === "questions" && (
              <motion.div
                key={`q-${step}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <div className="flex items-center gap-2 mb-8">
                  {QUESTIONS.map((_, i) => (
                    <span
                      key={i}
                      className={`h-px flex-1 transition-colors duration-500 ${
                        i <= step ? "bg-gold" : "bg-gold/15"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-[0.65rem] text-gold tracking-[0.4em] uppercase mb-4">
                  Question {step + 1} / {QUESTIONS.length}
                </div>
                <h3 className="font-serif text-2xl md:text-3xl leading-tight mb-10">
                  {currentQuestion.prompt}
                </h3>
                <div className="grid gap-3">
                  {currentQuestion.choices.map((choice) => (
                    <button
                      key={choice.label}
                      onClick={() => handleChoice(choice)}
                      className="group w-full text-left border border-gold/20 hover:border-gold/70 bg-background/40 hover:bg-background/70 px-6 py-4 transition-all duration-300 flex items-center justify-between gap-4"
                    >
                      <span className="text-foreground/85 font-light">{choice.label}</span>
                      <ArrowRight className="w-4 h-4 text-gold/40 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {phase === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full text-center"
              >
                <Loader2 className="w-10 h-10 text-gold animate-spin mx-auto mb-6" />
                <div className="text-foreground/75 font-light">
                  Analyse de vos préférences en cours…
                </div>
                <div className="text-[0.65rem] text-gold tracking-[0.4em] uppercase mt-3">
                  Calibrage temporel
                </div>
              </motion.div>
            )}

            {phase === "result" && destination && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full grid md:grid-cols-[1fr_1.2fr] gap-8 items-center"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-gold/40">
                  <img
                    src={DESTINATIONS[destination].image}
                    alt={DESTINATIONS[destination].alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-card to-transparent" />
                  <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm border border-gold/50 text-gold px-3 py-1 text-[0.6rem] tracking-[0.25em]">
                    {DESTINATIONS[destination].era}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-gold" />
                    <span className="text-[0.65rem] text-gold tracking-[0.4em] uppercase">
                      Votre destination
                    </span>
                  </div>
                  <h3 className="font-serif text-3xl md:text-4xl tracking-tight mb-5">
                    {DESTINATIONS[destination].name}
                  </h3>
                  <p className="text-foreground/85 leading-relaxed font-light">{rationale}</p>
                  <div className="mt-6 pt-6 border-t border-gold/20 flex flex-wrap items-center gap-4">
                    <div>
                      <div className="text-[0.6rem] text-foreground/50 uppercase tracking-[0.25em]">
                        À partir de
                      </div>
                      <div className="text-gold font-serif text-2xl mt-1">
                        {DESTINATIONS[destination].price}
                      </div>
                    </div>
                    <a
                      href="#destinations"
                      className="ml-auto inline-flex items-center gap-2 bg-gold text-primary-foreground px-5 py-2.5 text-[0.7rem] font-medium tracking-[0.2em] uppercase hover:shadow-lg hover:shadow-gold/30 transition-all"
                    >
                      Réserver
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={reset}
                      className="inline-flex items-center gap-2 border border-gold/40 text-gold px-5 py-2.5 text-[0.7rem] font-medium tracking-[0.2em] uppercase hover:bg-gold/10 transition-all"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Refaire
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
