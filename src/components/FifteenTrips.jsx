import { useState } from 'react';

const trips = [
  { year: "2007", word: "first" },
  { year: "2009", word: "return" },
  { year: "2011", word: "surfaces" },
  { year: "2012", word: "rhythm" },
  { year: "2013", word: "gaps" },
  { year: "2014", word: "silence" },
  { year: "2015", word: "depth" },
  { year: "2016", word: "craft" },
  { year: "2017", word: "wabi-sabi" },
  { year: "2018", word: "tenugui" },
  { year: "2019", word: "kissa" },
  { year: "2020", word: "absence" },
  { year: "2022", word: "return" },
  { year: "2023", word: "practice" },
  { year: "2024", word: "home" },
];

export default function FifteenTrips() {
  const [active, setActive] = useState(null);
  return (
    <div style={{ margin: '8px 0 4px', display: 'inline' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, flexWrap: 'wrap', position: 'relative' }}>
        {trips.map((trip, i) => (
          <span
            key={i}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onClick={() => setActive(active === i ? null : i)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              cursor: 'default',
              position: 'relative',
            }}
          >
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: 'currentColor',
              opacity: active === i ? 0.7 : 0.15,
              transition: 'opacity 0.2s',
              flexShrink: 0,
            }} />
            {active === i && (
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                opacity: 0.5,
                whiteSpace: 'nowrap',
              }}>
                {trip.year} · {trip.word}
              </span>
            )}
          </span>
        ))}
      </span>
    </div>
  );
}
