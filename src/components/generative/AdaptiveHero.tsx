import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { AdaptiveHeroProps } from '@/lib/schemas';
import type { Persona } from '@/lib/schemas';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import { Github, Linkedin, Mail, MapPin, ExternalLink } from 'lucide-react';

interface AdaptiveHeroComponentProps extends AdaptiveHeroProps {
  persona?: Persona;
}

export function AdaptiveHero({ headline, subtext, vibe, persona = 'unknown' }: AdaptiveHeroComponentProps) {
  const { profile, socials } = PORTFOLIO_DATA;

  // Persona-specific accent colors
  const accentColors = {
    recruiter: {
      primary: 'from-blue-500 to-purple-600',
      text: 'text-gradient-blue',
      glow: 'shadow-blue-500/20',
      badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    },
    founder: {
      primary: 'from-rose-500 to-orange-500',
      text: 'text-gradient-orange',
      glow: 'shadow-rose-500/20',
      badge: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    },
    cto: {
      primary: 'from-emerald-500 to-cyan-500',
      text: 'text-gradient-green',
      glow: 'shadow-emerald-500/20',
      badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    },
    unknown: {
      primary: 'from-slate-500 to-slate-600',
      text: 'text-white',
      glow: 'shadow-slate-500/20',
      badge: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    },
  };

  const colors = accentColors[persona];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'relative overflow-hidden rounded-3xl p-8 md:p-16 border transition-all duration-500',
        vibe === 'corporate' && 'glass-card border-slate-700/50',
        vibe === 'startup' && cn(
          'glass-card border-rose-500/20',
          'bg-gradient-to-br from-rose-950/30 via-orange-950/20 to-slate-950/30'
        )
      )}
    >
      {/* Decorative gradient orb */}
      <div className={cn(
        "absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-30 transition-colors duration-1000",
        `bg-gradient-to-br ${colors.primary}`
      )} />

      <div className="relative z-10">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className={cn(
            'inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6 border',
            colors.badge
          )}
        >
          <span className={cn(
            "w-2 h-2 rounded-full animate-pulse",
            persona === 'recruiter' && "bg-blue-400",
            persona === 'founder' && "bg-rose-400",
            persona === 'cto' && "bg-emerald-400",
            persona === 'unknown' && "bg-slate-400"
          )} />
          {profile.availability}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className={cn(
            'font-bold leading-tight mb-4 tracking-tight',
            vibe === 'corporate' && 'text-4xl md:text-6xl text-white',
            vibe === 'startup' && cn('text-5xl md:text-7xl', colors.text)
          )}
        >
          {headline || profile.name}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className={cn(
            'mb-8 max-w-2xl leading-relaxed',
            vibe === 'corporate' && 'text-lg text-slate-300',
            vibe === 'startup' && 'text-xl md:text-2xl text-slate-200 font-light'
          )}
        >
          {subtext || profile.tagline}
        </motion.p>

        {/* Meta info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="flex flex-wrap gap-6 mb-8"
        >
          <span className="flex items-center gap-2 text-sm text-slate-400">
            <MapPin size={16} className={cn(
              persona === 'recruiter' && "text-blue-400",
              persona === 'founder' && "text-rose-400",
              persona === 'cto' && "text-emerald-400",
              persona === 'unknown' && "text-indigo-400"
            )} />
            {profile.location}
          </span>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="flex gap-3"
        >
          {[
            { href: socials.github, icon: <Github size={20} />, label: 'GitHub', id: 'github' },
            { href: socials.linkedin, icon: <Linkedin size={20} />, label: 'LinkedIn', id: 'linkedin' },
            { href: `mailto:${profile.email}`, icon: <Mail size={20} />, label: 'Email', id: 'email' },
            { href: socials.website, icon: <ExternalLink size={20} />, label: 'Website', id: 'website' },
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${social.label}`}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'p-3 rounded-xl transition-all duration-300 border',
                'bg-slate-800/50 border-slate-700/50 text-slate-400',
                'hover:border-slate-600 hover:text-white hover:bg-slate-700/50'
              )}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default AdaptiveHero;
