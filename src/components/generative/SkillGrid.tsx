import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { SkillGridProps, Persona } from '@/lib/schemas';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import { Code, Database, Cpu, Cloud, Layers, Terminal } from 'lucide-react';

interface SkillGridComponentProps extends SkillGridProps {
  persona?: Persona;
}

const categoryIcons: Record<string, React.ReactNode> = {
  languages: <Code size={18} />,
  frontend: <Layers size={18} />,
  backend: <Database size={18} />,
  ai_ml: <Cpu size={18} />,
  devops: <Cloud size={18} />,
  core: <Terminal size={18} />,
};

const categoryLabels: Record<string, string> = {
  languages: 'Languages',
  frontend: 'Frontend',
  backend: 'Backend',
  ai_ml: 'AI & ML',
  devops: 'DevOps',
  core: 'Core',
};

export function SkillGrid({ skills: _skills, focus, persona = 'unknown' }: SkillGridComponentProps) {
  const skillsData = PORTFOLIO_DATA.skills;

  // Persona-specific colors
  const colors = {
    recruiter: {
      tag: 'bg-blue-500/15 text-blue-300 border-blue-500/25 hover:bg-blue-500/25',
      icon: 'bg-blue-500/20 text-blue-400',
      bar: 'from-blue-500 to-purple-500',
      card: 'hover:border-blue-500/30',
    },
    founder: {
      tag: 'bg-rose-500/15 text-rose-300 border-rose-500/25 hover:bg-rose-500/25',
      icon: 'bg-rose-500/20 text-rose-400',
      bar: 'from-rose-500 to-orange-500',
      card: 'hover:border-rose-500/30',
    },
    cto: {
      tag: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25 hover:bg-emerald-500/25',
      icon: 'bg-emerald-500/20 text-emerald-400',
      bar: 'from-emerald-500 to-cyan-500',
      card: 'hover:border-emerald-500/30',
    },
    unknown: {
      tag: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25 hover:bg-indigo-500/25',
      icon: 'bg-indigo-500/20 text-indigo-400',
      bar: 'from-indigo-500 to-purple-500',
      card: 'hover:border-indigo-500/30',
    },
  };

  const color = colors[persona];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  if (focus === 'breadth') {
    // Compact tags view for recruiters
    return (
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="glass-card rounded-2xl p-6 md:p-8"
      >
        <h2 className="text-xl font-semibold text-white mb-6">Technical Skills</h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(skillsData).flatMap(([category, skills]) =>
            skills.map((skill) => (
              <motion.span
                key={`${category}-${skill}`}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium border transition-all cursor-default',
                  color.tag
                )}
              >
                {skill}
              </motion.span>
            ))
          )}
        </div>
      </motion.section>
    );
  }

  // Detailed cards view for CTOs
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-white">Technical Proficiency</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(skillsData).map(([category, skills]) => (
          <motion.div
            key={category}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className={cn(
              'glass-card rounded-2xl p-6 transition-all duration-300 border',
              color.card
            )}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className={cn('p-2.5 rounded-xl', color.icon)}>
                {categoryIcons[category]}
              </div>
              <h3 className="font-semibold text-white text-lg">
                {categoryLabels[category]}
              </h3>
            </div>
            <div className="space-y-3">
              {skills.map((skill, index) => (
                <div key={skill} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">{skill}</span>
                    <span className="text-slate-500 text-xs">
                      {Math.floor(75 + (index * 5) % 25)}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${75 + (index * 5) % 25}%` }}
                      transition={{ duration: 0.8, delay: index * 0.05 }}
                      className={cn('h-full rounded-full bg-gradient-to-r', color.bar)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default SkillGrid;
