import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ProjectShowcaseProps, Persona } from '@/lib/schemas';
import { PORTFOLIO_DATA, type Project } from '@/lib/portfolio-data';
import { ExternalLink, Github, TrendingUp, Layers, ArrowUpRight } from 'lucide-react';

interface ProjectShowcaseComponentProps extends ProjectShowcaseProps {
  persona?: Persona;
}

export function ProjectShowcase({ projectIds, emphasis, persona = 'unknown' }: ProjectShowcaseComponentProps) {
  const projects = projectIds.length > 0
    ? PORTFOLIO_DATA.projects.filter(p => projectIds.includes(p.id))
    : PORTFOLIO_DATA.projects;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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
      <h2 className="text-2xl font-bold text-white">
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
            persona={persona}
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
  persona: Persona;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function ProjectCard({ project, emphasis, variants, persona }: ProjectCardProps) {
  // Persona-specific colors
  const colors = {
    recruiter: {
      type: 'text-blue-400',
      metric: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      tech: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      border: 'hover:border-blue-500/40',
    },
    founder: {
      type: 'text-rose-400',
      metric: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      tech: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      border: 'hover:border-rose-500/40',
    },
    cto: {
      type: 'text-emerald-400',
      metric: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      tech: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      border: 'hover:border-emerald-500/40',
    },
    unknown: {
      type: 'text-indigo-400',
      metric: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      tech: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      border: 'hover:border-indigo-500/40',
    },
  };

  const color = colors[persona];

  return (
    <motion.article
      variants={variants}
      whileHover={{ y: -4 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl transition-all duration-300 border',
        'glass-card',
        color.border,
        emphasis === 'outcomes' ? 'p-6' : 'p-8'
      )}
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Header */}
      <div className="relative flex items-start justify-between mb-4">
        <div>
          <span className={cn('text-xs uppercase tracking-wider font-semibold', color.type)}>
            {project.type}
          </span>
          <h3 className="text-xl font-bold text-white mt-1 group-hover:text-white/90 transition-colors">
            {project.name}
          </h3>
        </div>

        <div className="flex gap-2">
          {project.links.github && (
            <motion.a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all border border-slate-700/50"
            >
              <Github size={18} />
            </motion.a>
          )}
          {project.links.demo && (
            <motion.a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "p-2.5 rounded-xl transition-all border",
                persona === 'recruiter' && "bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-500/30",
                persona === 'founder' && "bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border-rose-500/30",
                persona === 'cto' && "bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border-emerald-500/30",
                persona === 'unknown' && "bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 border-indigo-500/30"
              )}
            >
              <ArrowUpRight size={18} />
            </motion.a>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-400 mb-5 leading-relaxed">{project.description}</p>

      {emphasis === 'outcomes' ? (
        // Founder view: Metrics & Business Value
        <>
          <div className="flex items-center gap-2 text-sm mb-3">
            <TrendingUp size={16} className={color.type} />
            <span className={cn('font-semibold', color.type)}>Key Metrics</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-5">
            {project.metrics.map((metric) => (
              <span
                key={metric}
                className={cn('px-3 py-1.5 rounded-full text-sm font-medium border', color.metric)}
              >
                {metric}
              </span>
            ))}
          </div>
          <p className="text-sm text-slate-500 italic leading-relaxed">
            {project.businessValue}
          </p>
        </>
      ) : (
        // CTO view: Architecture & Tech Depth
        <>
          <div className="flex items-center gap-2 text-sm mb-3">
            <Layers size={16} className={color.type} />
            <span className={cn('font-semibold', color.type)}>Architecture</span>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className={cn('px-3 py-1.5 rounded-full text-sm font-medium border', color.tech)}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Technical Depth */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/50">
            <h4 className="text-sm font-semibold text-slate-300 mb-2">Technical Implementation</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              {project.technicalDepth}
            </p>
          </div>
        </>
      )}
    </motion.article>
  );
}

export default ProjectShowcase;
