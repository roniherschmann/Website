// app/contact/page.js
import { useState } from 'react';
import { generateMetadata } from '@/utils/seo';

export async function generatePageMetadata() {
  return {
    title: 'Contact - Your Name Portfolio',
    description: 'Get in touch with me',
  };
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setStatus(res.ok ? 'success' : 'error');
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Me</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded h-32"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Send Message</button>
      </form>
      {status === 'success' && <p className="mt-4 text-green-500">Message sent successfully!</p>}
      {status === 'error' && <p className="mt-4 text-red-500">Failed to send message. Please try again.</p>}
    </div>
  );
}
