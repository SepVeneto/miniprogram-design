export function isKeyExist(path: string, model: Record<string, any>) {
  const list = path.split('.')
  let curr = model
  for (const key of list) {
    if (key in curr) {
      curr = curr[key]
    } else {
      return false
    }
  }
  return true
}
