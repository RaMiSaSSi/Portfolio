export default function SectionDivider({ flip }: { flip?: boolean }) {
  return (
    <div className="section-divider" aria-hidden>
      <div className="container-xl flex items-center gap-4">
        <div className="rule flex-1" />
        <span
          className="font-mono text-sm"
          style={{ color: "var(--color-text-muted)", transform: flip ? "rotate(45deg)" : undefined }}
        >
          +
        </span>
        <div className="rule flex-1" />
      </div>
    </div>
  );
}