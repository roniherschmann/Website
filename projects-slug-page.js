// app/projects/[slug]/page.js
import { generateMetadata } from '@/utils/seo';
import Image from 'next/image';
import { notFound } from 'next/navigation';

async function getProject(slug) {
  const res = await fetch(`/api/projects/${slug}`);
  if (!res.ok) return null;
  return res.json();
}

export async function generatePageMetadata({ params }) {
  const project = await getProject(params.slug);
  if (!project) return {};
  return generateMetadata('project', project);
}

export default async function ProjectDetail({ params }) {
  const project = await getProject(params.slug);
  if (!project) notFound();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      <p className="text-gray-600 mb-2">{project.category} - {project.year}</p>
      <Image src={project.thumbnail} alt={project.title} width={800} height={600} className="mb-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Description</h2>
        <p>{project.longDescription}</p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Technologies</h2>
        <ul className="list-disc pl-6">
          {project.technologies.map((tech, i) => <li key={i}>{tech}</li>)}
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Features</h2>
        <ul className="list-disc pl-6">
          {project.features.map((feature, i) => <li key={i}>{feature}</li>)}
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Links</h2>
        <ul>
          {project.links.live && <li><a href={project.links.live} target="_blank" rel="noopener noreferrer">Live Demo</a></li>}
          {project.links.github && <li><a href={project.links.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>}
          {project.links.demo && <li><a href={project.links.demo} target="_blank" rel="noopener noreferrer">Demo</a></li>}
        </ul>
      </section>
      
      {project.challenges && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Challenges</h2>
          <p>{project.challenges}</p>
        </section>
      )}
      
      {project.outcome && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Outcome</h2>
          <p>{project.outcome}</p>
        </section>
      )}
      
      <div className="grid grid-cols-2 gap-4">
        {project.images.map((img, i) => (
          <Image key={i} src={img} alt={`${project.title} screenshot ${i+1}`} width={400} height={300} />
        ))}
      </div>
    </div>
  );
}
