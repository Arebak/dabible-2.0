/** @format */

"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Clock10, Volume2, VolumeX, HelpCircle } from "lucide-react";

interface ChapterAudioPlayerProps {
  src: string | null; // primary resolved URL (could be remote CDN)
  book: string;
  chapter: number;
  onActiveVerseChange?: (verse: number) => void;
  verseCount?: number; // for tick mark distribution
  showInlineControls?: boolean; // allow external controller to hide play button
  hasNext?: boolean; // whether there is a next chapter (for showing auto-advance UI)
}

// Placeholder timestamp type for future expansion
interface VerseTimestamp {
  verse: number;
  time: number;
}

export default function ChapterAudioPlayer({
  src,
  book,
  chapter,
  verseCount,
  onActiveVerseChange,
  hasNext = false,
}: ChapterAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeVerse, setActiveVerse] = useState<number | null>(null);
  const [timestamps, setTimestamps] = useState<VerseTimestamp[]>([]);
  const [timestampStatus, setTimestampStatus] = useState<"idle" | "loading" | "ready" | "missing">("idle");
  const [speed, setSpeed] = useState(1.0);
  const [error, setError] = useState<string | null>(null);
  const [resumePrompt, setResumePrompt] = useState(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [dirty, setDirty] = useState(false);
  const [volume, setVolume] = useState(1); // 0..1
  const [lastNonZeroVolume, setLastNonZeroVolume] = useState(1);
  const [autoplayEnabled, setAutoplayEnabled] = useState(false);
  const [autoAdvanceEnabled, setAutoAdvanceEnabled] = useState(true);

  // detect editing mode from query param (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("editTimestamps") === "1") setEditing(true);
    }
  }, [book, chapter]);

  // Load autoplay & auto-advance preferences
  useEffect(() => {
    try {
      setAutoplayEnabled(localStorage.getItem('dabible_audio_autoplay_v1') === 'true');
      const aa = localStorage.getItem('dabible_audio_auto_advance_v1');
      setAutoAdvanceEnabled(aa === null ? true : aa === 'true');
    } catch { /* ignore */ }
  }, [book, chapter]);

  const toggleAutoplayPref = () => {
    setAutoplayEnabled(prev => {
      const next = !prev; try { localStorage.setItem('dabible_audio_autoplay_v1', String(next)); } catch {}
      return next;
    });
  };

  const toggleAutoAdvancePref = () => {
    setAutoAdvanceEnabled(prev => {
      const next = !prev; try { localStorage.setItem('dabible_audio_auto_advance_v1', String(next)); } catch {}
      return next;
    });
  };

  const STORAGE_POS_KEY = `dabible_audio_pos_${book}_${chapter}`;
  const GLOBAL_SPEED_KEY = "dabible_audio_speed_v1"; // legacy global
  const STORAGE_SPEED_KEY = `dabible_audio_speed_${book}_${chapter}`; // per-chapter
  const STORAGE_VOL_KEY = "dabible_audio_volume_v1";

  useEffect(() => {
    let cancelled = false;
    setTimestampStatus("loading");
    setTimestamps([]);
    (async () => {
      const url = `/audio-timestamps/${book}/${book}_${String(chapter).padStart(3, "0")}.json`;
      try {
        const res = await fetch(url, { cache: "force-cache" });
        if (!res.ok) {
          if (!cancelled) setTimestampStatus("missing");
          return;
        }
        const data = await res.json();
        if (!cancelled && Array.isArray(data) && data.length) {
          setTimestamps(data);
          setTimestampStatus("ready");
        } else if (!cancelled) {
          setTimestampStatus("missing");
        }
      } catch {
        if (!cancelled) setTimestampStatus("missing");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [book, chapter]);

  // Load persisted speed & position
  useEffect(() => {
    try {
      // Prefer per-chapter, fallback to legacy global once, then write per-chapter
  // per-chapter speed fallback logic
      const rawPer = localStorage.getItem(STORAGE_SPEED_KEY);
      if (rawPer) {
        const s = parseFloat(rawPer);
        if (s >= 0.5 && s <= 2.0) { setSpeed(s); }
      } else {
        const rawGlobal = localStorage.getItem(GLOBAL_SPEED_KEY);
        if (rawGlobal) {
          const s = parseFloat(rawGlobal);
          if (s >= 0.5 && s <= 2.0) { setSpeed(s); try { localStorage.setItem(STORAGE_SPEED_KEY, String(s)); } catch {} }
        }
      }
      const rawVol = localStorage.getItem(STORAGE_VOL_KEY);
      if (rawVol) {
        const v = parseFloat(rawVol);
        if (v >= 0 && v <= 1) {
          setVolume(v);
          if (v > 0) setLastNonZeroVolume(v);
        }
      }
      const rawPos = localStorage.getItem(STORAGE_POS_KEY);
      if (rawPos) {
        const t = parseFloat(rawPos);
        if (t > 5) setResumePrompt(true);
      }
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book, chapter]);

  const applySpeed = useCallback((val: number) => {
    setSpeed(val);
    try {
      // Persist per-chapter speed
      localStorage.setItem(STORAGE_SPEED_KEY, String(val));
      // Also persist a global "last used" speed so new chapters without a chapter-specific value inherit it
      localStorage.setItem(GLOBAL_SPEED_KEY, String(val));
    } catch { /* ignore */ }
    if (audioRef.current) audioRef.current.playbackRate = val;
  }, [STORAGE_SPEED_KEY]);

  // Attach error listener
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onError = () => {
      setError("Audio unavailable");
    };
    el.addEventListener("error", onError);
    return () => {
      el.removeEventListener("error", onError);
    };
  }, [src]);

  // timeupdate handling & verse detection
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onTime = () => {
      setProgress(el.currentTime);
      setDuration(el.duration || 0);
      // persist position occasionally
      try {
        if (el.currentTime > 0) localStorage.setItem(STORAGE_POS_KEY, el.currentTime.toFixed(1));
      } catch {
        /* ignore */
      }
      if (timestamps.length) {
        // naive linear search (optimize later)
        let current = activeVerse;
        for (let i = 0; i < timestamps.length; i++) {
          const next = timestamps[i];
          const nextStart = next.time;
          const following = timestamps[i + 1];
          const nextEnd = following ? following.time : el.duration + 1;
          if (el.currentTime >= nextStart && el.currentTime < nextEnd) {
            current = next.verse;
            break;
          }
        }
        if (current !== activeVerse) {
          setActiveVerse(current || null);
          if (current && onActiveVerseChange) onActiveVerseChange(current);
        }
      }
    };
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onTime);
    // apply speed after metadata
    el.addEventListener("loadedmetadata", () => {
      el.playbackRate = speed;
    });
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onTime);
    };
    // STORAGE_POS_KEY intentionally stable (derived from current book/chapter) so not added
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timestamps, activeVerse, onActiveVerseChange, speed, book, chapter]);

  const dispatchState = (next: boolean) => {
    try {
      window.dispatchEvent(new CustomEvent("dabible:audioState", { detail: { playing: next } }));
    } catch {
      /* ignore */
    }
  };

  const togglePlay = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      el.play();
      setPlaying(true);
      dispatchState(true);
    } else {
      el.pause();
      setPlaying(false);
      dispatchState(false);
    }
  }, []);
  // Apply volume changes & persist
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = volume;
    try {
      localStorage.setItem(STORAGE_VOL_KEY, String(volume));
    } catch {
      /* ignore */
    }
  }, [volume]);

  const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (v > 0) setLastNonZeroVolume(v);
  };

  const toggleMute = () => {
    setVolume((prev) => (prev === 0 ? lastNonZeroVolume || 1 : 0));
  };
  // Listen for global toggle events (from unified preferences bar)
  useEffect(() => {
    const handler = () => {
      togglePlay();
    };
    window.addEventListener("dabible:toggleAudio", handler);
    return () => {
      window.removeEventListener("dabible:toggleAudio", handler);
    };
  }, [togglePlay]);

  // Fallback: if autoplay preference is enabled but external toggle dispatch was missed, try to start automatically.
  useEffect(() => {
    let cancelled = false;
    const attemptAutoplay = () => {
      if (cancelled) return;
      try {
        if (localStorage.getItem('dabible_audio_autoplay_v1') === 'true') {
          const el = audioRef.current;
          if (el && el.paused) {
            el.play().then(() => {
              if (!cancelled) {
                setPlaying(true);
                dispatchState(true);
              }
            }).catch(() => { /* ignore autoplay block */ });
          }
        }
      } catch { /* ignore */ }
    };
    // Try shortly after mount to allow metadata listener setup
    const t1 = setTimeout(attemptAutoplay, 120);
    // And a second retry (in case of slow network metadata delay)
    const t2 = setTimeout(attemptAutoplay, 600);
    return () => { cancelled = true; clearTimeout(t1); clearTimeout(t2); };
  }, [book, chapter]);

  // Emit state if playing changes due to other reasons (e.g., ended)
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onEnded = () => {
      setPlaying(false);
      dispatchState(false);
      // Emit explicit ended event so parent context can auto-advance chapters
      try {
        window.dispatchEvent(new CustomEvent('dabible:audioEnded', { detail: { book, chapter } }));
      } catch { /* ignore */ }
    };
    el.addEventListener("ended", onEnded);
    return () => {
      el.removeEventListener("ended", onEnded);
    };
  }, [book, chapter]);
  const pct = duration ? (progress / duration) * 100 : 0;

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = audioRef.current;
    if (!el) return;
    const val = parseFloat(e.target.value);
    el.currentTime = (val / 100) * duration;
  };

  function fmt(t: number) {
    if (!isFinite(t)) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  }

  const onSeekBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = audioRef.current;
    if (!el || !duration) return;
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    el.currentTime = Math.max(0, Math.min(duration * ratio, duration - 0.25));
  };

  const resumePlayback = () => {
    const el = audioRef.current;
    if (!el) return;
    try {
      const rawPos = localStorage.getItem(STORAGE_POS_KEY);
      if (rawPos) {
        const t = parseFloat(rawPos);
        if (isFinite(t) && t < el.duration - 5) {
          el.currentTime = t;
        }
      }
    } catch {
      /* ignore */
    }
    setResumePrompt(false);
  };

  if (!src) return null; // nothing to render if no path decided

  const verseTicks = (timestamps.length ? timestamps : verseCount ? Array.from({ length: verseCount }, (_, i) => ({ verse: i + 1, time: (duration / verseCount) * i })) : []).filter((t) => t.time < duration - 0.3);
  const completedCount = timestamps.length;
  const totalCount = verseCount || Math.max(verseTicks.length, timestamps.length);
  const completionPct = totalCount ? Math.min(100, Math.round((completedCount / totalCount) * 100)) : 0;

  const captureCurrent = (verse: number) => {
    const el = audioRef.current;
    if (!el) return;
    const time = parseFloat(el.currentTime.toFixed(2));
    setTimestamps((prev) => {
      const without = prev.filter((t) => t.verse !== verse);
      const next = [...without, { verse, time }].sort((a, b) => a.verse - b.verse);
      return next;
    });
    setDirty(true);
  };

  const deleteTimestamp = (verse: number) => {
    setTimestamps((prev) => prev.filter((t) => t.verse !== verse));
    setDirty(true);
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(timestamps, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${book}_${String(chapter).padStart(3, "0")}_timestamps.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    setDirty(false);
  };

  const sortByTime = () => {
    setTimestamps((prev) => [...prev].sort((a, b) => a.time - b.time));
    setDirty(true);
  };

  const importJson = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (Array.isArray(parsed)) {
          const clean = parsed.filter((x) => typeof x?.verse === "number" && typeof x?.time === "number");
          setTimestamps(clean.sort((a, b) => a.verse - b.verse));
          setDirty(true);
        }
      } catch {
        /* ignore */
      }
    };
    reader.readAsText(file);
  };

  const activeEditingList = editing ? (verseCount ? Array.from({ length: verseCount }, (_, i) => i + 1) : timestamps.map((t) => t.verse)) : [];

  return (
    <div className="flex p-1 items-center rounded-bl-md rounded-br-md bg-[#f0f8ff] dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs">
      <div className="flex flex-wrap items-center gap-4">
        {/* Autoplay indicators & toggles */}
        <div className="flex items-center gap-2">
          {autoplayEnabled && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-600 text-white">Auto Play On</span>
          )}
          <button
            type="button"
            onClick={toggleAutoplayPref}
            className={`text-[10px] px-2 py-0.5 rounded border ${autoplayEnabled ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400' : 'border-neutral-300 dark:border-neutral-600 text-neutral-600 dark:text-neutral-300'} hover:bg-neutral-100 dark:hover:bg-neutral-700`}
            aria-pressed={autoplayEnabled}
            aria-label="Toggle auto play preference"
          >
            {autoplayEnabled ? 'Disable Auto Play' : 'Enable Auto Play'}
          </button>
          {hasNext && (
            <button
              type="button"
              onClick={toggleAutoAdvancePref}
              className={`text-[10px] px-2 py-0.5 rounded border ${autoAdvanceEnabled ? 'border-blue-600 text-blue-700 dark:text-blue-400' : 'border-neutral-300 dark:border-neutral-600 text-neutral-600 dark:text-neutral-300'} hover:bg-neutral-100 dark:hover:bg-neutral-700`}
              aria-pressed={autoAdvanceEnabled}
              aria-label="Toggle auto advance to next chapter"
            >
              {autoAdvanceEnabled ? 'Auto-Advance On' : 'Auto-Advance Off'}
            </button>
          )}
          {/* Help / tooltip */}
          <div className="relative group">
            <button
              type="button"
              aria-label="Explain Auto Play vs Auto-Advance"
              className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <HelpCircle className="w-4 h-4" aria-hidden="true" />
            </button>
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-opacity duration-150 absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 z-50 p-2 rounded-md shadow-lg text-[11px] bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
              <p className="mb-1"><strong>Auto Play</strong>: Automatically starts the chapter audio when you arrive on a chapter (until you turn it off or it times out after inactivity).</p>
              <p className="mb-0"><strong>Auto-Advance</strong>: After a chapter finishes playing it navigates to the next chapter. Shown only when a next chapter exists. It does not start playback by itself.</p>
            </div>
          </div>
        </div>
        {/* {showInlineControls && (
          <button onClick={togglePlay} className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-500" aria-label={playing ? 'Pause audio' : 'Play audio'}>
            {playing ? 'Pause' : 'Play'}
          </button>
        )} */}

        <div className="hidden md:flex items-center">
        {activeVerse && <span className="text-[10px] italic">Verse {activeVerse}</span>}
        </div>

        {/* SPEED CONTROLS */}
        
        <div className="hidden md:flex items-center">
          <label htmlFor={`speed-${book}-${chapter}`} className="">
            <Clock10 className="w-4 h-4" aria-hidden="true" /> 
            <span className="sr-only">Speed:</span>
          </label>
          <select id={`speed-${book}-${chapter}`} value={speed} onChange={(e) => applySpeed(parseFloat(e.target.value))} className="border-0 border-neutral-300 dark:border-neutral-600 rounded px-1 py-0.5 bg-transparent dark:bg-neutral-700">
            {[0.75, 1.0, 1.25, 1.5, 1.75, 2.0].map((s) => (
              <option key={s} value={s}>
                {s}x
              </option>
            ))}
          </select>
        </div>

        {/* VOLUME CONTROLS */}
        <div className="hidden md:flex items-center gap-1 ml-2 w-28">
          <button type="button" onClick={toggleMute} aria-label={volume === 0 ? "Unmute audio" : "Mute audio"} className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
            {volume === 0 ? <VolumeX className="w-4 h-4" aria-hidden="true" /> : <Volume2 className="w-4 h-4" aria-hidden="true" />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={onVolumeChange}
            aria-label="Volume"
            className="flex h-1.5 cursor-pointer appearance-none rounded bg-neutral-300 dark:bg-neutral-600 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:cursor-pointer w-full"
          />
        </div>

        {/* SYNC STATUS */}
        <div className="hidden md:flex">
        <span className="ml-auto text-[10px] text-neutral-500 dark:text-neutral-400">
          {timestampStatus === "ready" && `Sync: ${completionPct}%`}
          {timestampStatus === "missing" && "Sync: none"}
          {timestampStatus === "loading" && "Sync: …"}
        </span>
        </div>
        
      </div>

      <div className="flex items-center md:ml-8 text-neutral-600 dark:text-neutral-300">
        <span>{fmt(progress)}</span>
      </div>

      <div className="flex-1 items-center align-center mx-1 ">
        <div className="relative hidden group cursor-pointer select-none" onClick={onSeekBarClick} aria-label="Seek audio" role="slider" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-2 rounded bg-neutral-300 dark:bg-neutral-600 overflow-hidden">
            <div className="h-full bg-blue-600" style={{ width: `${pct}%` }} />
          </div>
          <div className="absolute inset-0 pointer-events-none">
            {verseTicks.map((t) => {
              const left = duration ? (t.time / duration) * 100 : 0;
              const isActive = activeVerse === t.verse;
              return <div key={t.verse} className={`absolute top-0 h-2 w-[1px] ${isActive ? "bg-orange-500" : "bg-white/70 dark:bg-black/50"} transition-colors`} style={{ left: `${left}%` }} />;
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="range"
            min={0}
            max={100}
            value={pct}
            onChange={seek}
            aria-label="Seek audio"
            className="flex-1 h-1.5 rounded bg-neutral-300 dark:bg-neutral-600 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-blue-600"
          />
          {resumePrompt && !playing && !error && (
            <button onClick={resumePlayback} className="text-[10px] underline" type="button">
              Resume
            </button>
          )}
        </div>
        {error && (
          <div className="mt-2 text-[11px] text-red-600 dark:text-red-400">
            {error} –{" "}
            <button
              onClick={() => {
                setError(null);
                audioRef.current?.load();
              }}
              className="underline"
            >
              Retry
            </button>
          </div>
        )}
        <audio ref={audioRef} src={src || undefined} preload="none" />
      </div>

      <div className="flex items-center gap-1 text-neutral-600 dark:text-neutral-300">
        <span>{fmt(duration)}</span>
      </div>

      {editing && (
        <div className="mt-4 border-t pt-3 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold">Timestamp Editor</span>
            <button onClick={exportJson} className="px-2 py-0.5 rounded bg-emerald-600 text-white hover:bg-emerald-500">
              Export JSON{dirty && "*"}
            </button>
            <button onClick={sortByTime} className="px-2 py-0.5 rounded bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-600 hover:text-white">
              Sort by Time
            </button>
            <label className="text-[11px] cursor-pointer">
              Import
              <input
                type="file"
                accept="application/json"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) importJson(f);
                }}
              />
            </label>
            <span className="text-[10px] text-neutral-500">
              {completedCount}/{totalCount} verses
            </span>
          </div>
          <div className="max-h-60 overflow-auto pr-1">
            <table className="w-full text-[11px] border-collapse">
              <thead>
                <tr className="text-left sticky top-0 bg-neutral-200 dark:bg-neutral-700">
                  <th className="px-1 py-0.5">Verse</th>
                  <th className="px-1 py-0.5">Time (s)</th>
                  <th className="px-1 py-0.5">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeEditingList.map((v) => {
                  const existing = timestamps.find((t) => t.verse === v);
                  return (
                    <tr key={v} className="odd:bg-neutral-50 dark:odd:bg-neutral-800">
                      <td className="px-1 py-0.5 font-medium">{v}</td>
                      <td className="px-1 py-0.5">{existing ? existing.time.toFixed(2) : "—"}</td>
                      <td className="px-1 py-0.5 flex gap-1">
                        <button onClick={() => captureCurrent(v)} className="px-1 rounded bg-blue-500 text-white hover:bg-blue-400">
                          Set
                        </button>
                        {existing && (
                          <button onClick={() => deleteTimestamp(v)} className="px-1 rounded bg-red-600 text-white hover:bg-red-500" aria-label="Delete timestamp">
                            Del
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-neutral-500 leading-snug">
            Use Play then Set at each verse start. Export and replace file under{" "}
            <code>
              public/audio-timestamps/{book}/{book}_{String(chapter).padStart(3, "0")}.json
            </code>
            .
          </p>
        </div>
      )}
    </div>
  );
}
