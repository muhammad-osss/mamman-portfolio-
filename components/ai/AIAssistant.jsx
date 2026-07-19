"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X } from "lucide-react";
import { profile } from "@/lib/data";

const GREETING = {
  role: "assistant",
  content: `Hi, I'm ${profile.name}'s AI assistant. Ask me about their projects, skills, or services.`,
};

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  async function sendMessage(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessages((m) => [
          ...m,
          { role: "assistant", content: data.error || "Something went wrong." },
        ]);
      } else {
        setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Network error — please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-sky text-void shadow-glow"
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
      >
        {open ? <X size={22} /> : <Bot size={22} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="glass-strong fixed bottom-24 right-6 z-40 flex h-[28rem] w-[22rem] max-w-[90vw] flex-col overflow-hidden rounded-2xl shadow-glow-lg"
            role="dialog"
            aria-label="AI assistant chat"
          >
            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
              <Bot size={18} className="text-sky-light" />
              <p className="font-display text-sm font-semibold text-white">
                Ask about {profile.name}
              </p>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                    m.role === "user"
                      ? "ml-auto bg-sky text-void"
                      : "glass text-ice/90"
                  }`}
                >
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="glass max-w-[60%] rounded-xl px-3 py-2 text-sm text-ice/50">
                  Thinking…
                </div>
              )}
            </div>

            <form onSubmit={sendMessage} className="flex items-center gap-2 border-t border-line p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                className="flex-1 rounded-full bg-panel px-4 py-2 text-sm text-ice placeholder:text-ice/30 focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-sky text-void disabled:opacity-50"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
