import { useState } from 'react';

const events = [
  { year: "1960", label: "Antarctic line released" },
  { year: "1965", label: "Wanderer variant" },
  { year: "1970s", label: "Quartz crisis" },
  { year: "2019", label: "Nivada revived" },
  { year: "2023", label: "Owen's Wanderer" },
  { year: "Now", label: "Copenhagen" },
];

export default function Timeline() {
  const [active, setActive] = useState(null);
  return (
    <div style={{ margin: '32px 0', padding: '24px 0', overflow: 'hidden' }}>
      <div style={{ display: 'flex', position: 'relative', minWidth: 0 }}>
        <div style={{ position: 'absolute', top: 7, left: 0, right: 0, height: 1, background: 'currentColor', opacity: 0.12 }} />
        {events.map((e, i) => (
          <div key={i} onClick={() => setActive(active === i ? null : i)} style={{ flex: 1, cursor: 'pointer', textAlign: 'center', padding: '0 2px', position: 'relative', minWidth: 0 }}>
            <div style={{
              width: 12, height: 12, borderRadius: '50%', margin: '0 auto 10px',
              border: '1.5px solid currentColor',
              background: active === i ? 'currentColor' : 'transparent',
              opacity: active === i ? 0.7 : 0.2,
              transition: 'all 0.2s',
            }} />
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 11,
              opacity: active === i ? 0.85 : 0.35,
              transition: 'opacity 0.2s',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{e.year}</div>
            {active === i && (
              <div style={{
                fontFamily: "var(--font-sans)", fontSize: 12, lineHeight: 1.45,
                marginTop: 6, opacity: 0.55, maxWidth: '100%', margin: '6px auto 0',
              }}>{e.label}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
