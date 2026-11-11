// Applies the stored appearance before first paint, as on jgcarmona.com. Preference lives in localStorage, never in a cookie.
(function () {
  var root = document.documentElement
  var preference = 'system'
  try { preference = localStorage.getItem('lh-theme') || 'system' } catch (e) {}
  var dark = preference === 'dark' || (preference === 'system' && matchMedia('(prefers-color-scheme: dark)').matches)
  root.setAttribute('data-lh-theme', preference)
  root.setAttribute('data-theme', dark ? 'dark' : 'light')
})()
