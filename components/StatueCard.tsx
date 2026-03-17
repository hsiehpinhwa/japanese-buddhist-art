'use client'
import Image from 'next/image'
import { Statue } from '@/lib/types'

interface Props {
  statue: Statue
  active: boolean
  onClick: () => void
}

function DesignationBadge({ d }: { d: string }) {
  if (d === '国宝') {
    return (
      <span style={{
        fontSize: '7px', background: '#1a1510', color: '#c9a84c',
        padding: '2px 6px', display: 'inline-block', letterSpacing: '0.1em',
        fontFamily: 'var(--font-noto-sans)',
      }}>
        國寶
      </span>
    )
  }
  return (
    <span style={{
      fontSize: '7px', background: 'transparent', color: '#7a6548',
      border: '1px solid #c8bfaa', padding: '1px 5px', display: 'inline-block',
      letterSpacing: '0.05em', fontFamily: 'var(--font-noto-sans)',
    }}>
      重要文化財
    </span>
  )
}

export default function StatueCard({ statue, active, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left transition-all"
      style={{
        background: active ? '#fffdf7' : '#ffffff',
        border: `1px solid ${active ? '#c9a84c' : '#e0d8c8'}`,
        borderLeft: `3px solid ${active ? '#c9a84c' : 'transparent'}`,
        borderRadius: '2px',
        padding: '10px 12px',
        display: 'flex',
        gap: '10px',
        alignItems: 'flex-start',
        boxShadow: active ? '0 2px 12px rgba(201,168,76,0.12)' : 'none',
        cursor: 'pointer',
      }}
    >
      {/* Thumbnail */}
      <div style={{ width: '42px', height: '54px', background: '#ede6d8', borderRadius: '2px', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
        {statue.image_url ? (
          <Image
            src={statue.image_url}
            alt={statue.name_ja}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9a8870" strokeWidth="1.2">
              <rect x="3" y="3" width="18" height="18" rx="1" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '8px', color: '#c9a84c', fontFamily: 'var(--font-noto-sans)', letterSpacing: '0.1em', marginBottom: '2px' }}>
          {statue.year}　{statue.prefecture}
        </div>
        <div style={{ fontSize: '11px', color: '#1a1a1a', fontFamily: 'var(--font-noto-serif)', letterSpacing: '0.05em', marginBottom: '3px', lineHeight: 1.4 }}>
          {statue.name_ja}
        </div>
        <div style={{ fontSize: '8px', color: '#7a6548', fontFamily: 'var(--font-noto-sans)', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {statue.material}　{statue.sculptor !== '不詳' ? statue.sculptor : ''}
        </div>
        <DesignationBadge d={statue.designation} />
      </div>
    </button>
  )
}
