// app logo: stock cube, one amber face marking a low stock item
function Logo({ size = 40, subtitle = '' }) {
  return (
    <div className="logo">
      <svg
        className="logo-mark"
        width={size}
        height={size}
        viewBox="0 0 40 40"
        role="img"
        aria-label="StockFlow"
      >
        <rect width="40" height="40" rx="11" fill="currentColor" />
        <path d="M20 7 L33 14.5 L20 22 L7 14.5 Z" fill="#ffffff" opacity="0.95" />
        <path d="M7 14.5 L20 22 L20 34 L7 26.5 Z" fill="#ffffff" opacity="0.55" />
        <path d="M33 14.5 L20 22 L20 34 L33 26.5 Z" fill="#f7b731" />
      </svg>

      <div className="logo-text">
        <span className="logo-word" style={{ fontSize: size * 0.45 }}>
          Stock<span className="logo-word-light">Flow</span>
        </span>
        {subtitle ? <span className="logo-sub">{subtitle}</span> : null}
      </div>
    </div>
  );
}

export default Logo;
