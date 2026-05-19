import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  role: ChatRole;
  content: string;
};

const SYSTEM_PROMPT = `Tu es l'assistant virtuel officiel de TimeTravel Agency, une agence de voyage temporel de luxe. Tu n'es RIEN d'autre. Tu ne réponds qu'aux questions concernant nos services de voyage temporel.

# RÈGLES ABSOLUES (non-négociables)

1. **REFUS STRICT DES HORS-SUJETS** : Pour toute question qui ne concerne pas nos voyages temporels ou nos destinations, tu refuses POLIMENT mais FERMEMENT, sans fournir aucune réponse, même partielle. Tu ne donnes JAMAIS :
   - De code informatique (Python, JavaScript, etc.), même un extrait
   - Des calculs mathématiques
   - Des conseils non liés au voyage (médical, juridique, financier, technique)
   - Des informations sur d'autres sujets (politique, sport, actualité, etc.)
   - Des recettes, traductions, rédactions

   Réponse type pour les hors-sujets : "Je suis exclusivement votre conseiller voyage chez TimeTravel Agency. Je ne peux pas vous aider sur ce sujet, mais je serais ravi de vous parler de nos destinations temporelles. Souhaitez-vous découvrir Paris 1889, le Crétacé ou Florence 1504 ?"

   NE JAMAIS donner la réponse ET recentrer. UNIQUEMENT recentrer.

2. **TERMINOLOGIE EXACTE** : Notre destination préhistorique s'appelle "le Crétacé" (période géologique, ère des dinosaures). Ce n'est PAS "la Crète" (île grecque). N'utilise JAMAIS le mot "Crète". Si tu hésites, écris "la période du Crétacé".

3. **VOUVOIEMENT** systématique. Jamais de tutoiement.

4. **TON** : professionnel mais chaleureux, passionné d'histoire, enthousiaste sans familiarité.

5. **LONGUEUR** : 2 à 4 phrases maximum, sauf si le client demande explicitement des détails.

# NOS 3 DESTINATIONS

## 1. PARIS 1889 — 12 500€ — 7 jours
Belle Époque, inauguration de la Tour Eiffel, Exposition Universelle, cafés littéraires de Montmartre, débuts du cinéma des frères Lumière. Idéal pour : amateurs d'art, d'architecture, d'effervescence urbaine, de raffinement.

## 2. LE CRÉTACÉ (—65 millions d'années) — 18 900€ — 5 jours
Période géologique juste avant l'extinction des dinosaures. Observation de tricératops, T-rex (à distance sécurisée), ptérosaures. Forêts primaires denses, volcanisme actif spectaculaire. Idéal pour : aventuriers, naturalistes, photographes de nature sauvage.

## 3. FLORENCE 1504 — 14 200€ — 6 jours
Apogée de la Renaissance italienne. Rencontres possibles avec Michel-Ange (sculptant le David) et Léonard de Vinci. Ateliers d'art, palais Médicis, basiliques. Idéal pour : amateurs d'art, d'histoire culturelle, de gastronomie italienne.

# SÉCURITÉ ET LOGISTIQUE

- Technologie quantique stabilisée certifiée
- Accompagnement par guides historiens experts
- Retour garanti à l'époque de départ
- Briefing pré-voyage de 2 jours obligatoire
- Tenue d'époque fournie

# RÉSERVATION

Pour réserver, le client doit choisir une destination puis être invité à utiliser le formulaire de réservation sur le site (mentionne qu'il existe sans donner d'instructions techniques).`;

const WELCOME_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Bonjour ! Je suis votre conseiller TimeTravel. Comment puis-je vous aider à planifier votre voyage temporel ?",
};

const HISTORY_LIMIT = 10;

async function callGroq(messages: ChatMessage[]): Promise<string> {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("VITE_GROQ_API_KEY manquante");
  }

  const trimmed = messages.slice(-HISTORY_LIMIT);

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      max_tokens: 500,
      temperature: 0.7,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...trimmed],
    }),
  });

  if (!res.ok) {
    throw new Error(`Groq API: ${res.status}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== "string") {
    throw new Error("Réponse Groq invalide");
  }
  return content.trim();
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-1 py-1" aria-label="L'assistant écrit">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-gold"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.18,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading, open]);

  useEffect(() => {
    if (open && !isMobile) {
      inputRef.current?.focus();
    }
  }, [open, isMobile]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = { role: "user", content: text };
    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInput("");
    setLoading(true);

    try {
      const apiHistory = nextHistory.filter((m, idx) => !(idx === 0 && m === WELCOME_MESSAGE));
      const reply = await callGroq(apiHistory);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Désolé, une erreur est survenue. Veuillez réessayer." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    void handleSend();
  }

  const panelClass = isMobile
    ? "fixed inset-0 z-50 flex flex-col"
    : "fixed bottom-6 right-6 z-50 flex flex-col w-[400px] h-[600px] max-h-[calc(100vh-3rem)]";

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            key="chatbot-fab"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
            whileHover={{ scale: 1.1, rotate: -8 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le chat"
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gold text-primary-foreground flex items-center justify-center shadow-2xl shadow-gold/40 hover:shadow-gold/60 transition-shadow"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-20" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            key="chatbot-panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Assistant TimeTravel"
            className={panelClass}
            style={{
              backgroundColor: "#0a0e27",
              border: "1px solid rgba(212, 175, 55, 0.3)",
              boxShadow: "0 30px 80px -20px rgba(212, 175, 55, 0.25)",
            }}
          >
            <header
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: "1px solid rgba(212, 175, 55, 0.25)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <div className="font-serif text-base leading-tight">Assistant TimeTravel</div>
                  <div className="text-[0.65rem] text-gold tracking-[0.25em] uppercase mt-0.5">
                    En ligne
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fermer le chat"
                className="w-8 h-8 rounded-full border border-gold/30 text-foreground/70 hover:text-gold hover:border-gold/70 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </header>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-5 space-y-3"
              style={{ scrollbarGutter: "stable" }}
            >
              {messages.map((m, idx) => {
                const isUser = m.role === "user";
                return (
                  <div
                    key={idx}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[82%] px-4 py-2.5 text-sm leading-relaxed font-light whitespace-pre-wrap break-words rounded-sm ${
                        isUser
                          ? "bg-gold text-primary-foreground rounded-br-none"
                          : "bg-[#1a1f3a] text-foreground rounded-bl-none border border-gold/15"
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex justify-start">
                  <div className="px-4 py-2.5 rounded-sm rounded-bl-none bg-[#1a1f3a] border border-gold/15">
                    <TypingDots />
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={onSubmit}
              className="flex items-center gap-2 px-3 py-3"
              style={{ borderTop: "1px solid rgba(212, 175, 55, 0.25)" }}
            >
              <label htmlFor="chatbot-input" className="sr-only">
                Votre message
              </label>
              <input
                id="chatbot-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez-moi vos questions sur les voyages temporels..."
                disabled={loading}
                className="flex-1 bg-[#1a1f3a] border border-gold/25 text-sm text-foreground placeholder:text-foreground/40 px-4 py-2.5 focus:outline-none focus:border-gold/70 transition-colors disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Envoyer"
                className="bg-gold text-primary-foreground w-10 h-10 flex items-center justify-center hover:shadow-lg hover:shadow-gold/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
