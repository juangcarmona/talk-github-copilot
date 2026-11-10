import { goatcounter } from './course.mjs'

const escape = text => String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

const moduleCard = m => `
        <li class="module" id="module-${m.id}">
          <article aria-labelledby="title-${m.id}">
            <p class="module-id" aria-hidden="true">${m.id}</p>
            <h3 id="title-${m.id}"><span class="visually-hidden">Module ${m.id}: </span>${escape(m.title)}</h3>
            <p class="covers">${escape(m.covers)}</p>
            <dl class="meta">
              <div><dt>Audience</dt><dd>${escape(m.audience)}</dd></div>
              <div><dt>Time</dt><dd>${escape(m.time)}</dd></div>
            </dl>
            <p class="actions">
              <a class="button primary" href="/${m.id}/">Slides<span class="visually-hidden"> for module ${m.id}</span></a>${m.lab ? `
              <a class="button" href="${escape(m.lab)}">Lab<span class="visually-hidden"> for module ${m.id} on GitHub</span></a>` : ''}
            </p>
          </article>
        </li>`

export function renderLanding(course) {
  const levels = course.levels.map(level => `
    <section class="level" aria-labelledby="level-${level.id}">
      <header class="level-header">
        <h2 id="level-${level.id}"><span class="level-number">${level.id}</span> ${escape(level.name)}</h2>
        <p>${escape(level.summary)}</p>
      </header>
      <ol class="modules" role="list">${course.modules.filter(m => m.level === level.id).map(moduleCard).join('')}
      </ol>
    </section>`).join('\n')

  const cert = course.certification
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escape(course.title)}</title>
    <meta name="description" content="${escape(course.intro)}">
    <meta name="color-scheme" content="light dark">
    <link rel="stylesheet" href="/styles.css">
    ${goatcounter}
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to the modules</a>
    <header class="hero">
      <div class="wrap">
        <p class="eyebrow">Course · ${course.modules.length} modules</p>
        <h1>${escape(course.title)}</h1>
        <p class="intro">${escape(course.intro)}</p>
        <nav aria-label="Levels">
          <ul class="level-nav" role="list">${course.levels.map(l => `
            <li><a href="#level-${l.id}">${l.id} ${escape(l.name)}</a></li>`).join('')}
            <li><a href="#certification">Certification</a></li>
          </ul>
        </nav>
      </div>
    </header>
    <main id="main" class="wrap">
${levels}

    <section class="level certification" id="certification" aria-labelledby="certification-title">
      <header class="level-header">
        <h2 id="certification-title"><span class="level-number" aria-hidden="true">✓</span> Final step</h2>
      </header>
      <article class="module cert-card">
        <h3>${escape(cert.title)}</h3>
        <p class="covers">${escape(cert.text)}</p>
        <p class="actions"><a class="button primary" href="${escape(cert.url)}">Go to the certification<span class="visually-hidden"> on Microsoft Learn</span></a></p>
      </article>
    </section>
    </main>
    <footer class="wrap footer">
      <p>Created by <a href="https://jgcarmona.com/">Juan G. Carmona</a>. Slides built with <a href="https://sli.dev/">Slidev</a>.</p>
    </footer>
  </body>
</html>
`
}
