import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import App from './App';

// Keep the published library components; replace network state for the brand's
// initial screen. Shared transport behavior is qualified by its own package.
vi.mock('@subcult/archive-viewer', async importOriginal => {
  const shared = await importOriginal<typeof import('@subcult/archive-viewer')>();
  return { ...shared,
    Compatibility: ({children}: {children: React.ReactNode}) => children,
    useViewer: () => ({session:null,channel:null,catalog:null,error:'',playError:'',
      collection:'test',filters:{},setFilters:vi.fn(),playbackState:'paused',onPlaybackState:vi.fn(),resolving:false,paused:true,mode:'ondemand',key:'',query:'',year:'',page:1,
      watch:vi.fn(),tune:vi.fn(),onPaused:vi.fn(),setQuery:vi.fn(),setYear:vi.fn(),setPage:vi.fn()}),
  };
});

describe('Bill Nye brand composition', () => {
  it('keeps the television, episode guide and source credit around shared components', () => {
    const html = renderToStaticMarkup(<App />);
    expect(html).toContain('Bill Nye the Science Guy');
    expect(html).toContain('The episode guide');
    expect(html).toContain('100 EPISODES / ONE SCIENCE LAB');
    expect(html).toContain('billnyethescienceguythecompleteseries-07-28-2021');
    expect(html).toContain('Replay schedule');
  });
  it('starts with a static standby screen and optional picture effects disabled', () => {
    const html = renderToStaticMarkup(<App />);
    expect(html).toContain('SCIENCE TV / READY');
    expect(html).toContain('Turn television off');
    expect(html).not.toContain('<video');
    expect(html).not.toContain('crt-glass picture-effects');
    expect(html).toMatch(/disabled="">Tune in to science/);
    expect(html).not.toMatch(/type="checkbox"[^>]*checked/);
  });
});
