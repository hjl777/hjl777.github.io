import { Fragment, type ReactNode } from 'react';

/**
 * Lightweight inline renderer for the bio/approach prose in data.ts.
 * Supports two markers:
 *   `code`  → monospace technical term (PEFT, KG-RAG, SHAP, …)
 *   *emph*  → italic emphasis
 * Everything else renders as plain text. Markers do not nest.
 */
export function renderRich(text: string): ReactNode {
  const tokens = text.split(/(`[^`]+`|\*[^*]+\*)/g);
  return tokens.map((tok, i) => {
    if (tok.startsWith('`') && tok.endsWith('`')) {
      return (
        <code
          key={i}
          className="rounded bg-ink-100 px-1 py-0.5 font-mono text-[0.85em] text-indigo-700 dark:bg-ink-800 dark:text-indigo-300"
        >
          {tok.slice(1, -1)}
        </code>
      );
    }
    if (tok.startsWith('*') && tok.endsWith('*')) {
      return (
        <em key={i} className="italic">
          {tok.slice(1, -1)}
        </em>
      );
    }
    return <Fragment key={i}>{tok}</Fragment>;
  });
}
