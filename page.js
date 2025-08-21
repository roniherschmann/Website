// app/page.js
import { useProfile } from '@/hooks/useProfile'; // Assuming hooks are in hooks/ folder as per backend.js
import { useProjects } from '@/hooks/useProjects';
import Image from 'next/image';
import Link from 'next/link';
import { generateMetadata } from '@/utils/seo'; // As per backend.js

export async function generatePageMetadata() {
  return generateMetadata('home');
}

export default function Home() {
  const { profile, loading: profileLoading } = useProfile();
  const { projects: featuredProjects, loading: projectsLoading } = useProjects({ featured: true });

  if (profileLoading || projectsLoading) return <div>Loading...</div>;

  const { name, title, bio, profileImage, location } = profile.profile;
  const socialLinks = profile.socialLinks;

  return (
    <div className="container mx-auto p-4">
      {/* Hero Section */}
      <section className="text-center py-12">
        <Image
          src={profileImage}
          alt={name}
          width={200}
          height={200}
          className="rounded-full mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold">{name}</h1>
        <h2 className="text-2xl text-gray-600">{title}</h2>
        <p className="text-gray-500">{location}</p>
        <p className="mt-4 max-w-2xl mx-auto">{bio}</p>
        <div className="mt-6 flex justify-center space-x-4">
          {socialLinks.linkedin && <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
          {socialLinks.github && <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
          {socialLinks.twitter && <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>}
          {socialLinks.email && <a href={socialLinks.email}>Email</a>}
          {socialLinks.resume && <a href={socialLinks.resume} download>Resume</a>}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <div key={project.id} className="border rounded p-4">
              <Image src={project.thumbnail} alt={project.title} width={400} height={300} />
              <h3 className="text-xl font-bold mt-2">{project.title}</h3>
              <p className="text-gray-600">{project.description}</p>
              <Link href={`/projects/${project.slug}`}>View Details</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
