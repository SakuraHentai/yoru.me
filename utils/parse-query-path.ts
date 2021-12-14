export type PathProp = {
  tag?: string
  page?: number
}

// path from getServerSideProps, like [param1Key, param1Value, param2Key, param2Value]
const parseQueryPath = (path: string[] | undefined): PathProp => {
  if (!Array.isArray(path)) {
    return {}
  }

  const result = {
    tag: '',
    page: 1,
  }

  path.forEach((item, index) => {
    switch (item) {
      case 'tag':
        result[item] = path[index + 1]
        break
      case 'page':
        result[item] = parseInt(path[index + 1] || '1', 10)
    }
  })

  return result
}

export default parseQueryPath
