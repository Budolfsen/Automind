import { decode, encode } from 'jpeg-js'

const previewWidths = [288, 512] as const

type DecodedImage = {
  width: number
  height: number
  data: Uint8Array
}

export type InvitationVariant = {
  width: number
  height: number
  body: Uint8Array
}

const decodedCache = new Map<string, Promise<DecodedImage | null>>()

function resizeRgba(source: Uint8Array, sourceWidth: number, sourceHeight: number, width: number, height: number) {
  const output = new Uint8Array(width * height * 4)
  for (let y = 0; y < height; y++) {
    const startY = Math.floor((y * sourceHeight) / height)
    const endY = Math.max(startY + 1, Math.min(sourceHeight, Math.floor(((y + 1) * sourceHeight) / height)))
    for (let x = 0; x < width; x++) {
      const startX = Math.floor((x * sourceWidth) / width)
      const endX = Math.max(startX + 1, Math.min(sourceWidth, Math.floor(((x + 1) * sourceWidth) / width)))
      let red = 0
      let green = 0
      let blue = 0
      let alpha = 0
      let count = 0
      for (let sourceY = startY; sourceY < endY; sourceY++) {
        for (let sourceX = startX; sourceX < endX; sourceX++) {
          const index = (sourceY * sourceWidth + sourceX) * 4
          red += source[index] ?? 0
          green += source[index + 1] ?? 0
          blue += source[index + 2] ?? 0
          alpha += source[index + 3] ?? 0
          count += 1
        }
      }
      const outputIndex = (y * width + x) * 4
      output[outputIndex] = Math.round(red / count)
      output[outputIndex + 1] = Math.round(green / count)
      output[outputIndex + 2] = Math.round(blue / count)
      output[outputIndex + 3] = Math.round(alpha / count)
    }
  }
  return output
}

async function loadDecoded(url: string) {
  const cached = decodedCache.get(url)
  if (cached) return cached

  const pending = fetch(url).then(async (response) => {
    if (!response.ok) return null
    const bytes = new Uint8Array(await response.arrayBuffer())
    if (bytes[0] !== 0xff || bytes[1] !== 0xd8) return null
    const decoded = decode(bytes, { useTArray: true, formatAsRGBA: true, maxResolutionInMP: 24 })
    return { width: decoded.width, height: decoded.height, data: decoded.data }
  })
  decodedCache.set(url, pending)
  return pending
}

export function invitationWidths() {
  return previewWidths
}

export async function invitationVariant(url: string, width: number): Promise<InvitationVariant | null> {
  const decoded = await loadDecoded(url)
  if (!decoded) return null
  const targetWidth = Math.min(width, decoded.width)
  const targetHeight = Math.max(1, Math.round((decoded.height * targetWidth) / decoded.width))
  const data =
    targetWidth === decoded.width
      ? decoded.data
      : resizeRgba(decoded.data, decoded.width, decoded.height, targetWidth, targetHeight)
  const encoded = encode({ data, width: targetWidth, height: targetHeight }, 55)
  return { width: targetWidth, height: targetHeight, body: new Uint8Array(encoded.data) }
}
