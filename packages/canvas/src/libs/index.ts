import CanvasKitInit from 'canvaskit-wasm'

const CanvasKitPromise = CanvasKitInit()

export const CanvasKit = await CanvasKitPromise
export async function getCanvasKit() {
  return await CanvasKitPromise
}
