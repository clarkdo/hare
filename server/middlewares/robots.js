module.exports = async function robots(ctx, next) {
  await next()
  // only search-index www subdomain
  if (ctx.hostname.slice(0, 3) !== 'www') {
    ctx.response.set('X-Robots-Tag', 'noindex, nofollow')
  }
}
