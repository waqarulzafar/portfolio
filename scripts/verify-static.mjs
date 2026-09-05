import { readFileSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { resolve } from 'node:path'

const output = resolve('.output/public')
const html = readFileSync(resolve(output, 'index.html'), 'utf8')
const assets = [...new Set([...html.matchAll(/(?:src|href)="(\/(?:images|_nuxt)\/[^"?#]+)(?:[?#][^"]*)?"/g)].map(match => match[1]))]
const tracked = new Set(execFileSync('git', ['ls-files', '-z', 'public/images'], { encoding: 'utf8' }).split('\0'))
const errors = []
for (const asset of assets) {
  if (!existsSync(resolve(output, `.${asset}`))) errors.push(`Missing generated asset: ${asset}`)
  if (asset.startsWith('/images/') && !tracked.has(`public${asset}`)) {
    errors.push(`Image is not included in Git: public${asset}. Add it before deploying from the repository.`)
  }
}
if (!/<body[^>]*><!--email_off-->/.test(html) || !html.includes('<!--/email_off--></body>')) {
  errors.push('Generated HTML is missing Cloudflare email-obfuscation protection.')
}
if (errors.length) throw new Error(errors.join('\n'))
console.log(`Static deployment verified: ${assets.length} local assets and Cloudflare markup protection.`)
