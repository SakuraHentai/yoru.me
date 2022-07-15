import parseQueryPath from '../utils/parse-query-path'

describe('Parse query path', () => {
  test('empty query', () => {
    expect(parseQueryPath([])).toMatchObject({})
  })
  test('single param only tag', () => {
    expect(parseQueryPath(['tag', '1'])).toMatchObject({
      tag: '1',
    })
  })
  test('single param only page', () => {
    expect(parseQueryPath(['page', '2'])).toMatchObject({
      page: 2,
    })
  })
  test('invalid params should be empty', () => {
    expect(parseQueryPath(['a', 'b', 'c', 'd'])).toMatchObject({})
  })
  test('couple params', () => {
    expect(parseQueryPath(['tag', '2', 'page', '1'])).toMatchObject({
      page: 1,
      tag: '2',
    })
  })
  test('couple params with diff sequence', () => {
    expect(parseQueryPath(['page', '1', 'tag', '2'])).toMatchObject({
      page: 1,
      tag: '2',
    })
  })
})
