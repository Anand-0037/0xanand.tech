import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ContactActionProps, Persona } from '@/lib/schemas';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import { Send, Briefcase, Rocket, Loader2, Zap } from 'lucide-react';

interface ContactActionComponentProps extends ContactActionProps {
  persona?: Persona;
}

export function ContactAction({ intent, prefilledMessage, persona = 'unknown' }: ContactActionComponentProps) {
  const [selectedIntent, setSelectedIntent] = useState<'hire' | 'partner' | 'audit'>(intent);
  const [message, setMessage] = useState(prefilledMessage || '');
  const [isSending, setIsSending] = useState(false);

  const { profile } = PORTFOLIO_DATA;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    // Simulate send delay
    setTimeout(() => {
      const subject = selectedIntent === 'hire'
        ? 'Job Opportunity Discussion'
        : selectedIntent === 'audit'
        ? 'Technical Audit Request'
        : 'Partnership Inquiry';

      const mailtoLink = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
      window.location.href = mailtoLink;
      setIsSending(false);
    }, 500);
  };

  // Persona-specific colors
  const colors = {
    recruiter: {
      active: 'bg-blue-500 text-white',
      inactive: 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50',
      button: 'btn-recruiter',
      border: 'border-blue-500/20',
      focusRing: 'focus:border-blue-500/50 focus:ring-blue-500/20',
    },
    founder: {
      active: 'bg-rose-500 text-white',
      inactive: 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50',
      button: 'btn-founder',
      border: 'border-rose-500/20',
      focusRing: 'focus:border-rose-500/50 focus:ring-rose-500/20',
    },
    cto: {
      active: 'bg-emerald-500 text-white',
      inactive: 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50',
      button: 'btn-cto',
      border: 'border-emerald-500/20',
      focusRing: 'focus:border-emerald-500/50 focus:ring-emerald-500/20',
    },
    data_scientist: {
      active: 'bg-violet-500 text-white',
      inactive: 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50',
      button: 'bg-violet-500 hover:bg-violet-600',
      border: 'border-violet-500/20',
      focusRing: 'focus:border-violet-500/50 focus:ring-violet-500/20',
    },
    unknown: {
      active: 'bg-indigo-500 text-white',
      inactive: 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50',
      button: 'bg-indigo-500 hover:bg-indigo-600',
      border: 'border-indigo-500/20',
      focusRing: 'focus:border-indigo-500/50 focus:ring-indigo-500/20',
    },
  };

  const color = colors[persona];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="neo-card rounded-lg p-8 md:p-10"
    >
      <h2 className="text-2xl font-bold text-white mb-2">Get in Touch</h2>
      <p className="text-slate-400 mb-8">
        Ready to discuss opportunities? Choose what best describes your inquiry.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Intent Toggle */}
        <div className="flex gap-3">
          {[
            { value: 'hire' as const, label: 'Hiring', icon: <Briefcase size={18} /> },
            { value: 'partner' as const, label: 'Partner', icon: <Rocket size={18} /> },
            { value: 'audit' as const, label: 'Audit', icon: <Zap size={18} /> },
          ].map((option) => (
            <motion.button
              key={option.value}
              type="button"
              onClick={() => setSelectedIntent(option.value)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'flex-1 flex items-center justify-center gap-2.5 py-4 rounded-xl font-medium transition-all border border-transparent',
                selectedIntent === option.value
                  ? color.active
                  : color.inactive
              )}
            >
              {option.icon}
              {option.label}
            </motion.button>
          ))}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-3">
            Your Message
          </label>
          <textarea
            id="message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              selectedIntent === 'hire'
                ? "Tell me about the role and your team..."
                : selectedIntent === 'audit'
                ? "Describe your system architecture review needs..."
                : "Describe your partnership proposal..."
            }
            className={cn(
              'w-full rounded-xl p-4 resize-none',
              'bg-slate-900/60 border border-slate-700/50',
              'text-white placeholder-slate-500',
              'focus:outline-none focus:ring-2 transition-all',
              color.focusRing
            )}
          />
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={isSending}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            'w-full py-4 rounded-xl font-semibold text-white',
            'flex items-center justify-center gap-3',
            'transition-all shadow-lg',
            isSending ? 'bg-slate-700 cursor-wait' : color.button
          )}
        >
          <AnimatePresence mode="wait">
            {isSending ? (
              <motion.span
                key="sending"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <Loader2 className="animate-spin" size={20} />
                Opening Mail...
              </motion.span>
            ) : (
              <motion.span
                key="send"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <Send size={20} />
                Send Message
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </form>
    </motion.section>
  );
}

export default ContactAction;
