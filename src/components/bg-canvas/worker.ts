import { expose } from 'comlink'
import ky from 'ky'

const loader = {
  async load(url: string) {
    console.time(`${url} load`)
    const blob = await ky.get(url).blob()

    const map = await createImageBitmap(blob)

    console.timeEnd(`${url} load`)

    return map
  }
}

expose(loader)
