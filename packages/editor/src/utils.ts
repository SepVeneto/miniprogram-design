import { normalizeStyle as format } from '@sepveneto/mpd-hooks'

export function normalizeStyle(customStyle: Record<string, any>) {
  const style = format(customStyle)
  const image = style.backgroundImage || style.background
  if (typeof image === 'string' && image.startsWith('url(')) {
    style.backgroundSize = '100%'
    style.backgroundRepeat = 'no-repeat'
  }
  return style
}

export function toFixed(num: number) {
  return Number(num.toFixed(2))
}
