import { useViewer, Compatibility, ChannelPanel, Library, Player, EpisodeMetadata, videoStateLabel } from '@subcult/archive-viewer';
import { useState } from 'react';
import { AccountPanel, ChatPanel, FavoriteAction, FavoriteShelf, VideoTools, useChannelChat, usePersonal, useTheater, useViewerLinks } from './ViewerTools';
import './base.css';
import './styles.css';

function ScienceTV() {
  const viewer = useViewer('bill-nye');
  const [powered, setPowered] = useState(true);
  const [effects, setEffects] = useState(false);
  const { theater, setTheater } = useTheater();
  const [layout, setLayout] = useState<'grid' | 'table'>('grid');
  const [savedOnly, setSavedOnly] = useState(false);
  const personal = usePersonal('bill-nye');
  const chat = useChannelChat('bill-nye', viewer.session, viewer.paused || !powered, personal);
  const linkError = useViewerLinks(viewer);
  const libraryViewer = { ...viewer, watch: async (episode: Parameters<typeof viewer.watch>[0]) => { setPowered(true); await viewer.watch(episode); } };
  return <main className={theater ? 'is-theater' : undefined}>
    <a className="skip-link" href="#library">Skip to episode guide</a>
    <header className="lab-header"><a href="/" aria-label="Bill Nye TV home"><img className="series-logo" src="/assets/bill-nye-logo.png" alt="Bill Nye the Science Guy" /></a><div className="lab-stamp"><span>SCIENCE TELEVISION</span><strong>PRESS PLAY.<br />GET CURIOUS.</strong></div><nav aria-label="Main navigation"><a href="#screen">The television</a><a href="#library">Episode guide</a></nav></header>
    <div className="lab-band"><span>100 EPISODES / ONE SCIENCE LAB</span><span>ARCHIVAL REPLAY • ON DEMAND</span></div>
    <section className="science-layout" aria-label="Science television">
      <div className="television-area" id="screen">
        <div className={`tv-cabinet ${!powered ? 'power-off' : ''}`}>
          <div className={`crt-glass ${effects ? 'picture-effects' : ''}`}>
            {powered && viewer.session ? <Player key={viewer.key} session={viewer.session} paused={viewer.paused} onPaused={viewer.onPaused} onRejoin={() => { void viewer.tune(); }} onPlaybackState={viewer.onPlaybackState} /> : <div className="standby"><p className="osd">{powered ? 'SCIENCE TV / READY' : 'POWER OFF'}</p>{powered && <><div className="orbit-art" aria-hidden="true"><span>?</span></div><h1>There’s a whole<br />world to figure out.</h1><p>Pick an episode below or tune in to the shared replay.</p><button disabled={viewer.channel?.state !== 'playing'} onClick={() => { void viewer.tune(); }}>Tune in to science ↗</button></>}</div>}
          </div>
          <div className="cabinet-controls"><div className="speaker-grille" aria-hidden="true" /><span className="cabinet-label">BILL NYE / SCIENCE TV</span><button className={`power-button ${powered ? 'is-on' : ''}`} aria-label={powered ? 'Turn television off' : 'Turn television on'} aria-pressed={powered} onClick={() => setPowered(!powered)}><span aria-hidden="true">⏻</span></button></div>
        </div>
        <div className="television-settings"><span className="signal-status"><i aria-hidden="true" />{powered ? 'TELEVISION ON' : 'TELEVISION OFF'}</span><label><input type="checkbox" checked={effects} onChange={event => setEffects(event.target.checked)} /> Optional CRT picture effect</label></div>
        <VideoTools viewer={viewer} theater={theater} onTheater={setTheater} />
        {linkError && <p role="status">{linkError}</p>}
        {viewer.resolving && <p role="status">Tuning the picture…</p>}{viewer.playError && <p role="alert">{viewer.playError}</p>}
        {viewer.session && <div className="program-card"><p className="eyebrow">{videoStateLabel(viewer.session.mode,viewer.playbackState)}</p><p>Original broadcast <time dateTime={viewer.session.episode.date}>{viewer.session.episode.date || 'Date unknown'}</time> · Archival replay</p><h2>{viewer.session.episode.title}</h2><p>{viewer.session.episode.description}</p><EpisodeMetadata episode={viewer.session.episode} /><FavoriteAction episode={viewer.session.episode} personal={personal} /><button onClick={() => { setPowered(true); void viewer.watch(viewer.session!.episode); }}>Watch from beginning</button><button disabled={viewer.channel?.state !== 'playing'} onClick={() => {setPowered(true);void viewer.tune();}}>Rejoin channel</button></div>}
      </div>
      <div className="lab-sidebar"><div className="science-note"><span className="note-number">01 / OBSERVE</span><p>Big questions.<br />Small experiments.<br /><strong>Science rules.</strong></p></div><ChannelPanel viewer={{ ...viewer, tune: async () => { setPowered(true); await viewer.tune(); } }} /></div>
    </section>
    <div className="library-toolbar" aria-label="Episode guide display"><button aria-pressed={layout === 'grid'} onClick={() => setLayout('grid')}>Grid view</button><button aria-pressed={layout === 'table'} onClick={() => setLayout('table')}>Table view</button><button aria-pressed={savedOnly} onClick={() => setSavedOnly(!savedOnly)}>{savedOnly ? 'Browse all episodes' : 'Show favorites'}</button></div>
    {savedOnly ? <FavoriteShelf viewer={libraryViewer} personal={personal} layout={layout} /> : <Library viewer={libraryViewer} heading="The episode guide" mark="SCIENCE" yearFilter={false} metadataFilters layout={layout} renderActions={episode => <FavoriteAction episode={episode} personal={personal} />} />}
    <AccountPanel personal={personal} product="Bill Nye TV" />
    <ChatPanel chat={chat} personal={personal} viewer={{...viewer,tune:async()=>{setPowered(true);await viewer.tune();}}} />
    <footer><strong>Bill Nye / Science TV</strong><span>Independent archive viewer · Preserved source MP4s<br />Original picture proportions and source metadata retained.</span><a href="https://archive.org/details/billnyethescienceguythecompleteseries-07-28-2021" target="_blank" rel="noreferrer">View the source ↗</a></footer>
  </main>;
}
export default function App() { return <Compatibility collection="bill-nye"><ScienceTV /></Compatibility>; }
