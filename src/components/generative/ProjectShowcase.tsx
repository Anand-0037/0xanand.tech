import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ProjectShowcaseProps } from '@/lib/schemas';
import { PORTFOLIO_DATA, type Project } from '@/lib/portfolio-data';
import { ExternalLink, Github, TrendingUp, Layers } from 'lucide-react';

export function ProjectShowcase({ projectIds, emphasis }: ProjectShowcaseProps) {
  // Filter projects by IDs, or show all if empty
  const projects = projectIds.length > 0
    ? PORTFOLIO_DATA.projects.filter(p => projectIds.includes(p.id))
    : PORTFOLIO_DATA.projects;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-white">
        {emphasis === 'outcomes' ? 'Projects & Impact' : 'Technical Portfolio'}
      </h2>

      <div className={cn(
        'grid gap-6',
        emphasis === 'outcomes' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
      )}>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            emphasis={emphasis}
            variants={cardVariants}
          />
        ))}
      </div>
    </motion.section>
  );
}

interface ProjectCardProps {
  project: Project;
  emphasis: 'outcomes' | 'architecture';
  variants: typeof cardVariants;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function ProjectCard({ project, emphasis, variants }: ProjectCardProps) {
  return (
    <motion.article
      variants={variants}
      className={cn(
        'group relative overflow-hidden rounded-xl transition-all',
        'glass hover:border-indigo-500/40',
        emphasis === 'outcomes' ? 'p-6' : 'p-8'
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-indigo-400 font-medium">
            {project.type}
          </span>
          <h3 className="text-xl font-semibold text-white mt-1">
            {project.name}
          </h3>
        </div>

        <div className="flex gap-2">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
            >
              <Github size={18} />
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-400 mb-4">{project.description}</p>

      {emphasis === 'outcomes' ? (
        // Founder view: Metrics & Business Value
        <>
          <div className="flex items-center gap-2 text-sm text-emerald-400 mb-4">
            <TrendingUp size={16} />
            <span className="font-medium">Key Metrics</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.metrics.map((metric) => (
              <span
                key={metric}
                className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm border border-emerald-500/20"
              >
                {metric}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-500 italic">
            {project.businessValue}
          </p>
        </>
      ) : (
        // CTO view: Architecture & Tech Depth
        <>
          <div className="flex items-center gap-2 text-sm text-purple-400 mb-4">
            <Layers size={16} />
            <span className="font-medium">Architecture</span>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm border border-purple-500/20"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Technical Depth */}
          <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-700/50">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Technical Implementation</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              {project.technicalDepth}
            </p>
          </div>
        </>
      )}
    </motion.article>
  );
}

export default ProjectShowcase;
