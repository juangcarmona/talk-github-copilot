// The landing page is static HTML; this adds the appearance switch and the narrow-screen menu.
import { applyTheme, currentPreference, type Preference } from './theme'

const buttons = document.querySelectorAll<HTMLButtonElement>('[data-theme-option]')
const sync = () => buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.themeOption === currentPreference())))
buttons.forEach(button => button.addEventListener('click', () => { applyTheme(button.dataset.themeOption as Preference, true); sync() }))
addEventListener('theme:changed', sync)
sync()

const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle')
toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true'
  toggle.setAttribute('aria-expanded', String(open))
  toggle.closest('.site-header')?.toggleAttribute('data-open', open)
})
