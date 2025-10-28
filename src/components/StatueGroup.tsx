import React from 'react';
import { motion } from 'framer-motion';

const IMAGES = {
  odin: '/images/odin-statue.png',
  odysseus: '/images/odysseus-statue.png',
  zeus: '/images/zeus-statue.png'
};

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
      <motion.div
        className="w-60 h-[28rem] relative cursor-pointer group"
        whileHover={{ scale: 1.02, rotateY: 5 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full h-full rounded-lg shadow-2xl overflow-hidden border border-[#E5C970]/20 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10" />

          <div className="relative w-full h-full flex items-center justify-center">
            {(() => {
              const key = imageSrc.toLowerCase();
              const isOdysseus = key.includes('odysseus');
              const isOdin = key.includes('odin');
              // Zeus default (dramatic screen + boost) — keep as-is
              if (isOdysseus) {
                // Odysseus has a white background; use multiply so whites become the dark background
                return (
                  <img
                    src={imageSrc}
                    alt={name}
                    className="h-full w-auto max-w-full object-contain"
                    style={{ mixBlendMode: 'multiply' }}
                  />
                );
              }

              // Odin and Zeus use the stylized screen blend and boost
              return (
                <img
                  src={imageSrc}
                  alt={name}
                  className="h-full w-auto max-w-full object-contain brightness-200 contrast-125"
                  style={{ mixBlendMode: 'screen' }}
                />
              );
            })()}
          </div>

          <div className="absolute inset-0 bg-[#E5C970]/10 blur-3xl rounded-full animate-pulse" />
          <div className="absolute inset-0 bg-blue-900/20 blur-2xl rounded-full animate-pulse delay-75" />
          <div className="absolute -inset-4 bg-blue-500/5 blur-3xl rounded-full animate-pulse delay-150" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-32 bg-gradient-to-b from-[#E5C970]/50 to-transparent blur-sm" />
        </div>

        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-black/90 text-white rounded-lg p-3 text-center shadow-xl border border-[#E5C970]/30">
            <h3 className="font-semibold text-[#E5C970]">{name}</h3>
            <p className="text-sm text-white/80">{description}</p>
          </div>
          <div className="w-3 h-3 bg-black/90 border-r border-b border-[#E5C970]/30 absolute left-1/2 -bottom-1.5 transform -translate-x-1/2 rotate-45" />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function StatueGroup() {
  return (
    <section className="relative z-0 pt-24 pb-32 bg-gradient-to-b from-[#070b16] to-[#04070e]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-semibold tracking-wide text-[#E5C970] mb-3">
            The Odysseus Collective
          </h2>
          <p className="text-white/80">
            Guardians of wisdom, trade, and knowledge.
          </p>
        </div>

        <div className="flex justify-center items-end">
          <Statue
            name="Odin"
            description="X402 - The Divine Keeper of Digital Knowledge"
            transform="translateY(-20px) scale(0.95)"
            imageSrc={IMAGES.odin}
          />
          <Statue
            name="Odysseus"
            description="The Conversational Agent - Your Guide Through Wisdom"
            imageSrc={IMAGES.odysseus}
          />
          <Statue
            name="Zeus"
            description="The Trading Oracle - Master of Markets"
            transform="translateY(-20px) scale(0.95)"
            imageSrc={IMAGES.zeus}
          />
        </div>
      </div>
    </section>
  );
}