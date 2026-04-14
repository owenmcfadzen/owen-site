import { useState } from 'react';

const steps = [
  { key: "Capture", desc: "Bookmarks, notes, voice memos." },
  { key: "Converse", desc: "Dialogue with a thinking partner." },
  { key: "Clarify", desc: "Decide what the thing is." },
  { key: "Create", desc: "Make it, with momentum." },
  { key: "Communicate", desc: "Ship it." },
];

export default function FiveCsDiagram() {
  const [active, setActive] = useState(null);
  return (
    <div style={{ margin: '32px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <div onClick={() => setActive(active === i ? null : i)}
              style={{
                cursor: 'pointer', padding: '6px 10px', borderRadius: 4,
                background: active === i ? 'currentColor' : 'transparent',
                opacity: active === i ? 0.06 : 1, transition: 'all 0.15s',
              }}>
              <div style={{
                fontFamily: "var(--font-sans)", fontSize: 13,
                fontWeight: active === i ? 600 : 400,
                opacity: active === i ? 1 : 0.45,
                transition: 'all 0.15s',
              }}>{step.key}</div>
            </div>
            {i < steps.length - 1 && (
              <div style={{ width: 20, height: 1, background: 'currentColor', opacity: 0.1 }} />
            )}
          </div>
        ))}
      </div>
      <div style={{ minHeight: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 12 }}>
        {active !== null && (
          <div style={{
            fontFamily: "var(--font-serif)", fontSize: 14, lineHeight: 1.5,
            opacity: 0.5, maxWidth: 320, textAlign: 'center',
          }}>{steps[active].desc}</div>
        )}
      </div>
    </div>
  );
}
