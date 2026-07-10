import { useEffect, useState } from 'react';
import Nav from './components/Nav';
import JourneyRail from './components/JourneyRail';
import Hero from './components/Hero';
import News from './components/News';
import Highlights from './components/Highlights';
import Publications from './components/Publications';
import Projects from './components/Projects';
import Experience from './components/Experience';
import About from './components/About';
import ProjectPage from './components/ProjectPage';
import Footer from './components/Footer';

// Hash-based routing keeps GitHub Pages happy (no server rewrites) and
// coexists with plain #section anchors: "#/project/<id>" renders a project
// detail page; every other hash is a scroll target on the home page.
const PROJECT_PREFIX = '#/project/';

export default function App() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const projectId = hash.startsWith(PROJECT_PREFIX)
    ? hash.slice(PROJECT_PREFIX.length)
    : null;

  // Entering a project page starts at the top; returning home with a section
  // hash scrolls to that section once it has rendered.
  useEffect(() => {
    if (projectId) {
      window.scrollTo(0, 0);
      return;
    }
    const id = hash.slice(1);
    if (id) {
      requestAnimationFrame(() =>
        document.getElementById(id)?.scrollIntoView({ block: 'start' }),
      );
    }
  }, [projectId, hash]);

  return (
    <div className="min-h-screen bg-white text-ink-800 selection:bg-indigo-100 selection:text-indigo-900 dark:bg-ink-950 dark:text-ink-200 dark:selection:bg-indigo-500/30 dark:selection:text-indigo-100">
      <Nav />
      {projectId ? (
        <main className="overflow-x-clip">
          <ProjectPage id={projectId} />
        </main>
      ) : (
        <>
          <JourneyRail />
          <main className="overflow-x-clip">
            <Hero />
            <News />
            <Highlights />
            <Publications />
            <Projects />
            <Experience />
            <About />
          </main>
        </>
      )}
      <Footer />
    </div>
  );
}
