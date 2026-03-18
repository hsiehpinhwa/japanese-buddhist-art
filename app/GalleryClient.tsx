'use client'
import { useState, useMemo, useCallback, useEffect } from 'react'
import rawStatues from '@/data/statues.json'
import { ERAS, ERA_NORMALIZE } from '@/data/eras'
import { Statue } from '@/lib/types'
import { filterStatues, DEFAULT_FILTERS, Filters, filtersToParams, paramsToFilters } from '@/lib/filter'
import Hero from '@/components/Hero'
import FilterBar from '@/components/FilterBar'
import EraBlock from '@/components/EraBlock'
import StatueDrawer from '@/components/StatueDrawer'
import { useIsMobile } from '@/hooks/useIsMobile'

const ALL_STATUES = rawStatues as Statue[]

export default function GalleryClient() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  // Sync filters to/from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setFilters(paramsToFilters(params))
  }, [])

  const handleFiltersChange = useCallback((f: Filters) => {
    setFilters(f)
    const params = filtersToParams(f)
    const qs = params.toString()
    window.history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname)
    setSelectedId(null)
  }, [])

  const filtered = useMemo(() => filterStatues(ALL_STATUES, filters), [filters])

  const selectedStatue = useMemo(
    () => (selectedId != null ? filtered.find((s) => s.id === selectedId) ?? null : null),
    [selectedId, filtered]
  )

  const selectedIndex = useMemo(
    () => (selectedId != null ? filtered.findIndex((s) => s.id === selectedId) : -1),
    [selectedId, filtered]
  )

  const handleSelect = useCallback((s: Statue) => {
    setSelectedId((prev) => (prev === s.id ? null : s.id))
  }, [])

  const handlePrev = useCallback(() => {
    if (selectedIndex > 0) setSelectedId(filtered[selectedIndex - 1].id)
  }, [selectedIndex, filtered])

  const handleNext = useCallback(() => {
    if (selectedIndex < filtered.length - 1) setSelectedId(filtered[selectedIndex + 1].id)
  }, [selectedIndex, filtered])

  // Group filtered statues by normalized era, in ERAS order
  const grouped = useMemo(() => {
    return ERAS.map((era) => ({
      era,
      statues: filtered.filter((s) => (ERA_NORMALIZE[s.era] ?? s.era) === era.id),
    })).filter((g) => g.statues.length > 0)
  }, [filtered])

  const drawerOpen = selectedStatue != null
  const isMobile = useIsMobile()

  return (
    <div style={{ minHeight: '100vh', background: '#f2ece0' }}>
      {/* Nav */}
      <nav style={{ background: '#1a1510', padding: '10px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <span style={{ fontSize: '13px', color: '#c9a84c', letterSpacing: '0.3em', fontFamily: 'var(--font-noto-serif)', fontWeight: 400 }}>
          日本佛像藝術
        </span>
        <div style={{ display: 'flex', gap: '20px', fontSize: '9px', color: '#7a6840', letterSpacing: '0.15em', fontFamily: 'var(--font-noto-sans)' }}>
          <span>時間軸</span>
          <span>關於</span>
        </div>
      </nav>

      <Hero />
      <FilterBar filters={filters} onChange={handleFiltersChange} />

      {/* Main content */}
      <div
        style={{
          display: isMobile ? 'block' : 'grid',
          gridTemplateColumns: !isMobile && drawerOpen ? '373px 1fr' : '1fr',
          minHeight: 'calc(100vh - 200px)',
          transition: 'grid-template-columns 0.25s ease',
        }}
      >
        {/* Timeline */}
        <div
          style={{
            borderRight: !isMobile && drawerOpen ? '1px solid #d8d0c0' : 'none',
            overflowY: !isMobile && drawerOpen ? 'auto' : undefined,
            maxHeight: !isMobile && drawerOpen ? 'calc(100vh - 200px)' : undefined,
            position: !isMobile && drawerOpen ? 'sticky' : undefined,
            top: !isMobile && drawerOpen ? '41px' : undefined,
          }}
        >
          {filtered.length === 0 ? (
            <div style={{ padding: '60px 28px', textAlign: 'center', color: '#9a8870', fontFamily: 'var(--font-noto-sans)', fontSize: '13px' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔍</div>
              目前無符合篩選條件的佛像
            </div>
          ) : (
            grouped.map(({ era, statues }) => (
              <EraBlock
                key={era.id}
                era={era}
                statues={statues}
                activeId={selectedId}
                onSelect={handleSelect}
              />
            ))
          )}
        </div>

        {/* Desktop Drawer */}
        {!isMobile && drawerOpen && selectedStatue && (
          <div style={{ position: 'sticky', top: '41px', height: 'calc(100vh - 41px)', overflowY: 'auto' }}>
            <StatueDrawer
              statue={selectedStatue}
              index={selectedIndex}
              total={filtered.length}
              onClose={() => setSelectedId(null)}
              onPrev={handlePrev}
              onNext={handleNext}
            />
          </div>
        )}
      </div>

      {/* Mobile Bottom Sheet */}
      {isMobile && drawerOpen && selectedStatue && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setSelectedId(null)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(26,21,16,0.55)',
              zIndex: 40,
            }}
          />
          {/* Sheet */}
          <div
            className="sheet-enter"
            style={{
              position: 'fixed', bottom: 0, left: 0, right: 0,
              height: '84vh',
              zIndex: 50,
              borderRadius: '16px 16px 0 0',
              overflow: 'hidden',
              boxShadow: '0 -8px 40px rgba(0,0,0,0.3)',
            }}
          >
            {/* Drag handle */}
            <div style={{
              position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)',
              width: '36px', height: '3px', background: '#c8bfaa', borderRadius: '2px', zIndex: 1,
            }} />
            <StatueDrawer
              statue={selectedStatue}
              index={selectedIndex}
              total={filtered.length}
              onClose={() => setSelectedId(null)}
              onPrev={handlePrev}
              onNext={handleNext}
              isMobile
            />
          </div>
        </>
      )}

      {/* Footer */}
      <footer style={{ background: '#1a1510', borderTop: '2px solid #c9a84c', padding: '14px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '9px', color: '#5a5040', fontFamily: 'var(--font-noto-sans)', letterSpacing: '0.05em' }}>
          資料來源：文化廳國指定文化財資料庫・奈良/東京/京都國立博物館・Wikipedia
        </span>
        <span style={{ fontSize: '9px', color: '#5a5040', fontFamily: 'var(--font-noto-sans)' }}>
          100尊完全版
        </span>
      </footer>
    </div>
  )
}
