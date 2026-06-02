/**
 * Headline that reveals one word at a time with a staggered rise-and-fade,
 * inspired by kinetic-typography intros. Splits on spaces so words never
 * break mid-line; each word animates as a unit. Honors prefers-reduced-motion
 * (the CSS animation simply resolves to the final state).
 */
export default function AnimatedHeadline({
  text,
  className,
  delayStep = 70,
  baseDelay = 150,
}: {
  text: string;
  className?: string;
  delayStep?: number;
  baseDelay?: number;
}) {
  const words = text.split(' ');
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <span
            aria-hidden
            className="inline-block animate-word-rise"
            style={{
              animationDelay: `${baseDelay + i * delayStep}ms`,
              animationFillMode: 'both',
            }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </span>
  );
}
