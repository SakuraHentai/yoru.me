import dayjs from 'dayjs'
import { readdir, readFile } from 'fs/promises'
import matter from 'gray-matter'
import { join } from 'path'
import type { PagerType, PostType } from '../types'
import { compileMDX } from '../utils/compile-mdx'

// use `_` prefix place top in editor
const postsDirectory = join(process.cwd(), '_posts')

const order = (a: PostType, b: PostType) => {
  const aDate = dayjs(a.meta.date)
  const bDate = dayjs(b.meta.date)
  return aDate.isBefore(bDate) ? 1 : -1
}

export const getAllPosts = async (
  tag: string = '',
  page: number = 1,
  limit: number = 6
) => {
  const posts = await readdir(postsDirectory)

  // compile meta data
  const compiledPosts = await Promise.all(
    posts.map(async (post) => await getPostByName(post))
  )

  // order by date
  compiledPosts.sort(order) // avoid create order function each sort

  let result: PostType[] = compiledPosts

  // filter by tag
  if (tag !== '') {
    result = result.filter((post) => post.meta.tags.includes(tag))
  }

  // pagination
  const pager: PagerType = {}

  // limit min page
  page = Math.max(page, 1)

  result = result.slice((page - 1) * limit, page * limit)

  if (result.length) {
    if (page > 1) {
      pager.prev = page - 1
    }
    if (result.length === limit && page * limit < compiledPosts.length) {
      pager.next = page + 1
    }
    if (tag !== '') {
      pager.tag = tag
    }
  }

  return {
    posts: result,
    pager,
  }
}

export const getPostByName = async (name: string, withContent = false) => {
  const fileName = name.replace(/\.mdx$/, '') // getAllPosts support
  // check name valid
  if (!/^[a-zA-Z\-0-9]+$/.test(fileName)) {
    throw new Error(`${fileName} is not a valid post name`)
  }
  const filePath = join(postsDirectory, `${fileName}.mdx`)
  const fileContent = await readFile(filePath, 'utf8')
  const { data: meta, content } = matter(fileContent)

  const res: PostType = {
    meta: {
      path: fileName,
      title: meta.title,
      keywords: meta.keywords,
      description: meta.description,
      date: dayjs(meta.date).format('YYYY-MM-DD'),
      tags: meta.tags,
      summary: meta.summary,
    },
  }

  if (withContent) {
    // auto import demos from source code
    res.code = await compileMDX(content)
  }
  return res
}
