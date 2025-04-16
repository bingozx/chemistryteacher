import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

const DEBUG = false
const CACHE_TIME = 60 * 60 * 24 * 7 // 7 days

async function handleEvent(event) {
  const url = new URL(event.request.url)
  try {
    // 添加安全头
    let options = {
      cacheControl: {
        browserTTL: CACHE_TIME,
        edgeTTL: CACHE_TIME,
        bypassCache: false,
      },
    }

    const response = await getAssetFromKV(event, options)

    // 添加安全相关的响应头
    const headers = new Headers(response.headers)
    headers.set('X-XSS-Protection', '1; mode=block')
    headers.set('X-Content-Type-Options', 'nosniff')
    headers.set('X-Frame-Options', 'DENY')
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    headers.set('Feature-Policy', "camera 'none'; microphone 'none'")

    // 对于 HTML 文件，添加 CSP
    const contentType = headers.get('content-type')
    if (contentType && contentType.includes('text/html')) {
      headers.set(
        'Content-Security-Policy',
        "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval';"
      )
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    })
  } catch (e) {
    if (DEBUG) {
      return new Response(e.message || e.toString(), { status: 500 })
    }

    // 处理 404 错误，返回 index.html（用于 SPA）
    if (e.status === 404) {
      try {
        let notFoundResponse = await getAssetFromKV(event, {
          mapRequestToAsset: (req) => new Request(`${new URL(req.url).origin}/index.html`, req),
        })

        return new Response(notFoundResponse.body, {
          ...notFoundResponse,
          status: 200,
        })
      } catch (e) {}
    }

    return new Response('An error occurred.', { status: 500 })
  }
}

addEventListener('fetch', (event) => {
  event.respondWith(handleEvent(event))
}) 