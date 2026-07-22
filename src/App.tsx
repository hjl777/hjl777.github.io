import { useEffect, useLayoutEffect, useRef } from 'react';
import {
  Navigate,
  Outlet,
  createBrowserRouter,
  useLocation,
  useNavigate,
} from 'react-router-dom';
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
  const firstRender = useRef(true);
  useLayoutEffect(() => {
    if (location.hash && !location.hash.startsWith('#/')) {
      const id = location.hash.slice(1);
      document.getElementById(id)?.scrollIntoView({ block: 'start' });
    } else {
      window.scrollTo(0, 0);
    }
    // After a route change (not the initial load), move focus to the new
    // page's main landmark so keyboard/screen-reader users start at the top.
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (!location.hash) {
      const main = document.querySelector<HTMLElement>('main');
      if (main) {
        main.tabIndex = -1;
        main.focus({ preventScroll: true });
      }
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
      <Experience />
      <Projects />
      <About />
      <Publications />
      <News />
    </main>
  );
}

function AppLayout() {
  return (
    <div className="min-h-screen bg-paper text-ink-800 selection:bg-clinic-100 selection:text-clinic-900 dark:bg-ink-950 dark:text-ink-200 dark:selection:bg-clinic-500/30 dark:selection:text-clinic-100">
      <LegacyHashRedirect />
      <ScrollManager />
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'projects',
        element: (
          <main className="overflow-x-clip">
            <ProjectsPage />
          </main>
        ),
      },
      {
        path: 'projects/:id',
        element: (
          <main className="overflow-x-clip">
            <ProjectPage />
          </main>
        ),
      },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);
