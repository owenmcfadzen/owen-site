import { useState } from 'react';

const items = [
  { label: "Negligent", pct: 8, color: "#a3281e" },
  { label: "Adequate", pct: 25, color: "#b87333" },
  { label: "Default quality", pct: 70, color: "#3a7d5c" },
  { label: "Craft", pct: 90, color: "#2a5a8a" },
  { label: "Obsessive", pct: 98, color: "#5c3d7a" },
];

export default function QualitySpectrum() {
  const [hover, setHover] = useState(null);
  return (
    <div style={{ margin: '32px 0' }}>
      {items.map((item, i) => (
        <div key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
          style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 6, cursor: 'default' }}>
          <div style={{
            fontFamily: "var(--font-sans)", fontSize: 12, width: 100, textAlign: 'right',
            opacity: hover === i ? 0.85 : 0.45, transition: 'opacity 0.15s', flexShrink: 0,
          }}>{item.label}</div>
          <div style={{ flex: 1, height: 20, borderRadius: 2, overflow: 'hidden', background: 'currentColor', opacity: 0.05 }}>
            <div style={{
              height: '100%', width: `${item.pct}%`, borderRadius: 2,
              background: item.color, opacity: hover === i ? 0.6 : 0.25,
              transition: 'opacity 0.2s',
            }} />
          </div>
        </div>
      ))}
    </div>
  );
}
