import statues from '@/data/statues.json'

const total = statues.length
const kokuhо = statues.filter((s: { designation: string }) => s.designation === '国宝').length
const locations = new Set(statues.map((s: { location: string }) => s.location)).size

export default function Hero() {
  return (
    <div
      className="relative overflow-hidden text-center border-b-[3px]"
      style={{ background: '#1a1510', borderBottomColor: '#c9a84c' }}
    >
      {/* background kanji watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
        style={{ fontFamily: 'var(--font-noto-serif)', fontSize: '280px', color: 'rgba(201,168,76,0.05)', lineHeight: 1 }}
      >
        仏
      </div>

      <div className="relative z-10 px-8 pt-8 pb-6">
        {/* Japanese subtitle */}
        <p
          className="hero-subtitle mb-2 tracking-[0.4em] uppercase"
          style={{ fontSize: '11px', color: '#7a6840', fontFamily: 'var(--font-noto-sans)' }}
        >
          Nihon Butsuzo Bijutsu
        </p>

        {/* Main title */}
        <h1
          className="hero-title"
          style={{
            fontSize: '56px',
            color: '#f2ece0',
            letterSpacing: '0.15em',
            fontWeight: 400,
            lineHeight: 1.1,
            fontFamily: 'var(--font-noto-serif)',
          }}
        >
          日本佛像藝術
        </h1>

        {/* Gold divider */}
        <div className="mx-auto mt-4 mb-3" style={{ width: '60px', height: '2px', background: '#c9a84c' }} />

        {/* Subtitle */}
        <p
          style={{ fontSize: '11px', color: '#7a6840', letterSpacing: '0.15em', fontFamily: 'var(--font-noto-sans)' }}
        >
          飛鳥〜江戶・100尊國寶・重要文化財・6世紀〜19世紀
        </p>

        {/* Stats */}
        <div
          className="mt-5 pt-4 flex justify-center"
          style={{ borderTop: '1px solid #2e2518' }}
        >
          {[
            { num: total, label: '尊藏品' },
            { num: 8, label: '個時代' },
            { num: '1300+', label: '年歷史' },
            { num: kokuhо, label: '件國寶' },
            { num: locations, label: '所在地' },
          ].map(({ num, label }, i) => (
            <div
              key={i}
              className="flex-1 text-center"
              style={{ borderRight: i < 4 ? '1px solid #2e2518' : undefined, maxWidth: '140px' }}
            >
              <div className="hero-stat-num" style={{ fontSize: '22px', color: '#c9a84c', fontFamily: 'var(--font-noto-sans)', fontWeight: 300 }}>
                {num}
              </div>
              <div className="hero-stat-label" style={{ fontSize: '9px', color: '#5a5040', letterSpacing: '0.15em', fontFamily: 'var(--font-noto-sans)', marginTop: '2px' }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
