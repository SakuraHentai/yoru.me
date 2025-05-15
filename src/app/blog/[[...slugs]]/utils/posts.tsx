import dayjs from 'dayjs'
import { readdir } from 'node:fs/promises'
import { basename, join } from 'node:path'

// ref: https://gohugo.io/content-management/front-matter/#front-matter-formats
export type PostMetadata = {
  path: string // for url
  title: string
  keywords: string
  description: string
  date: string
  tags: string[]
  summary: string
}

export type Post = {
  metadata: PostMetadata
}

export type Pager = {
  prev?: number
  next?: number
  tag?: string
}

const order = (a: Post, b: Post) => {
  const aDate = dayjs(a.metadata.date)
  const bDate = dayjs(b.metadata.date)
  return aDate.isBefore(bDate) ? 1 : -1
}

const POSTS_DIR = join(process.cwd(), `src/posts`)

export const getAllPosts = async (
  tag: string = '',
  page: number = 1,
  limit: number = 6
) => {
  const posts = await readdir(POSTS_DIR)

  // compile meta data
  const compiledPosts = await Promise.all(
    posts
      .filter((p) => {
        return p.endsWith('.mdx')
      })
      .map(async (post) => {
        const fileName = basename(post)
        return await getPostByName(fileName)
      })
  )

  // order by date
  compiledPosts.sort(order) // avoid create order function each sort

  let result: Post[] = compiledPosts

  // filter by tag
  if (tag !== '') {
    result = result.filter((post) => post.metadata.tags.includes(tag))
  }

  // pagination
  const pager: Pager = {}

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
    pager
  }
}

export const getPostByName = async (name: string) => {
  const fileName = name.replace(/\.mdx$/, '') // getAllPosts support
  // check name valid
  if (!/^[a-zA-Z\-0-9]+$/.test(fileName)) {
    throw new Error(`${fileName} is not a valid post name`)
  }

  const mdxModule = await import(`@/posts/${fileName}.mdx`)

  const metadata = mdxModule.metadata as PostMetadata

  const res: Post = {
    metadata: {
      path: fileName,
      title: metadata.title,
      keywords: metadata.keywords,
      description: metadata.description,
      date: dayjs(metadata.date).format('YYYY-MM-DD'),
      tags: metadata.tags,
      summary: metadata.summary
    }
  }

  return res
}
