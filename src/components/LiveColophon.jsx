import { useState, useEffect } from 'react';

export default function LiveColophon() {
  const [colWidth, setColWidth] = useState(null);
  const [wordsPerLine, setWordsPerLine] = useState(null);
  const [bodySize, setBodySize] = useState(null);
  const [lhBody, setLhBody] = useState(null);

  useEffect(() => {
    try {
      const styles = getComputedStyle(document.documentElement);
      const size = parseFloat(styles.getPropertyValue('--type-body')) || 18.5;
      const lh = styles.getPropertyValue('--lh-body')?.trim() || '1.58';
      setBodySize(size);
      setLhBody(lh);

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      ctx.font = `${size}px Charter, Georgia, serif`;
      const sample = 'The quick brown fox jumps over the lazy dog and finds peace in simplicity';
      const words = sample.split(' ');
      const totalWidth = ctx.measureText(sample).width;
      const avgWord = totalWidth / words.length;
      const space = ctx.measureText(' ').width;

      const prose = document.querySelector('.about-page');
      const actual = prose ? prose.getBoundingClientRect().width : 0;
      const computedWpl = actual > 0 ? Math.round(actual / (avgWord + space)) : 14;

      setColWidth(actual > 0 ? Math.round(actual) : null);
      setWordsPerLine(computedWpl);
    } catch (e) { /* font not loaded yet */ }
  }, []);

  return (
    <div style={{ marginTop: 32, padding: '24px 0', borderTop: '0.5px solid var(--color-border)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-muted)', marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500 }}>
            Reads
          </div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--type-body)', lineHeight: 'var(--lh-body)', color: 'var(--color-body)' }}>
            Charter
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-faint)', marginTop: 4 }}>
            {bodySize ? `${bodySize}px / ${lhBody}` : '…'}
          </div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-muted)', marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500 }}>
            Navigates
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--type-body)', lineHeight: 'var(--lh-body)', color: 'var(--color-body)' }}>
            Inter
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-faint)', marginTop: 4 }}>
            UI, labels, meta
          </div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-muted)', marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500 }}>
            Counts
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--type-body)', lineHeight: 'var(--lh-body)', color: 'var(--color-body)' }}>
            JetBrains Mono
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-faint)', marginTop: 4 }}>
            Footnotes, data
          </div>
        </div>
      </div>

      {colWidth && (
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.7,
          color: 'var(--color-faint)',
        }}>
          Column: {colWidth}px · ~{wordsPerLine} words/line · Charter at {bodySize}px
        </div>
      )}
    </div>
  );
}
