import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import assert from 'node:assert/strict'
const source = readFileSync(new URL('../app/utils/google-consent.js', import.meta.url), 'utf8')
function setup(saved, blocked = false) {
  const scripts = []
  const cookies = []
  let reloads = 0
  const store = new Map(saved ? [['portfolio-analytics-consent-v1', JSON.stringify(saved)]] : [])
  const context = {
    window: {},
    document: {
      get cookie() { return '_ga=old; _ga_E4XF1JFR2H=old; essential=keep' },
      set cookie(value) { cookies.push(value) },
      createElement() { return {} },
      head: { appendChild(script) { scripts.push(script) } }
    },
    location: { hostname: 'waqarulzafar.com', reload() { reloads++ } },
    localStorage: {
      getItem(key) { if (blocked) throw Error('blocked'); return store.get(key) ?? null },
      setItem(key, value) { if (blocked) throw Error('blocked'); store.set(key, value) }
    }
  }
  runInNewContext(source, context)
  return { ...context, scripts, cookies, store, reloads: () => reloads }
}
const first = setup()
assert.equal(first.scripts.length, 0)
assert.equal(first.window.dataLayer[0][1], 'default')
assert.equal(first.window.dataLayer[0][2].analytics_storage, 'denied')
first.window.portfolioAnalytics.choose('accepted')
assert.equal(first.scripts.length, 1)
const events = first.window.dataLayer
assert.equal(events[1][1], 'update')
assert.equal(events[1][2].analytics_storage, 'granted')
for (const key of ['ad_storage', 'ad_user_data', 'ad_personalization']) assert.equal(events[1][2][key], 'denied')
assert.equal(events[3][0], 'config')
first.window.portfolioAnalytics.choose('accepted')
assert.equal(first.scripts.length, 1)
first.window.portfolioAnalytics.choose('rejected')
assert.equal(first.window['ga-disable-G-E4XF1JFR2H'], true)
assert.equal(first.reloads(), 1)
assert.ok(first.cookies.every(cookie => !cookie.startsWith('essential=')))
assert.equal(JSON.parse(first.store.get('portfolio-analytics-consent-v1')).value, 'rejected')
for (const value of ['accepted', 'rejected']) {
  const restored = setup({ value, at: Date.now() })
  assert.equal(restored.window.portfolioAnalytics.getChoice(), value)
  assert.equal(restored.scripts.length, value === 'accepted' ? 1 : 0)
}
const expired = setup({ value: 'accepted', at: Date.now() - 181 * 86400000 })
assert.equal(expired.scripts.length, 0)
assert.equal(expired.window.portfolioAnalytics.getChoice(), null)
const blocked = setup(null, true)
blocked.window.portfolioAnalytics.choose('rejected')
assert.equal(blocked.scripts.length, 0)
blocked.window.portfolioAnalytics.choose('accepted')
assert.equal(blocked.scripts.length, 1)
console.log('Consent checks passed: default denied, accept, reject, restore, expiry, withdrawal, blocked storage, no duplicate loader, advertising denied.')
