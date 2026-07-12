import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Nav from './components/Nav';
import Hero from './components/Hero';
import News from './components/News';
import Publications from './components/Publications';
import Projects from './components/Projects';
import Experience from './components/Experience';
import About from './components/About';
import ProjectPage from './components/ProjectPage';
import ProjectsPage from './components/ProjectsPage';
import Footer from './components/Footer';

/**
 * Scroll behavior per navigation: plain section hashes (e.g. /#publications)
 * scroll to their target once rendered; route changes without a hash start
 * at the top of the page.
 */
function ScrollManager() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash && !location.hash.startsWith('#/')) {
      const id = location.hash.slice(1);
      requestAnimationFrame(() =>
        document.getElementById(id)?.scrollIntoView({ block: 'start' }),
      );
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);
  return null;
}

/**
 * The previous deploy used hash routes (#/projects, #/project/<id>).
 * Redirect any such deep link to its real path so old URLs keep working.
 */
function LegacyHashRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    const h = window.location.hash;
    if (h.startsWith('#/')) {
      navigate(h.slice(1).replace(/^\/project\//, '/projects/'), { replace: true });
    }
  }, [navigate]);
  return null;
}

function Home() {
  return (
    <main className="overflow-x-clip">
      <Hero />
      <Projects />
      <Publications />
      <Experience />
      <News />
      <About />
    </main>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-paper text-ink-800 selection:bg-clinic-100 selection:text-clinic-900 dark:bg-ink-950 dark:text-ink-200 dark:selection:bg-clinic-500/30 dark:selection:text-clinic-100">
      <LegacyHashRedirect />
      <ScrollManager />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/projects"
          element={
            <main className="overflow-x-clip">
              <ProjectsPage />
            </main>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <main className="overflow-x-clip">
              <ProjectPage />
            </main>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}
