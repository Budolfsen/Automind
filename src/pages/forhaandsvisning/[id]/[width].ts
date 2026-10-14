import type { APIRoute } from 'astro'
import { attachmentPreview } from '../../../lib/attachment'
import { getUpcomingCourses } from '../../../lib/content'
import { invitationVariant, invitationWidths } from '../../../lib/invitationPreview'

export async function getStaticPaths() {
  const courses = await getUpcomingCourses()
  const paths = []
  for (const course of courses) {
    const url = course.attachment?.url
    if (!url || !course.attachment || attachmentPreview(course.attachment) !== 'image') continue
    for (const width of invitationWidths()) {
      const preview = await invitationVariant(url, width)
      if (!preview) continue
      paths.push({
        params: { id: course._id, width: String(preview.width) },
        props: { url },
      })
    }
  }
  return paths
}

export const GET: APIRoute = async ({ props, params }) => {
  const url = props.url
  const width = Number(params.width)
  const preview = await invitationVariant(url, width)
  if (!preview) return new Response('Preview mangler', { status: 404 })
  const body = new ArrayBuffer(preview.body.byteLength)
  new Uint8Array(body).set(preview.body)
  return new Response(body, {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
