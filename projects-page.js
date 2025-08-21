// app/projects/page.js
import { useProjects } from '@/hooks/useProjects';
import Link from 'next/link';
import Image from 'next/image';
import { generateMetadata } from '@/utils/seo';
import { getCategories } from '@/utils/dataHelpers'; // As per backend.js
import { useState } from 'react';

export async function generatePageMetadata() {
  return generateMetadata('projects');
}

export default function Projects() {
  const { projects, loading } = useProjects();
  const [category, setCategory] = useState(null);

  if (loading) return <div>Loading...</div>;

  const categories = getCategories(projects);
  const filteredProjects = category ? projects.filter(p => p.category === category) : projects;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Projects</h1>
      
      {/* Category Filter */}
      <div className="flex justify-center space-x-4 mb-12">
        <button onClick={() => setCategory(null)} className={!category ? 'font-bold' : ''}>All</button>
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)} className={category === cat ? 'font-bold' : ''}>
            {cat}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="border rounded p-4">
            <Image src={project.thumbnail} alt={project.title} width={400} height={300} />
            <h3 className="text-xl font-bold mt-2">{project.title}</h3>
            <p className="text-gray-600">{project.description}</p>
            <Link href={`/projects/${project.slug}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
