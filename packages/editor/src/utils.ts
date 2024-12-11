import { normalizeStyle as format } from '@sepveneto/mpd-hooks'

export function normalizeStyle(customStyle: Record<string, any>, mode: 'grid' | 'free' = 'grid') {
  const { x, y, ..._style } = customStyle
  const style = format(_style)
  const image = style.backgroundImage || style.background
  if (typeof image === 'string' && image.startsWith('url(')) {
    style.backgroundSize = '100%'
    style.backgroundRepeat = 'no-repeat'
  }

  if (mode === 'free') {
    style.transform = `translate(${x}px, ${y}px)`
    style.position = 'absolute'
    style.top = '0px'
    style.left = '0px'
  }
  return style
}

export function toFixed(num: number) {
  return Number(num.toFixed(2))
}
