'use client'
import Image from 'next/image'
import { Statue } from '@/lib/types'
import { normalizeEra } from '@/lib/filter'

interface Props {
  statue: Statue
  index: number
  total: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  isMobile?: boolean
}

export default function StatueDrawer({ statue, index, total, onClose, onPrev, onNext, isMobile }: Props) {
  const eraDisplay = normalizeEra(statue.era)

  const rows = [
    { label: '材質', value: statue.material },
    { label: '雕刻師', value: statue.sculptor },
    { label: '文化財', value: statue.designation === '国宝' ? '國寶' : '重要文化財' },
    { label: '收藏地', value: statue.location },
    { label: '都道府縣', value: statue.prefecture },
    { label: '佛像類型', value: statue.type },
  ]

  if (isMobile) {
    return (
      <div className="flex flex-col drawer-enter" style={{ background: '#fff', height: '100%' }}>
        {/* Mobile: image top strip */}
        <div style={{
          background: '#1a1510', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          height: statue.image_url ? '200px' : '80px',
          position: 'relative', paddingTop: '20px',
        }}>
          {statue.image_url ? (
            <div style={{ width: '100%', height: '200px', position: 'relative' }}>
              <Image src={statue.image_url} alt={statue.name_ja} fill className="object-contain" unoptimized style={{ padding: '12px' }} />
            </div>
          ) : null}
          {/* Designation badge */}
          <div style={{
            position: 'absolute', bottom: '10px', left: '14px',
            background: statue.designation === '国宝' ? '#1a1510' : 'transparent',
            border: statue.designation === '国宝' ? '1px solid #c9a84c' : '1px solid #c8bfaa',
            color: statue.designation === '国宝' ? '#c9a84c' : '#9a8870',
            fontSize: '8px', padding: '3px 8px', letterSpacing: '0.1em',
            fontFamily: 'var(--font-noto-sans)',
          }}>
            {statue.designation === '国宝' ? '國寶' : '重要文化財'}
          </div>
          {/* Close button */}
          <button onClick={onClose} style={{
            position: 'absolute', top: '14px', right: '14px',
            fontSize: '9px', color: '#7a6840', fontFamily: 'var(--font-noto-sans)',
            letterSpacing: '0.1em', cursor: 'pointer', background: 'none', border: 'none',
          }}>✕</button>
        </div>

        {/* Info scrollable */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 18px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '9px', color: '#c9a84c', letterSpacing: '0.2em', fontFamily: 'var(--font-noto-sans)', marginBottom: '4px' }}>
            {eraDisplay}　{statue.year}
          </div>
          <h2 className="drawer-title" style={{ fontSize: '20px', color: '#1a1a1a', letterSpacing: '0.06em', fontFamily: 'var(--font-noto-serif)', fontWeight: 400, lineHeight: 1.3, marginBottom: '4px' }}>
            {statue.name_ja}
          </h2>
          <div style={{ height: '2px', background: 'linear-gradient(90deg, #c9a84c, transparent)', margin: '12px 0' }} />
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-noto-sans)', marginBottom: '14px' }}>
            <tbody>
              {rows.map(({ label, value }) => value && value !== '不詳' ? (
                <tr key={label}>
                  <td style={{ fontSize: '9px', color: '#bbb', width: '58px', padding: '4px 0', borderBottom: '1px solid #f5f0e8', letterSpacing: '0.05em', verticalAlign: 'top' }}>{label}</td>
                  <td style={{ fontSize: '10px', color: '#1a1a1a', padding: '4px 0', borderBottom: '1px solid #f5f0e8', fontWeight: 500 }}>{value}</td>
                </tr>
              ) : null)}
            </tbody>
          </table>
          {statue.description && (
            <div style={{ fontSize: '10px', color: '#3c2e1e', lineHeight: '1.9', fontFamily: 'var(--font-noto-sans)', background: '#faf7f0', borderLeft: '3px solid #c9a84c', padding: '10px 12px', borderRadius: '0 3px 3px 0', marginBottom: statue.explanation ? '12px' : '0' }}>
              {statue.description}
            </div>
          )}
          {statue.explanation && (
            <div style={{ fontSize: '10px', color: '#5a4a38', lineHeight: '2.0', fontFamily: 'var(--font-noto-sans)' }}>
              {statue.explanation}
            </div>
          )}
          {statue.image_source && (
            <div style={{ marginTop: '14px', fontSize: '9px', color: '#bbb', fontFamily: 'var(--font-noto-sans)' }}>
              圖片來源：{statue.image_source}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div style={{ borderTop: '1px solid #f0e8d0', padding: '10px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#faf7f0', flexShrink: 0 }}>
          <button onClick={onPrev} disabled={index === 0} style={{ fontSize: '11px', color: index === 0 ? '#ccc' : '#c9a84c', fontFamily: 'var(--font-noto-sans)', cursor: index === 0 ? 'default' : 'pointer', background: 'none', border: 'none' }}>← 上一尊</button>
          <span style={{ fontSize: '10px', color: '#ccc', fontFamily: 'var(--font-noto-sans)' }}>{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
          <button onClick={onNext} disabled={index === total - 1} style={{ fontSize: '11px', color: index === total - 1 ? '#ccc' : '#c9a84c', fontFamily: 'var(--font-noto-sans)', cursor: index === total - 1 ? 'default' : 'pointer', background: 'none', border: 'none' }}>下一尊 →</button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col drawer-enter" style={{ background: '#fff', height: '100%' }}>

      {/* Top: image + info */}
      <div className="flex flex-1 min-h-0">

        {/* Image panel */}
        <div
          style={{
            width: '240px', flexShrink: 0, background: '#ede6d8',
            borderRight: '1px solid #e0d8c8', display: 'flex',
            flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: '10px', position: 'relative',
          }}
        >
          {statue.image_url ? (
            <div style={{ width: '180px', height: '240px', position: 'relative', borderRadius: '2px', overflow: 'hidden' }}>
              <Image src={statue.image_url} alt={statue.name_ja} fill className="object-contain" unoptimized />
            </div>
          ) : (
            <div style={{ width: '180px', height: '240px', background: '#ddd6c8', borderRadius: '2px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9a8870" strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              <span style={{ fontSize: '9px', color: '#9a8870', letterSpacing: '0.15em', fontFamily: 'var(--font-noto-sans)' }}>佛像圖片</span>
            </div>
          )}

          {/* Designation badge bottom-left */}
          <div
            style={{
              position: 'absolute', bottom: '12px', left: '12px',
              background: statue.designation === '国宝' ? '#1a1510' : 'transparent',
              border: statue.designation === '国宝' ? 'none' : '1px solid #c8bfaa',
              color: statue.designation === '国宝' ? '#c9a84c' : '#7a6548',
              fontSize: '8px', padding: '3px 8px', letterSpacing: '0.1em',
              fontFamily: 'var(--font-noto-sans)',
            }}
          >
            {statue.designation === '国宝' ? '國寶' : '重要文化財'}
          </div>
        </div>

        {/* Info panel */}
        <div style={{ flex: 1, padding: '20px 22px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          {/* Close */}
          <div style={{ textAlign: 'right', marginBottom: '14px' }}>
            <button
              onClick={onClose}
              style={{ fontSize: '9px', color: '#bbb', fontFamily: 'var(--font-noto-sans)', letterSpacing: '0.1em', cursor: 'pointer', background: 'none', border: 'none' }}
            >
              ✕ 關閉
            </button>
          </div>

          {/* Era + year */}
          <div style={{ fontSize: '9px', color: '#c9a84c', letterSpacing: '0.2em', fontFamily: 'var(--font-noto-sans)', marginBottom: '6px' }}>
            {eraDisplay}　{statue.year}
          </div>

          {/* Title */}
          <h2 className="drawer-title" style={{ fontSize: '24px', color: '#1a1a1a', letterSpacing: '0.08em', fontFamily: 'var(--font-noto-serif)', fontWeight: 400, lineHeight: 1.3, marginBottom: '4px' }}>
            {statue.name_ja}
          </h2>

          {/* Gold gradient divider */}
          <div style={{ height: '2px', background: 'linear-gradient(90deg, #c9a84c, transparent)', margin: '14px 0' }} />

          {/* Data table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-noto-sans)', marginBottom: '16px' }}>
            <tbody>
              {rows.map(({ label, value }) => value && value !== '不詳' ? (
                <tr key={label}>
                  <td style={{ fontSize: '9px', color: '#bbb', width: '58px', padding: '5px 0', borderBottom: '1px solid #f5f0e8', letterSpacing: '0.05em', verticalAlign: 'top' }}>
                    {label}
                  </td>
                  <td style={{ fontSize: '10px', color: '#1a1a1a', padding: '5px 0', borderBottom: '1px solid #f5f0e8', fontWeight: 500 }}>
                    {value}
                  </td>
                </tr>
              ) : null)}
            </tbody>
          </table>

          {/* 文化價值（短摘要）*/}
          {statue.description && (
            <div style={{
              fontSize: '10px', color: '#3c2e1e', lineHeight: '1.9',
              fontFamily: 'var(--font-noto-sans)',
              background: '#faf7f0', borderLeft: '3px solid #c9a84c',
              padding: '12px 14px', borderRadius: '0 3px 3px 0',
              marginBottom: statue.explanation ? '14px' : '0',
            }}>
              {statue.description}
            </div>
          )}

          {/* 解說（詳細說明）*/}
          {statue.explanation && (
            <div style={{ fontSize: '10px', color: '#5a4a38', lineHeight: '2.0', fontFamily: 'var(--font-noto-sans)' }}>
              {statue.explanation}
            </div>
          )}

          {/* 圖片來源 */}
          {statue.image_source && (
            <div style={{ marginTop: '16px', fontSize: '9px', color: '#bbb', fontFamily: 'var(--font-noto-sans)', letterSpacing: '0.05em' }}>
              圖片來源：{statue.image_source}
            </div>
          )}
        </div>
      </div>

      {/* Footer navigation */}
      <div
        style={{
          borderTop: '2px solid #f0e8d0', padding: '10px 22px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: '#faf7f0', flexShrink: 0,
        }}
      >
        <button
          onClick={onPrev}
          disabled={index === 0}
          style={{ fontSize: '10px', color: index === 0 ? '#ccc' : '#c9a84c', fontFamily: 'var(--font-noto-sans)', letterSpacing: '0.1em', cursor: index === 0 ? 'default' : 'pointer', background: 'none', border: 'none' }}
        >
          ← 上一尊
        </button>
        <span style={{ fontSize: '10px', color: '#ccc', fontFamily: 'var(--font-noto-sans)', letterSpacing: '0.15em' }}>
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <button
          onClick={onNext}
          disabled={index === total - 1}
          style={{ fontSize: '10px', color: index === total - 1 ? '#ccc' : '#c9a84c', fontFamily: 'var(--font-noto-sans)', letterSpacing: '0.1em', cursor: index === total - 1 ? 'default' : 'pointer', background: 'none', border: 'none' }}
        >
          下一尊 →
        </button>
      </div>
    </div>
  )
}
