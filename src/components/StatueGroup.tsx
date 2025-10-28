import React from 'react';
import { motion } from 'framer-motion';

interface StatueProps {
  name: string;
  description: string;
  transform?: string;
}

function Statue({ name, description, transform = 'none' }: StatueProps) {
  return (
    <motion.div
      className="relative mx-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{ transform }}
    >
      {/* Statue container */}
      <motion.div
        className="w-60 h-[28rem] relative cursor-pointer group"
        whileHover={{ scale: 1.02, rotateY: 5 }}
        transition={{ duration: 0.5 }}
      >
        {/* Statue body */}
        <div className="w-full h-full bg-gradient-to-b from-gray-800 to-black rounded-lg shadow-2xl overflow-hidden border border-[#E5C970]/20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JhaW4iIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDIpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWluKSIvPjwvc3ZnPg==')] opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

          {/* Head */}
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gray-800 rounded-full shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#E5C970]/10" />
          </div>

          {/* Body */}
          <div className="absolute top-36 left-1/2 transform -translate-x-1/2 w-40 h-72 bg-gray-800">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-700 to-gray-900" />
          </div>
        </div>

        {/* Info popup on hover */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-black/90 text-white rounded-lg p-3 text-center shadow-xl border border-[#E5C970]/30">
            <h3 className="font-semibold text-[#E5C970]">{name}</h3>
            <p className="text-sm text-white/80">{description}</p>
          </div>
          <div className="w-3 h-3 bg-black/90 border-r border-b border-[#E5C970]/30 absolute left-1/2 -bottom-1.5 transform -translate-x-1/2 rotate-45"></div>
        </div>

        {/* Dramatic lighting effects */}
        <div className="absolute inset-0 bg-[#E5C970]/10 blur-3xl rounded-full animate-pulse" />
        <div className="absolute inset-0 bg-blue-900/20 blur-2xl rounded-full animate-pulse delay-75" />
        <div className="absolute -inset-4 bg-blue-500/5 blur-3xl rounded-full animate-pulse delay-150" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-32 bg-gradient-to-b from-[#E5C970]/50 to-transparent blur-sm" />
      </motion.div>
    </motion.div>
  );
}

export default function StatueGroup() {
  return (
    <section className="relative z-0 pt-24 pb-32 bg-gradient-to-b from-[#070b16] to-[#04070e]">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-semibold tracking-wide text-[#E5C970] mb-3">
            The Odysseus Collective
          </h2>
          <p className="text-white/80">
            Guardians of wisdom, trade, and knowledge.
          </p>
        </div>

        {/* Statues */}
        <div className="flex justify-center items-end">
          <Statue
            name="Odin"
            description="The 402 Bot - Guardian of Knowledge"
            transform="translateY(-20px) scale(0.95)"
          />
          <Statue
            name="Odysseus"
            description="The Conversational Agent - Your Guide Through Wisdom"
          />
          <Statue
            name="Zeus"
            description="The Trading Oracle - Master of Markets"
            transform="translateY(-20px) scale(0.95)"
          />
        </div>
      </div>
    </section>
  );
}