import Nav from './components/Nav';
import Hero from './components/Hero';
import News from './components/News';
import Highlights from './components/Highlights';
import Publications from './components/Publications';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-ink-800 selection:bg-indigo-100 selection:text-indigo-900 dark:bg-ink-950 dark:text-ink-200 dark:selection:bg-indigo-500/30 dark:selection:text-indigo-100">
      <Nav />
      <main>
        <Hero />
        <News />
        <Highlights />
        <Publications />
        <Projects />
        <Experience />
      </main>
      <Footer />
    </div>
  );
}
