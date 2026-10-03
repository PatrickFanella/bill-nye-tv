import { useState } from 'react';
import { useViewer } from './engine/useViewer';
import { Compatibility } from './engine/Compatibility';
import { ChannelPanel, Library } from './engine/Viewer';
import { Player } from './engine/Player';
import './base.css';
import './styles.css';

function ScienceTV() {
  const viewer = useViewer('bill-nye');
  const [powered, setPowered] = useState(true);
  const [effects, setEffects] = useState(false);
  const libraryViewer = { ...viewer, watch: async (episode: Parameters<typeof viewer.watch>[0]) => { setPowered(true); await viewer.watch(episode); } };
  return <main>
    <a className="skip-link" href="#library">Skip to episode guide</a>
    <header className="lab-header"><a href="/" aria-label="Bill Nye TV home"><img className="series-logo" src="/assets/bill-nye-logo.png" alt="Bill Nye the Science Guy" /></a><div className="lab-stamp"><span>SCIENCE TELEVISION</span><strong>PRESS PLAY.<br />GET CURIOUS.</strong></div><nav aria-label="Main navigation"><a href="#screen">The television</a><a href="#library">Episode guide</a></nav></header>
    <div className="lab-band"><span>100 EPISODES / ONE SCIENCE LAB</span><span>ARCHIVAL REPLAY • ON DEMAND</span></div>
    <section className="science-layout" aria-label="Science television">
      <div className="television-area" id="screen">
        <div className={`tv-cabinet ${!powered ? 'power-off' : ''}`}>
          <div className={`crt-glass ${effects ? 'picture-effects' : ''}`}>
            {powered && viewer.session ? <Player key={viewer.key} session={viewer.session} paused={viewer.paused} onPaused={viewer.onPaused} /> : <div className="standby"><p className="osd">{powered ? 'SCIENCE TV / READY' : 'POWER OFF'}</p>{powered && <><div className="orbit-art" aria-hidden="true"><span>?</span></div><h1>There’s a whole<br />world to figure out.</h1><p>Pick an episode below or tune in to the shared replay.</p><button disabled={viewer.channel?.state !== 'playing'} onClick={() => { void viewer.tune(); }}>Tune in to science ↗</button></>}</div>}
          </div>
          <div className="cabinet-controls"><div className="speaker-grille" aria-hidden="true" /><span className="cabinet-label">BILL NYE / SCIENCE TV</span><button className={`power-button ${powered ? 'is-on' : ''}`} aria-label={powered ? 'Turn television off' : 'Turn television on'} aria-pressed={powered} onClick={() => setPowered(!powered)}><span aria-hidden="true">⏻</span></button></div>
        </div>
        <div className="television-settings"><span className="signal-status"><i aria-hidden="true" />{powered ? 'TELEVISION ON' : 'TELEVISION OFF'}</span><label><input type="checkbox" checked={effects} onChange={event => setEffects(event.target.checked)} /> Optional CRT picture effect</label></div>
        {viewer.resolving && <p role="status">Tuning the picture…</p>}{viewer.playError && <p role="alert">{viewer.playError}</p>}
        {viewer.session && <div className="program-card"><p className="eyebrow">{viewer.session.mode === 'channel' ? 'ON THE SHARED REPLAY' : 'WATCHING ON DEMAND'}</p><h2>{viewer.session.episode.title}</h2><p>{viewer.session.episode.description}</p><button onClick={() => { setPowered(true); void viewer.watch(viewer.session!.episode); }}>Watch from beginning</button></div>}
      </div>
      <div className="lab-sidebar"><div className="science-note"><span className="note-number">01 / OBSERVE</span><p>Big questions.<br />Small experiments.<br /><strong>Science rules.</strong></p></div><ChannelPanel viewer={{ ...viewer, tune: async () => { setPowered(true); await viewer.tune(); } }} /></div>
    </section>
    <Library viewer={libraryViewer} heading="The episode guide" mark="SCIENCE" yearFilter={false} />
    <footer><strong>Bill Nye / Science TV</strong><span>Independent archive viewer · Preserved source MP4s<br />Original picture proportions and source metadata retained.</span><a href="https://archive.org/details/billnyethescienceguythecompleteseries-07-28-2021" target="_blank" rel="noreferrer">View the source ↗</a></footer>
  </main>;
}
export default function App() { return <Compatibility collection="bill-nye"><ScienceTV /></Compatibility>; }
