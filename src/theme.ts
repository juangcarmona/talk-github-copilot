// Appearance, as on jgcarmona.com: the preference lives in localStorage ('lh-theme'), never in a cookie.
// web/theme-init.js applies it before first paint; this module changes it afterwards.
export type Preference = 'light' | 'dark' | 'system'

const root = document.documentElement
const media = matchMedia('(prefers-color-scheme: dark)')

export function currentPreference(): Preference {
  return (root.getAttribute('data-lh-theme') as Preference) || 'system'
}

export function applyTheme(preference: Preference, store = false) {
  const dark = preference === 'dark' || (preference === 'system' && media.matches)
  if (store) try { localStorage.setItem('lh-theme', preference) } catch { /* private mode */ }
  root.setAttribute('data-lh-theme', preference)
  root.setAttribute('data-theme', dark ? 'dark' : 'light')
  dispatchEvent(new CustomEvent('theme:changed', { detail: { theme: dark ? 'dark' : 'light' } }))
}

media.addEventListener('change', () => { if (currentPreference() === 'system') applyTheme('system') })
// Another tab (the landing page or another deck) changed the appearance.
addEventListener('storage', event => { if (event.key === 'lh-theme') applyTheme((event.newValue as Preference) || 'system') })
