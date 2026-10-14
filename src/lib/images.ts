import { createImageUrlBuilder } from '@sanity/image-url'
import { sanityClient } from './sanity'

const builder = createImageUrlBuilder(sanityClient)

export function imageSrc(assetId: string, width: number, ratio?: number) {
  const image = builder.image(assetId).width(width).auto('format').quality(68)
  if (!ratio) return image.fit('max').url()
  return image.height(Math.round(width / ratio)).fit('crop').url()
}

export function imageSrcSet(assetId: string, widths: number[], ratio?: number) {
  return widths.map((width) => `${imageSrc(assetId, width, ratio)} ${width}w`).join(', ')
}

export const heroImageWidths = [768, 1280, 1920]
export const heroImageSizes = '100vw'

export function responsiveImage(
  assetId: string,
  assetWidth: number,
  widths: number[],
  ratio?: number,
) {
  const usable = widths.filter((width) => width <= assetWidth)
  const srcWidths = usable.length > 0 ? usable : [assetWidth]
  const srcWidth = srcWidths.find((width) => width >= 720) ?? srcWidths[srcWidths.length - 1]
  if (!srcWidth) return null
  return {
    src: imageSrc(assetId, srcWidth, ratio),
    srcset: imageSrcSet(assetId, srcWidths, ratio),
  }
}
