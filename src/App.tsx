import Nav from './components/Nav';
import Hero from './components/Hero';
import Publications from './components/Publications';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-ink-800 selection:bg-indigo-100 selection:text-indigo-900">
      <Nav />
      <main>
        <Hero />
        <Publications />
        <Projects />
        <Experience />
      </main>
      <Footer />
    </div>
  );
}
