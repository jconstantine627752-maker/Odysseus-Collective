import React from 'react';
import { motion } from 'framer-motion';

// Local statue assets (imported so Vite can optimize them)
import odinImg from '../assets/odin-statue.png';
import odysseusImg from '../assets/odysseus-statue.png';
import zeusImg from '../assets/zeus-statue.png';

// Inline base64 images
const IMAGES = {
  odin: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF0WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4yLWMwMDAgNzkuMWI2NWE3OWI0LCAyMDIyLzA2LzEzLTIyOjAxOjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSI1MTIiIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSI1MTIiIGV4aWY6Q29sb3JTcGFjZT0iMSIgeG1wOkNyZWF0ZURhdGU9IjIwMjMtMDgtMjhUMjA6NDQ6MTcrMDI6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTA4LTI4VDIwOjQ0OjE3KzAyOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTA4LTI4VDIwOjQ0OjE3KzAyOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowNjdhY2E1Ny1kODQ4LTRmZjMtOGIxZi03NmQ4NWIzOGE3ZTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDY3YWNhNTctZDg0OC00ZmYzLThiMWYtNzZkODViMzhhN2UyIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MDY3YWNhNTctZDg0OC00ZmYzLThiMWYtNzZkODViMzhhN2UyIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDowNjdhY2E1Ny1kODQ4LTRmZjMtOGIxZi03NmQ4NWIzOGE3ZTIiIHN0RXZ0OndoZW49IjIwMjMtMDgtMjhUMjA6NDQ6MTcrMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNC4wIChNYWNpbnRvc2gpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgAAAOxJREFUeJzty0EOg0AQBMFa4/9/2RwQsmSTlXwop1TkMEPTzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHibMcY+5zyOMY5jzvk351z/Pn/3zHO/73G/1nN+rrXG67lfvtbaLy9Ya+3neY7nWut3f651jzHGd611rrXOc85xzjn2fd9v277v476MMcY5x3nfd4wxfv/zGGOMtdZ5XdcY13Wd27aNbdu2+77H67/e9z2u6xrbtm0AAAAAAAAAAAAAAADwVj8KChAV0qAKXgAAAABJRU5ErkJggg==',
  odysseus: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF0WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4yLWMwMDAgNzkuMWI2NWE3OWI0LCAyMDIyLzA2LzEzLTIyOjAxOjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSI1MTIiIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSI1MTIiIGV4aWY6Q29sb3JTcGFjZT0iMSIgeG1wOkNyZWF0ZURhdGU9IjIwMjMtMDgtMjhUMjA6NDQ6MTcrMDI6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTA4LTI4VDIwOjQ0OjE3KzAyOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTA4LTI4VDIwOjQ0OjE3KzAyOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowNjdhY2E1Ny1kODQ4LTRmZjMtOGIxZi03NmQ4NWIzOGE3ZTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDY3YWNhNTctZDg0OC00ZmYzLThiMWYtNzZkODViMzhhN2UyIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MDY3YWNhNTctZDg0OC00ZmYzLThiMWYtNzZkODViMzhhN2UyIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDowNjdhY2E1Ny1kODQ4LTRmZjMtOGIxZi03NmQ4NWIzOGE3ZTIiIHN0RXZ0OndoZW49IjIwMjMtMDgtMjhUMjA6NDQ6MTcrMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNC4wIChNYWNpbnRvc2gpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgAAAOxJREFUeJzty0EOg0AQBMFa4/9/2RwQsmSTlXwop1TkMEPTzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHibMcY+5zyOMY5jzvk351z/Pn/3zHO/73G/1nN+rrXG67lfvtbaLy9Ya+3neY7nWut3f651jzHGd611rrXOc85xzjn2fd9v277v476MMcY5x3nfd4wxfv/zGGOMtdZ5XdcY13Wd27aNbdu2+77H67/e9z2u6xrbtm0AAAAAAAAAAAAAAADwVj8KChAV0qAKXgAAAABJRU5ErkJggg==',
  zeus: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF0WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4yLWMwMDAgNzkuMWI2NWE3OWI0LCAyMDIyLzA2LzEzLTIyOjAxOjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSI1MTIiIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSI1MTIiIGV4aWY6Q29sb3JTcGFjZT0iMSIgeG1wOkNyZWF0ZURhdGU9IjIwMjMtMDgtMjhUMjA6NDQ6MTcrMDI6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTA4LTI4VDIwOjQ0OjE3KzAyOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTA4LTI4VDIwOjQ0OjE3KzAyOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowNjdhY2E1Ny1kODQ4LTRmZjMtOGIxZi03NmQ4NWIzOGE3ZTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDY3YWNhNTctZDg0OC00ZmYzLThiMWYtNzZkODViMzhhN2UyIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MDY3YWNhNTctZDg0OC00ZmYzLThiMWYtNzZkODViMzhhN2UyIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDowNjdhY2E1Ny1kODQ4LTRmZjMtOGIxZi03NmQ4NWIzOGE3ZTIiIHN0RXZ0OndoZW49IjIwMjMtMDgtMjhUMjA6NDQ6MTcrMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNC4wIChNYWNpbnRvc2gpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgAAAOxJREFUeJzty0EOg0AQBMFa4/9/2RwQsmSTlXwop1TkMEPTzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHibMcY+5zyOMY5jzvk351z/Pn/3zHO/73G/1nN+rrXG67lfvtbaLy9Ya+3neY7nWut3f651jzHGd611rrXOc85xzjn2fd9v277v476MMcY5x3nfd4wxfv/zGGOMtdZ5XdcY13Wd27aNbdu2+77H67/e9z2u6xrbtm0AAAAAAAAAAAAAAADwVj8KChAV0qAKXgAAAABJRU5ErkJggg=='
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
            imageSrc={odinImg}
          />
          <Statue
            name="Odysseus"
            description="The Conversational Agent - Your Guide Through Wisdom"
            imageSrc={odysseusImg}
          />
          <Statue
            name="Zeus"
            description="The Trading Oracle - Master of Markets"
            transform="translateY(-20px) scale(0.95)"
            imageSrc={zeusImg}
          />
        </div>
      </div>
    </section>
  );
}