// app/about/page.js
import { useProfile } from '@/hooks/useProfile'; // Reuse profile for about if needed
import { generateMetadata } from '@/utils/seo';

export async function generatePageMetadata() {
  return generateMetadata('about');
}

export default function About() {
  const { profile, loading } = useProfile(); // But actually, about data is separate

  // Fetch about data - since there's useAbout hook not provided, fetch directly
  const [about, setAbout] = React.useState(null);
  React.useEffect(() => {
    fetch('/api/about')
      .then(res => res.json())
      .then(setAbout);
  }, []);

  if (loading || !about) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">{about.headline}</h1>
      <p className="max-w-2xl mx-auto mb-12">{about.introduction}</p>
      
      {about.sections.map((section, index) => (
        <section key={index} className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
          {section.content && <p>{section.content}</p>}
          {section.items && (
            <ul className="list-disc pl-6">
              {section.items.map((item, i) => (
                <li key={i}>
                  {item.category ? (
                    <>
                      <strong>{item.category}:</strong> {item.skills.join(', ')}
                    </>
                  ) : item.degree ? (
                    <>
                      <strong>{item.degree}</strong> - {item.institution} ({item.year})<br />
                      {item.description}
                    </>
                  ) : item.role ? (
                    <>
                      <strong>{item.role}</strong> at {item.company} ({item.period})<br />
                      {item.description}<br />
                      Highlights: {item.highlights?.join(', ')}
                    </>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
