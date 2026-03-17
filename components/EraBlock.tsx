'use client'
import { Era } from '@/data/eras'
import { Statue } from '@/lib/types'
import StatueCard from './StatueCard'

interface Props {
  era: Era
  statues: Statue[]
  activeId: number | null
  onSelect: (s: Statue) => void
}

export default function EraBlock({ era, statues, activeId, onSelect }: Props) {
  if (statues.length === 0) return null

  return (
    <div style={{ borderBottom: '1px solid #d8d0c0' }}>
      {/* Sticky era header */}
      <div
        className="sticky top-0 z-10 flex items-baseline gap-3"
        style={{
          background: '#1a1510',
          borderLeft: '4px solid #c9a84c',
          padding: '10px 18px 10px 20px',
        }}
      >
        <span style={{ fontSize: '13px', color: '#f2ece0', letterSpacing: '0.2em', fontFamily: 'var(--font-noto-serif)', fontWeight: 400 }}>
          {era.name}
        </span>
        <span style={{ fontSize: '9px', color: '#7a6840', letterSpacing: '0.1em', fontFamily: 'var(--font-noto-sans)' }}>
          {era.years}
        </span>
        <span
          style={{
            marginLeft: 'auto', fontSize: '8px', color: '#5a5040',
            fontFamily: 'var(--font-noto-sans)', letterSpacing: '0.05em',
          }}
        >
          {statues.length}尊
        </span>
      </div>

      {/* Era description */}
      <div
        style={{
          background: '#f8f4ec',
          borderLeft: '4px solid #e0d4b8',
          borderBottom: '1px solid #e8e0d0',
          padding: '6px 18px 6px 24px',
          fontSize: '9px', color: '#6a5c48', lineHeight: '1.6',
          fontFamily: 'var(--font-noto-sans)',
        }}
      >
        {era.description}
      </div>

      {/* Statue cards */}
      <div style={{ padding: '10px 14px 14px 14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {statues.map((s) => (
          <StatueCard
            key={s.id}
            statue={s}
            active={activeId === s.id}
            onClick={() => onSelect(s)}
          />
        ))}
      </div>
    </div>
  )
}
