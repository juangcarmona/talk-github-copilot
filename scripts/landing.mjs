// Renders the course landing page and the header and footer it shares with the 404 page.
// The markup follows jgcarmona.com: the same header, footer, eyebrows, title rule and square components.

const escape = text => String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

const SITE = 'https://jgcarmona.com'
const NAV = [
  { href: '/', label: 'Course', key: 'course' },
  { href: `${SITE}/blog/`, label: 'Writing' },
  { href: `${SITE}/talks/`, label: 'Speaking' },
  { href: `${SITE}/projects/`, label: 'Projects' },
  { href: `${SITE}/about/`, label: 'About' },
]

const themeSwitch = `<div class="theme-switch" role="group" aria-label="Appearance">
          <button type="button" data-theme-option="light" aria-label="Light" aria-pressed="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path></svg></button>
          <button type="button" data-theme-option="dark" aria-label="Dark" aria-pressed="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"></path></svg></button>
          <button type="button" data-theme-option="system" aria-label="System" aria-pressed="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="4" width="18" height="12"></rect><path d="M8 20h8M12 16v4"></path></svg></button>
        </div>`

export function renderHeader(current) {
  return `<header class="site-header">
      <div class="frame">
        <a class="brand" href="${SITE}/">Juan G. Carmona</a>
        <button type="button" class="menu-toggle" aria-expanded="false" aria-controls="site-nav"><span>Menu</span></button>
        <nav class="site-nav" id="site-nav" aria-label="Main">
          ${NAV.map(item => `<a href="${item.href}"${item.key && item.key === current ? ' aria-current="page"' : ''}>${item.label}</a>`).join('\n          ')}
        </nav>
        ${themeSwitch}
      </div>
    </header>`
}

export function renderFooter() {
  const profiles = [
    ['LinkedIn', 'https://www.linkedin.com/in/juangcarmona'],
    ['GitHub', 'https://github.com/juangcarmona'],
    ['YouTube', 'https://www.youtube.com/@juangcarmona'],
    ['Sessionize', 'https://sessionize.com/juangcarmona'],
  ]
  return `<footer class="site-footer">
      <div>
        <ul class="inline-list" aria-label="Profiles">
          ${profiles.map(([name, url]) => `<li><a href="${url}" rel="me">${name}</a></li>`).join('\n          ')}
          <li><a href="${SITE}/privacy/">Privacy · no cookies</a></li>
        </ul>
        <p>© ${new Date().getFullYear()} Juan G. Carmona · <a href="${SITE}/">jgcarmona.com</a></p>
      </div>
    </footer>`
}

export function renderLandingHead(course) {
  return `<title>${escape(course.title)} · ${escape(course.author.name)}</title>
    <meta name="description" content="${escape(course.intro)}">
    <meta name="author" content="${escape(course.author.name)}">
    <link rel="canonical" href="https://github-copilot.jgcarmona.com/">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${escape(course.title)}">
    <meta property="og:description" content="${escape(course.intro)}">`
}

const moduleCard = (m, slides) => `
          <li class="module" id="module-${m.id}">
            <article aria-labelledby="title-${m.id}">
              <p class="module-id" aria-hidden="true">${m.id}</p>
              <h3 id="title-${m.id}"><span class="visually-hidden">Module ${m.id}: </span>${escape(m.title)}</h3>
              <p class="covers">${escape(m.covers)}</p>
              <dl class="module-meta">
                <div><dt>Audience</dt><dd>${escape(m.audience)}</dd></div>
                <div><dt>Time</dt><dd>${escape(m.time)}</dd></div>${slides ? `
                <div><dt>Slides</dt><dd>${slides}</dd></div>` : ''}
              </dl>
              <p class="module-actions">
                <a class="lh-button" href="/${m.id}/">Slides<span class="visually-hidden"> for module ${m.id}</span></a>${m.lab ? `
                <a class="lh-button" data-variant="secondary" href="${escape(m.lab)}">Lab<span class="visually-hidden"> for module ${m.id} on GitHub</span></a>` : ''}
              </p>
            </article>
          </li>`

export function renderLanding(course, slideCounts = {}) {
  const labs = course.modules.filter(m => m.lab).length
  const levels = course.levels.map(level => {
    const modules = course.modules.filter(m => m.level === level.id)
    return `
      <section class="frame level" id="level-${level.id}" aria-labelledby="level-${level.id}-title">
        <header class="section-head">
          <p class="eyebrow">Level ${level.id}</p>
          <h2 id="level-${level.id}-title">${escape(level.name)}</h2>
          <p>${escape(level.summary)}</p>
        </header>
        <ol class="modules${modules.length === 1 ? ' single' : ''}" role="list">${modules.map(m => moduleCard(m, slideCounts[m.id])).join('')}
        </ol>
      </section>`
  }).join('\n')

  const cert = course.certification
  const author = course.author
  return `<main id="main">
      <section class="frame course-hero">
        <div>
          <p class="eyebrow">Course · ${course.modules.length} modules · ${labs} labs</p>
          <h1 class="name">${escape(course.title)}</h1>
          <p class="intro">${escape(course.intro)}</p>
          <p class="actions">
            <a class="lh-button" href="/${course.modules[0].id}/">Start with module ${course.modules[0].id}</a>
            <a class="arrow" href="#certification">Get certified</a>
          </p>
        </div>
        <figure class="photo">
          <img src="/src/assets/portrait.jpg" alt="Portrait of ${escape(author.name)}" width="1200" height="1200">
          <figcaption>Your instructor · ${escape(author.name)}</figcaption>
        </figure>
      </section>

      <nav class="frame jump" aria-label="Levels">
        <ul role="list">${course.levels.map(l => `
          <li><a href="#level-${l.id}"><span>${l.id}</span> ${escape(l.name)}</a></li>`).join('')}
          <li><a href="#certification"><span>✓</span> Certification</a></li>
        </ul>
      </nav>
${levels}

      <section class="frame level final" id="certification" aria-labelledby="certification-title">
        <header class="section-head">
          <p class="eyebrow">Final step</p>
          <h2 id="certification-title">Get certified</h2>
        </header>
        <ol class="modules single" role="list">
          <li class="module cert">
            <article aria-labelledby="cert-title">
              <p class="module-id" aria-hidden="true">✓</p>
              <h3 id="cert-title">${escape(cert.title)}</h3>
              <p class="covers">${escape(cert.text)}</p>
              <p class="module-actions"><a class="lh-button" href="${escape(cert.url)}">Go to the certification<span class="visually-hidden"> on Microsoft Learn</span></a></p>
            </article>
          </li>
        </ol>
      </section>

      <section class="frame instructor" id="instructor" aria-labelledby="instructor-title">
        <header class="section-head">
          <p class="eyebrow">Your instructor</p>
          <h2 id="instructor-title">${escape(author.name)}</h2>
        </header>
        <p class="headline">${escape(author.headline)}</p>
        <p class="intro">${escape(author.description)}</p>
        <ul class="record-links" role="list">${author.profiles.map(p => `
          <li><a href="${escape(p.url)}" rel="me">${escape(p.name)}</a></li>`).join('')}
        </ul>
      </section>
    </main>`
}
