export default function SectionDivider({ flip }: { flip?: boolean }) {
  // Background color matches our --color-bg token (#0a0a12)
  const fill = "#0a0a12";

  return (
    <div className="section-divider" aria-hidden>
      {flip ? (
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 40L60 35C120 30 240 20 360 25C480 30 600 50 720 55C840 60 960 50 1080 40C1200 30 1320 20 1380 15L1440 10V80H0V40Z"
            fill={fill}
          />
          <path
            d="M0 50L60 45C120 40 240 30 360 35C480 40 600 60 720 65C840 70 960 60 1080 50C1200 40 1320 30 1380 25L1440 20V80H0V50Z"
            fill={fill}
            opacity="0.6"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 10L60 15C120 20 240 30 360 25C480 20 600 0 720 -5C840 -10 960 0 1080 10C1200 20 1320 30 1380 35L1440 40V0H0V10Z"
            fill={fill}
          />
          <path
            d="M0 0L60 5C120 10 240 20 360 15C480 10 600 -10 720 -15C840 -20 960 -10 1080 0C1200 10 1320 20 1380 25L1440 30V0H0Z"
            fill={fill}
            opacity="0.6"
          />
        </svg>
      )}
    </div>
  );
}
