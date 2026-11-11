import { useEffect, useState } from 'react'
import { applyTheme, currentPreference, type Preference } from '../theme'

const options: { value: Preference; label: string; icon: React.ReactNode }[] = [
  { value: 'light', label: 'Light', icon: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></> },
  { value: 'dark', label: 'Dark', icon: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" /> },
  { value: 'system', label: 'System', icon: <><rect x="3" y="4" width="18" height="12" /><path d="M8 20h8M12 16v4" /></> },
]

/** The jgcarmona.com appearance control: Light, Dark or System, stored in localStorage as lh-theme. */
export function ThemeSwitch() {
  const [preference, setPreference] = useState(currentPreference)
  useEffect(() => {
    const sync = () => setPreference(currentPreference())
    addEventListener('theme:changed', sync)
    return () => removeEventListener('theme:changed', sync)
  }, [])
  return <div className="theme-switch" role="group" aria-label="Appearance">
    {options.map(o => <button key={o.value} type="button" aria-label={o.label} aria-pressed={preference === o.value} onClick={() => applyTheme(o.value, true)}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">{o.icon}</svg>
    </button>)}
  </div>
}
