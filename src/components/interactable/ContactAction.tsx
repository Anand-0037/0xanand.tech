import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ContactActionProps } from '@/lib/schemas';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import { Send, Briefcase, Code, CheckCircle } from 'lucide-react';

interface ContactActionComponentProps extends ContactActionProps {
  onIntentChange?: (intent: 'hiring' | 'freelance') => void;
}

export function ContactAction({ intent: initialIntent, prefilledMessage, onIntentChange }: ContactActionComponentProps) {
  const [intent, setIntent] = useState(initialIntent);
  const [message, setMessage] = useState(prefilledMessage || '');
  const [submitted, setSubmitted] = useState(false);
  const { profile } = PORTFOLIO_DATA;

  const handleIntentChange = (newIntent: 'hiring' | 'freelance') => {
    setIntent(newIntent);
    onIntentChange?.(newIntent);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create mailto link with the message
    const subject = intent === 'hiring'
      ? 'Hiring Opportunity'
      : 'Freelance Project Inquiry';
    const mailtoLink = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.open(mailtoLink, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-xl p-6"
    >
      <h2 className="text-xl font-semibold text-white mb-4">Get in Touch</h2>

      {/* Intent Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => handleIntentChange('hiring')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all',
            intent === 'hiring'
              ? 'bg-indigo-500/30 border-2 border-indigo-500 text-indigo-300'
              : 'bg-gray-800 border-2 border-transparent text-gray-400 hover:border-gray-600'
          )}
        >
          <Briefcase size={18} />
          <span className="font-medium">Hiring</span>
        </button>
        <button
          type="button"
          onClick={() => handleIntentChange('freelance')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all',
            intent === 'freelance'
              ? 'bg-purple-500/30 border-2 border-purple-500 text-purple-300'
              : 'bg-gray-800 border-2 border-transparent text-gray-400 hover:border-gray-600'
          )}
        >
          <Code size={18} />
          <span className="font-medium">Freelance</span>
        </button>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="message" className="block text-sm text-gray-400 mb-2">
            {intent === 'hiring'
              ? 'Tell me about the role and your company'
              : 'Describe your project idea'}
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              intent === 'hiring'
                ? "We're looking for a Full-Stack Engineer to join our team..."
                : "I need help building an MVP for..."
            }
            rows={4}
            className={cn(
              'w-full px-4 py-3 rounded-lg bg-gray-900/50 border',
              'text-white placeholder-gray-600',
              'focus:outline-none focus:ring-2',
              intent === 'hiring'
                ? 'border-gray-700 focus:ring-indigo-500/50 focus:border-indigo-500'
                : 'border-gray-700 focus:ring-purple-500/50 focus:border-purple-500',
              'resize-none transition-all'
            )}
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={submitted}
          className={cn(
            'w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition-all',
            submitted
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : intent === 'hiring'
                ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
          )}
        >
          {submitted ? (
            <>
              <CheckCircle size={18} />
              <span>Opening Email Client...</span>
            </>
          ) : (
            <>
              <Send size={18} />
              <span>Send Message</span>
            </>
          )}
        </motion.button>
      </form>

      {/* Quick Info */}
      <div className="mt-6 pt-4 border-t border-gray-700/50">
        <p className="text-sm text-gray-500 text-center">
          Response time: Usually within 24 hours
        </p>
      </div>
    </motion.section>
  );
}

export default ContactAction;
