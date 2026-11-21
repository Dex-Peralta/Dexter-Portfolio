import BlurText from './BlurText.jsx'

export default function ProjectCard({ project, onOpen }) {
  return (
    <article className="project-card">
      <div
        className="project-image-frame"
        role={project.image ? undefined : 'img'}
        aria-label={project.image ? undefined : `Screenshot placeholder for ${project.name}`}
      >
        {project.image ? (
          <img
            className="project-image"
            src={project.image}
            alt={`${project.name} project screenshot`}
            style={{ objectPosition: project.imagePosition || 'center' }}
          />
        ) : (
          <div className="project-image-placeholder">
            <span>Project image</span>
            <strong>Screenshot placeholder</strong>
          </div>
        )}
      </div>

      <div className="project-card-content">
        <div className="project-card-meta">
          <BlurText as="span" text={project.number} className="project-number" />
          <BlurText as="span" text={project.category} className="project-category" />
        </div>
        <BlurText as="h3" text={project.name} />
        <BlurText as="p" text={project.title} className="project-title" />
        <BlurText as="p" text={project.description} className="project-description" animateBy="block" />
        <div className="project-contribution">
          <BlurText as="strong" text="My contribution" />
          <BlurText as="span" text={project.contribution} animateBy="block" />
        </div>
        <ul className="project-technologies" aria-label="Technologies">
          {project.technologies.map((technology) => (
            <li key={technology}>
              <BlurText as="span" text={technology} />
            </li>
          ))}
        </ul>
        <div className="project-actions">
          <button
            className="project-action project-details-button"
            type="button"
            onClick={(event) => onOpen(project, event.currentTarget)}
            aria-haspopup="dialog"
          >
            <BlurText as="span" text="View Details" />
            <span aria-hidden="true">↗</span>
          </button>
          {project.links?.map((link) => (
            <a
              className="project-action"
              href={link.url}
              key={link.label}
              target={link.url.startsWith('http') ? '_blank' : undefined}
              rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <BlurText as="span" text={link.label} />
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
    </article>
  )
}
