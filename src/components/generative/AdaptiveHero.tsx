import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { AdaptiveHeroProps } from '@/lib/schemas';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';

export function AdaptiveHero({ headline, subtext, vibe }: AdaptiveHeroProps) {
  const { profile, socials } = PORTFOLIO_DATA;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'relative overflow-hidden rounded-2xl p-8 md:p-12',
        vibe === 'corporate' && 'glass',
        vibe === 'startup' && 'bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-pink-900/20 border border-purple-500/20'
      )}
    >
      {/* Background decoration */}
      {vibe === 'startup' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
        </div>
      )}

      <div className="relative z-10">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className={cn(
            'font-bold leading-tight mb-4',
            vibe === 'corporate' && 'text-4xl md:text-5xl text-white',
            vibe === 'startup' && 'text-5xl md:text-6xl lg:text-7xl gradient-text'
          )}
        >
          {headline || profile.name}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className={cn(
            'mb-6 max-w-2xl',
            vibe === 'corporate' && 'text-lg text-gray-300',
            vibe === 'startup' && 'text-xl md:text-2xl text-gray-200 font-light'
          )}
        >
          {subtext || profile.tagline}
        </motion.p>

        {/* Meta info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap gap-4 mb-8"
        >
          <span className="flex items-center gap-2 text-sm text-gray-400">
            <MapPin size={16} className="text-indigo-400" />
            {profile.location}
          </span>
          <span className="flex items-center gap-2 text-sm text-emerald-400">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            {profile.availability}
          </span>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex gap-4"
        >
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'p-3 rounded-lg transition-all hover:scale-105',
              vibe === 'corporate' && 'bg-gray-800 hover:bg-gray-700 text-gray-300',
              vibe === 'startup' && 'bg-white/10 hover:bg-white/20 text-white'
            )}
          >
            <Github size={20} />
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'p-3 rounded-lg transition-all hover:scale-105',
              vibe === 'corporate' && 'bg-gray-800 hover:bg-gray-700 text-gray-300',
              vibe === 'startup' && 'bg-white/10 hover:bg-white/20 text-white'
            )}
          >
            <Linkedin size={20} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className={cn(
              'p-3 rounded-lg transition-all hover:scale-105',
              vibe === 'corporate' && 'bg-gray-800 hover:bg-gray-700 text-gray-300',
              vibe === 'startup' && 'bg-white/10 hover:bg-white/20 text-white'
            )}
          >
            <Mail size={20} />
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default AdaptiveHero;
