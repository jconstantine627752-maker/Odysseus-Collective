import React from 'react';
import { motion } from 'framer-motion';

interface StatueProps {
  name: string;
  description: string;
  transform?: string;
  imageSrc: string;
}

function Statue({ name, description, transform = 'none', imageSrc }: StatueProps) {
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
        {/* Statue image container */}
        <div className="w-full h-full rounded-lg shadow-2xl overflow-hidden border border-[#E5C970]/20 relative">
          {/* Background gradients and effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10" />

          {/* Statue image */}
          <div className="relative w-full h-full flex items-center justify-center">
            <picture>
              <source srcSet={imageSrc.replace('.png', '.webp')} type="image/webp" />
              <source srcSet={imageSrc} type="image/png" />
              <img
                src={imageSrc}
                alt={name}
                className="h-full w-auto max-w-full object-contain"
                style={{
                  filter: 'brightness(2) contrast(1.2)',
                  mixBlendMode: 'screen'
                }}
                onError={(e) => {
                  const img = e.currentTarget;
                  img.onerror = null; // Prevent infinite loop
                  img.style.opacity = '0.7';
                  img.style.background = 'linear-gradient(to bottom, rgba(229, 201, 112, 0.2), transparent)';
                }}
              />
            </picture>
          </div>

          {/* Dramatic lighting effects */}
          <div className="absolute inset-0 bg-[#E5C970]/10 blur-3xl rounded-full animate-pulse" />
          <div className="absolute inset-0 bg-blue-900/20 blur-2xl rounded-full animate-pulse delay-75" />
          <div className="absolute -inset-4 bg-blue-500/5 blur-3xl rounded-full animate-pulse delay-150" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-32 bg-gradient-to-b from-[#E5C970]/50 to-transparent blur-sm" />
        </div>

        {/* Info popup on hover */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-black/90 text-white rounded-lg p-3 text-center shadow-xl border border-[#E5C970]/30">
            <h3 className="font-semibold text-[#E5C970]">{name}</h3>
            <p className="text-sm text-white/80">{description}</p>
          </div>
          <div className="w-3 h-3 bg-black/90 border-r border-b border-[#E5C970]/30 absolute left-1/2 -bottom-1.5 transform -translate-x-1/2 rotate-45"></div>
        </div>
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
            description="X402 - The Divine Keeper of Digital Knowledge"
            transform="translateY(-20px) scale(0.95)"
            imageSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQwIiBoZWlnaHQ9IjQ0OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEyMCA4MGMtMTYgMC0zMCAxNC0zMCAzMHYyMjhjMCAxNiAxNCAzMCAzMCAzMHMzMC0xNCAzMC0zMFYxMTBjMC0xNi0xNC0zMC0zMC0zMHoiIGZpbGw9IiNmZmYiLz48L3N2Zz4="
          />
          <Statue
            name="Odysseus"
            description="The Conversational Agent - Your Guide Through Wisdom"
            imageSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQwIiBoZWlnaHQ9IjQ0OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEyMCA4MGMtMTYgMC0zMCAxNC0zMCAzMHYyMjhjMCAxNiAxNCAzMCAzMCAzMHMzMC0xNCAzMC0zMFYxMTBjMC0xNi0xNC0zMC0zMC0zMHoiIGZpbGw9IiNmZmYiLz48L3N2Zz4="
          />
          <Statue
            name="Zeus"
            description="The Trading Oracle - Master of Markets"
            transform="translateY(-20px) scale(0.95)"
            imageSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQwIiBoZWlnaHQ9IjQ0OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEyMCA4MGMtMTYgMC0zMCAxNC0zMCAzMHYyMjhjMCAxNiAxNCAzMCAzMCAzMHMzMC0xNCAzMC0zMFYxMTBjMC0xNi0xNC0zMC0zMC0zMHoiIGZpbGw9IiNmZmYiLz48L3N2Zz4="
          />
        </div>
      </div>
    </section>
  );
}