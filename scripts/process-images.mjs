// Downloads BLEND's own public photos (see ASSETS.md for sources and reuse status),
// applies one consistent warm-monochrome treatment, and writes responsive WebP/AVIF
// files to public/img plus a size/placeholder manifest for the app.
// Usage: node scripts/process-images.mjs   (originals are cached in .cache/originals)
import { mkdir, writeFile, access } from 'node:fs/promises'
import sharp from 'sharp'

const SITE = 'https://87f6572a2ecef4e68947.cdn6.editmysite.com/uploads/b/87f6572a2ecef4e689475df030cb7a1eb1bf6a28183859818801345b8366c3bf/'
const GALLERY = (n, stamp, ext = 'jpg') =>
  `${SITE}Blend_Barbershop_MGS_MENS_GROOMING_AND_SPA_321_GROVE_ST_JERSEY_CITY_NJ_07302_HAIRCUT_FADE_BEARDTRIM${n}_${stamp}.${ext}`
const STAFF = (id) => `https://appointments-production-f.squarecdn.com/files/${id}/original.jpeg`

// id -> [source URL, output widths, extra options]
const images = {
  'hero-portrait': [GALLERY(23, 1768691274, 'JPG'), [480, 828, 1170], { avif: true }],
  'hero-wall': [GALLERY(280, 1768691296), [960, 1600, 2400], { avif: true }],
  'craft-clipper': [GALLERY(169, 1768691288), [640, 1200]],
  'craft-lineup': [GALLERY(68, 1768691297), [480, 900]],
  'room-kid': [GALLERY(257, 1768691288), [480, 900]],
  'room-chairs': [GALLERY(80, 1768691246, 'JPG'), [480, 900], { color: true }],
  'series-cast': [`${SITE}IMG_2401_1778374744.jpeg`, [480, 900], { color: true }],
  'logo': [`${SITE}12.15.2025_693f71da22b902.05285733.jpeg`, [800], { logo: true }],
  'barber-adam': [STAFF('461ddf259d445f10b738dc826442f66a'), [400, 720, 1080]],
  'barber-wander': [STAFF('98c91c1ed80b994b2e20456f70724bdd'), [400, 720, 893]],
  'barber-eddie': [STAFF('b39c8b5770d6f16a7b5b0d8edc76065d'), [400, 720, 1080]],
  'barber-eric': [STAFF('c0b6376e4bbd19df50bef5dd773e6677'), [400, 720, 1080]],
  'barber-jonas': [STAFF('c61345670a85a682ad73bfb83b89033f'), [400, 720, 828]],
  'barber-danny': [STAFF('6caf44bbf33f30e0507e6c983bcbf625'), [400, 720, 954]],
}
const gallery = [
  [68, 1768691297], [28, 1768691255, 'JPG'], [61, 1768691290], [126, 1768691282], [49, 1768691293],
  [2, 1768691259, 'JPG'], [239, 1768691291], [21, 1768691285, 'JPG'], [5, 1768691265, 'JPG'], [210, 1768691299],
  [266, 1768691284], [246, 1768691280], [18, 1768691256, 'JPG'], [71, 1768691294], [262, 1768691251, 'JPG'],
  [231, 1768691297], [122, 1768691257], [3, 1768691303, 'JPG'], [228, 1768691293], [283, 1768691281],
  [119, 1768691262], [251, 1768691275], [140, 1768691296], [29, 1768691275],
]
for (const [n, stamp, ext] of gallery) images[`work-${n}`] = [GALLERY(n, stamp, ext), [360, 640, 1000]]

await mkdir('.cache/originals', { recursive: true })
await mkdir('public/img', { recursive: true })
const manifest = {}

for (const [id, [url, widths, opts = {}]] of Object.entries(images)) {
  const cached = `.cache/originals/${id}`
  try { await access(cached) } catch {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`${res.status} ${url}`)
    await writeFile(cached, Buffer.from(await res.arrayBuffer()))
  }
  let base = sharp(cached).rotate()
  if (opts.logo) {
    // Black wordmark on white -> white-on-transparent alpha mask, recolourable with CSS mask-image.
    const { data, info } = await base.grayscale().trim({ threshold: 10 }).raw().toBuffer({ resolveWithObject: true })
    const rgba = Buffer.alloc(info.width * info.height * 4, 255)
    for (let i = 0; i < info.width * info.height; i++) rgba[i * 4 + 3] = 255 - data[i * info.channels]
    base = sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } }).png()
  } else if (!opts.color) {
    base = base.grayscale().tint({ r: 238, g: 226, b: 208 })
  } else {
    base = base.modulate({ saturation: 0.55 })
  }
  const buf = await base.toBuffer()
  const meta = await sharp(buf).metadata()
  for (const w of widths) {
    const resized = sharp(buf).resize({ width: Math.min(w, meta.width) })
    await resized.clone().webp({ quality: opts.logo ? 90 : 72 }).toFile(`public/img/${id}-${w}.webp`)
    if (opts.avif) await resized.clone().avif({ quality: 52 }).toFile(`public/img/${id}-${w}.avif`)
  }
  const lqip = opts.logo ? '' : `data:image/webp;base64,${(await sharp(buf).resize(16).webp({ quality: 40 }).toBuffer()).toString('base64')}`
  manifest[id] = { w: meta.width, h: meta.height, widths, avif: !!opts.avif, lqip }
  console.log(id, meta.width, meta.height)
}
await writeFile('src/data/image-manifest.json', JSON.stringify(manifest) + '\n')
