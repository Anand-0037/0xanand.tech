import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { LayoutShellProps } from '@/lib/schemas';
import type { ReactNode } from 'react';

interface LayoutShellComponentProps extends LayoutShellProps {
  children: ReactNode;
}

const layoutVariants = {
  resume: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  pitch: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 },
  },
  technical: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
};

export function LayoutShell({ mode, emphasis, children }: LayoutShellComponentProps) {
  const variant = layoutVariants[mode];

  const gridStyles = {
    resume: 'flex flex-col gap-8 max-w-4xl mx-auto',
    pitch: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto',
    technical: 'grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 max-w-6xl mx-auto',
  };

  const spacingStyles = {
    speed: 'py-8 px-4',
    depth: 'py-12 px-6',
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={mode}
        initial={variant.initial}
        animate={variant.animate}
        exit={variant.exit}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className={cn(
          'min-h-screen',
          gridStyles[mode],
          spacingStyles[emphasis]
        )}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default LayoutShell;
