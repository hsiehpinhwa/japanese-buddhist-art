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
        padding: '2px 7px', display: 'inline-block', letterSpacing: '0.12em',
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
      className="w-full text-left statue-card"
      style={{
        background: active ? '#fffdf7' : '#ffffff',
        border: '1px solid #e8e0d0',
        borderLeft: `4px solid ${active ? '#c9a84c' : 'transparent'}`,
        borderRadius: '2px',
        padding: '10px 12px',
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
        boxShadow: active ? '0 2px 12px rgba(0,0,0,0.06)' : 'none',
        cursor: 'pointer',
      }}
    >
      {/* Thumbnail */}
      <div
        className="thumb-wrap"
        style={{
          width: '48px', height: '62px',
          background: '#ede6d8', borderRadius: '2px',
          flexShrink: 0, position: 'relative', overflow: 'hidden',
        }}
      >
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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b8a888" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="1" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: '8px', color: '#c9a84c',
          fontFamily: 'var(--font-noto-sans)', letterSpacing: '0.12em', marginBottom: '3px',
        }}>
          {statue.year}　{statue.prefecture}
        </div>
        <div style={{
          fontSize: '12px', color: '#1a1a1a',
          fontFamily: 'var(--font-noto-serif)', letterSpacing: '0.04em',
          marginBottom: '4px', lineHeight: 1.4,
        }}>
          {statue.name_ja}
        </div>
        <div style={{
          fontSize: '8px', color: '#9a8068',
          fontFamily: 'var(--font-noto-sans)', marginBottom: '5px',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {statue.material}{statue.sculptor && statue.sculptor !== '不詳' ? `　${statue.sculptor}` : ''}
        </div>
        <DesignationBadge d={statue.designation} />
      </div>
    </button>
  )
}
