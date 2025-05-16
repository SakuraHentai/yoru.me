import { expose } from 'comlink'
import ky from 'ky'

const loader = {
  async load(url: string) {
    const blob = await ky.get(url).blob()

    const map = await createImageBitmap(blob, {
      imageOrientation: 'flipY'
    })

    return map
  }
}

expose(loader)
