'use client'
import { Filters } from '@/lib/filter'
import { ERAS } from '@/data/eras'

const PREFECTURES = ['奈良県', '京都府', '東京都', '大阪府', '神奈川県', '滋賀県', '兵庫県']

interface Props {
  filters: Filters
  onChange: (f: Filters) => void
}

export default function FilterBar({ filters, onChange }: Props) {
  const set = (key: keyof Filters, val: string) =>
    onChange({ ...filters, [key]: filters[key] === val ? '' : val })

  const Chip = ({
    label,
    active,
    onClick,
  }: {
    label: string
    active: boolean
    onClick: () => void
  }) => (
    <button
      onClick={onClick}
      className="transition-colors"
      style={{
        fontSize: '9px',
        padding: '3px 10px',
        border: active ? '1px solid #1a1510' : '1px solid #c8bfaa',
        background: active ? '#1a1510' : 'transparent',
        color: active ? '#c9a84c' : '#6a5c48',
        fontFamily: 'var(--font-noto-sans)',
        letterSpacing: '0.05em',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        borderRadius: '0',
      }}
    >
      {label}
    </button>
  )

  return (
    <div
      className="flex flex-col gap-1 px-7 py-1.5"
      style={{ background: '#f2ece0', borderBottom: '1px solid #d8d0c0' }}
    >
      {/* Row 1: 時代 */}
      <div className="filter-row flex items-center gap-1.5 flex-wrap">
        <span style={{ fontSize: '8px', color: '#9a8870', letterSpacing: '0.15em', fontFamily: 'var(--font-noto-sans)', minWidth: '28px', flexShrink: 0 }}>
          時代
        </span>
        <Chip label="全部" active={!filters.era} onClick={() => onChange({ ...filters, era: '' })} />
        {ERAS.map((e) => (
          <Chip key={e.id} label={e.name.replace('時代', '')} active={filters.era === e.id} onClick={() => set('era', e.id)} />
        ))}
      </div>

      {/* Row 2: 等級 + 地區 */}
      <div className="filter-row flex items-center gap-1.5 flex-wrap">
        <span style={{ fontSize: '8px', color: '#9a8870', letterSpacing: '0.15em', fontFamily: 'var(--font-noto-sans)', minWidth: '28px', flexShrink: 0 }}>
          等級
        </span>
        <Chip label="國寶" active={filters.designation === '国宝'} onClick={() => set('designation', '国宝')} />
        <Chip label="重要文化財" active={filters.designation === '重要文化財'} onClick={() => set('designation', '重要文化財')} />

        <div style={{ width: '1px', height: '14px', background: '#d8d0c0', margin: '0 4px' }} />

        <span style={{ fontSize: '8px', color: '#9a8870', letterSpacing: '0.15em', fontFamily: 'var(--font-noto-sans)', minWidth: '28px' }}>
          地區
        </span>
        {PREFECTURES.map((p) => (
          <Chip key={p} label={p.replace(/[都道府県]$/, '')} active={filters.prefecture === p} onClick={() => set('prefecture', p)} />
        ))}
      </div>
    </div>
  )
}
