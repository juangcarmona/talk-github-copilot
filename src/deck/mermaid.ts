// Mermaid is loaded only on slides that contain a diagram, and drawn with the Lighthouse tokens.
const cache = new Map<string, string>()
let counter = 0

function token(name: string) {
  return getComputedStyle(document.body).getPropertyValue(name).trim()
}

export async function renderMermaid(container: HTMLElement) {
  const blocks = [...container.querySelectorAll<HTMLElement>('[data-mermaid]')]
  if (!blocks.length) return
  const { default: mermaid } = await import('mermaid')
  const theme = document.documentElement.dataset.theme ?? 'light'
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: 'base',
    fontFamily: token('--lh-font-sans'),
    themeVariables: {
      darkMode: theme === 'dark',
      background: token('--lh-surface'),
      primaryColor: token('--lh-surface'),
      primaryBorderColor: token('--lh-action'),
      primaryTextColor: token('--lh-text'),
      secondaryColor: token('--lh-action-soft'),
      tertiaryColor: token('--lh-surface-muted'),
      lineColor: token('--lh-text-muted'),
      textColor: token('--lh-text'),
      mainBkg: token('--lh-surface'),
      nodeBorder: token('--lh-action'),
      clusterBkg: token('--lh-canvas'),
      clusterBorder: token('--lh-border-strong'),
      edgeLabelBackground: token('--lh-surface'),
      fontSize: '14px',
    },
    flowchart: { curve: 'linear', htmlLabels: true },
  })
  for (const block of blocks) {
    const source = block.dataset.source ?? block.textContent ?? ''
    block.dataset.source = source
    const key = `${theme}\n${source}`
    if (!cache.has(key)) {
      try {
        cache.set(key, (await mermaid.render(`mermaid-${++counter}`, source)).svg)
      } catch {
        cache.set(key, `<pre class="mermaid-error">${source.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]!)}</pre>`)
      }
    }
    block.innerHTML = cache.get(key)!
    block.dataset.rendered = theme
  }
}
