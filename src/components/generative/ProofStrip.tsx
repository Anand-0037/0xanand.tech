import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ProofStripProps, Persona } from '@/lib/schemas';
import { Award, Star, Clock, Users } from 'lucide-react';

interface ProofStripComponentProps extends ProofStripProps {
  persona?: Persona;
}

const metricIcons = [
  { icon: <Clock size={18} />, label: 'Years Experience' },
  { icon: <Award size={18} />, label: 'Hackathon Wins' },
  { icon: <Star size={18} />, label: 'Response Time' },
  { icon: <Users size={18} />, label: 'Achievement' },
];

export function ProofStrip({ metrics, style, persona = 'unknown' }: ProofStripComponentProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  // Persona-specific colors
  const colors = {
    recruiter: {
      icon: 'text-blue-400',
      value: 'from-blue-400 to-purple-400',
      bg: 'from-blue-500/10 to-purple-500/5',
    },
    founder: {
      icon: 'text-rose-400',
      value: 'from-rose-400 to-orange-400',
      bg: 'from-rose-500/10 to-orange-500/5',
    },
    cto: {
      icon: 'text-emerald-400',
      value: 'from-emerald-400 to-cyan-400',
      bg: 'from-emerald-500/10 to-cyan-500/5',
    },
    unknown: {
      icon: 'text-indigo-400',
      value: 'from-indigo-400 to-purple-400',
      bg: 'from-indigo-500/10 to-purple-500/5',
    },
  };

  const color = colors[persona];

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        'rounded-2xl overflow-hidden',
        style === 'prominent' && cn('glass-card p-6 bg-gradient-to-r', color.bg),
        style === 'minimal' && 'glass p-4'
      )}
    >
      <div className={cn(
        'grid gap-4',
        style === 'prominent' ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-4'
      )}>
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -2 }}
            className={cn(
              'text-center',
              style === 'prominent' && 'p-4 rounded-xl bg-slate-900/40 border border-slate-700/30'
            )}
          >
            {style === 'prominent' && (
              <div className={cn('flex justify-center mb-3', color.icon)}>
                {metricIcons[index]?.icon}
              </div>
            )}
            <div className={cn(
              'font-bold bg-gradient-to-r bg-clip-text text-transparent',
              color.value,
              style === 'prominent' ? 'text-3xl' : 'text-xl'
            )}>
              {metric}
            </div>
            {style === 'prominent' && (
              <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider">
                {metricIcons[index]?.label}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default ProofStrip;
