import parseQueryPath from '../utils/parse-query-path'

test('parse query path', () => {
  expect(parseQueryPath([])).toMatchObject({})
  expect(parseQueryPath(['tag', '1'])).toMatchObject({
    tag: '1',
  })
  expect(parseQueryPath(['page', '2'])).toMatchObject({
    page: 2,
  })
  expect(parseQueryPath(['a', 'b', 'c', 'd'])).toMatchObject({})
  expect(parseQueryPath(['tag', '2', 'page', '1'])).toMatchObject({
    page: 1,
    tag: '2',
  })
  expect(parseQueryPath(['page', '1', 'tag', '2'])).toMatchObject({
    page: 1,
    tag: '2',
  })
})
