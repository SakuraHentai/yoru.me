import { describe, expect, it } from 'vitest'

import parseQueryPath from './parse-query-path'

describe('parseQueryPath', () => {
  it('should return empty object when path is undefined', () => {
    const result = parseQueryPath(undefined)
    expect(result).toEqual({})
  })

  it('should return default values when path is empty array', () => {
    const result = parseQueryPath([])
    expect(result).toEqual({ tag: '', page: 1 })
  })

  it('should parse tag parameter correctly', () => {
    const result = parseQueryPath(['tag', 'javascript'])
    expect(result).toEqual({ tag: 'javascript', page: 1 })
  })

  it('should parse tag as empty for unknown parameters', () => {
    const result = parseQueryPath(['tag'])
    expect(result).toEqual({ tag: '', page: 1 })
  })

  it('should parse page parameter correctly', () => {
    const result = parseQueryPath(['page', '2'])
    expect(result).toEqual({ tag: '', page: 2 })
  })

  it('should parse both tag and page parameters', () => {
    const result = parseQueryPath(['tag', 'typescript', 'page', '3'])
    expect(result).toEqual({ tag: 'typescript', page: 3 })
  })

  it('should default to page 1 if page value is invalid', () => {
    const result = parseQueryPath(['page', 'invalid'])
    expect(result).toEqual({ tag: '', page: 1 })
  })
})
