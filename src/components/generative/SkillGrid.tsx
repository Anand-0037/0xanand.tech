import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { SkillGridProps } from '@/lib/schemas';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import { Code, Database, Cpu, Cloud, Layers, Terminal } from 'lucide-react';

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

export function SkillGrid({ skills: _skills, focus }: SkillGridProps) {
  // Use actual portfolio skills, filtered if skills prop is provided
  const skillsData = PORTFOLIO_DATA.skills;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  if (focus === 'breadth') {
    // Compact tags view for recruiters
    return (
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="glass rounded-xl p-6"
      >
        <h2 className="text-xl font-semibold text-white mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(skillsData).flatMap(([category, skills]) =>
            skills.map((skill) => (
              <motion.span
                key={`${category}-${skill}`}
                variants={itemVariants}
                className={cn(
                  'px-3 py-1.5 rounded-full text-sm font-medium',
                  'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
                  'hover:bg-indigo-500/30 transition-colors cursor-default'
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
      <h2 className="text-2xl font-semibold text-white">Technical Proficiency</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(skillsData).map(([category, skills]) => (
          <motion.div
            key={category}
            variants={itemVariants}
            className="glass rounded-xl p-5 hover:border-indigo-500/30 transition-colors"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                {categoryIcons[category]}
              </div>
              <h3 className="font-medium text-white">
                {categoryLabels[category]}
              </h3>
            </div>
            <div className="space-y-2">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-300">{skill}</span>
                  <div className="w-24 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${70 + Math.random() * 30}%` }}
                      transition={{ duration: 0.8, delay: Math.random() * 0.3 }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
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
