"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, Brain, Terminal } from "lucide-react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [text, setText] = useState("");
  const fullText = "This neural interface is restricted. Please authenticate to continue.";

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center font-mono">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-12 glassPanel max-w-md w-full border-t-2 border-t-[#00f2ff]/50"
      >
        <div className="w-20 h-20 bg-[#00f2ff]/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-[#00f2ff]/30 shadow-[0_0_20px_rgba(0,242,255,0.2)]">
          <Terminal size={40} className="text-[#00f2ff]" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4 tracking-tighter uppercase glitch-text glitch-active">
          Access Locked
        </h1>
        
        <div className="h-12 mb-10">
          <p className="text-[#00f2ff]/70 text-sm leading-relaxed">
            {text}
            <span className="animate-pulse ml-1">_</span>
          </p>
        </div>

        <button 
          onClick={() => signIn("google")}
          className="w-full flex items-center justify-center gap-3 py-4 neon-button rounded-lg font-bold uppercase tracking-widest transition-all active:scale-95"
        >
          <img src="https://www.google.com/favicon.ico" className="w-5 h-5 grayscale group-hover:grayscale-0" alt="Google" />
          Authenticate Session
        </button>
        
        <p className="mt-8 text-[10px] text-white/20 uppercase tracking-[0.3em] font-bold">
          [ Authorized Personnel Only ]
        </p>
      </motion.div>
    </div>
  );
}
