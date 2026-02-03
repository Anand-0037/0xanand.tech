import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ProofStripProps } from '@/lib/schemas';
import { Award, Star, Zap, Users } from 'lucide-react';

const defaultMetrics = [
  { icon: <Award size={20} />, value: '4+', label: 'Projects Shipped' },
  { icon: <Star size={20} />, value: '2', label: 'Dual Degrees' },
  { icon: <Zap size={20} />, value: '<30s', label: 'Build Speed' },
  { icon: <Users size={20} />, value: 'GSoC', label: '2026 Target' },
];

export function ProofStrip({ metrics: _metrics, style }: ProofStripProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        'rounded-xl overflow-hidden',
        style === 'minimal' && 'glass py-4 px-6',
        style === 'prominent' && 'bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-purple-500/30 py-6 px-8'
      )}
    >
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {defaultMetrics.map((metric, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={cn(
              'flex items-center gap-3',
              style === 'prominent' && 'flex-col text-center'
            )}
          >
            <div className={cn(
              'text-indigo-400',
              style === 'prominent' && 'p-3 rounded-full bg-indigo-500/20'
            )}>
              {metric.icon}
            </div>
            <div className={cn(
              style === 'minimal' && 'flex items-baseline gap-2',
              style === 'prominent' && 'space-y-1'
            )}>
              <span className={cn(
                'font-bold',
                style === 'minimal' && 'text-xl text-white',
                style === 'prominent' && 'text-2xl md:text-3xl gradient-text'
              )}>
                {metric.value}
              </span>
              <span className={cn(
                'text-gray-400',
                style === 'minimal' && 'text-sm',
                style === 'prominent' && 'text-xs uppercase tracking-wider'
              )}>
                {metric.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default ProofStrip;
