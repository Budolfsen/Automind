import { createImageUrlBuilder, type SanityImageObject } from '@sanity/image-url'
import { sanityClient } from './sanity'
import type { Figure, ImageCrop, ImageHotspot } from './types'

const builder = createImageUrlBuilder(sanityClient)

type FramedImage = Pick<Figure, 'asset' | 'crop' | 'hotspot'>

export function croppedSize(width: number, height: number, crop?: ImageCrop | null) {
  const left = crop?.left ?? 0
  const right = crop?.right ?? 0
  const top = crop?.top ?? 0
  const bottom = crop?.bottom ?? 0
  return {
    width: Math.max(1, Math.round(width * (1 - left - right))),
    height: Math.max(1, Math.round(height * (1 - top - bottom))),
  }
}

export function objectPosition(crop?: ImageCrop | null, hotspot?: ImageHotspot | null) {
  if (!hotspot) return undefined
  const left = crop?.left ?? 0
  const top = crop?.top ?? 0
  const width = 1 - left - (crop?.right ?? 0)
  const height = 1 - top - (crop?.bottom ?? 0)
  if (width <= 0 || height <= 0) return undefined
  const x = clamp(((hotspot.x - left) / width) * 100)
  const y = clamp(((hotspot.y - top) / height) * 100)
  return `${x}% ${y}%`
}

export function imageSrc(image: FramedImage, width: number, ratio?: number) {
  const source = imageSource(image)
  const framed = builder.image(source).width(width).auto('format').quality(68)
  if (!ratio) return framed.fit('max').url()
  return framed.height(Math.round(width / ratio)).fit('crop').url()
}

export function imageSrcSet(image: FramedImage, widths: number[], ratio?: number) {
  return widths.map((width) => `${imageSrc(image, width, ratio)} ${width}w`).join(', ')
}

export const heroImageWidths = [768, 1280, 1920]
export const heroImageSizes = '100vw'

export function responsiveImage(image: FramedImage, widths: number[], ratio?: number) {
  const asset = image.asset
  if (!asset) return null
  const frame = croppedSize(asset.width, asset.height, image.crop)
  const usable = widths.filter((width) => width <= frame.width)
  const srcWidths = usable.length > 0 ? usable : [frame.width]
  const srcWidth = srcWidths.find((width) => width >= 720) ?? srcWidths[srcWidths.length - 1]
  if (!srcWidth) return null
  return {
    src: imageSrc(image, srcWidth, ratio),
    srcset: imageSrcSet(image, srcWidths, ratio),
    width: frame.width,
    height: frame.height,
  }
}

function imageSource(image: FramedImage): SanityImageObject {
  const asset = image.asset
  if (!asset) throw new Error('Billede mangler asset')
  return {
    asset: { _ref: asset._id },
    ...(image.crop ? { crop: image.crop } : {}),
    ...(image.hotspot ? { hotspot: image.hotspot } : {}),
  }
}

function clamp(value: number) {
  return Math.min(100, Math.max(0, Math.round(value * 100) / 100))
}
