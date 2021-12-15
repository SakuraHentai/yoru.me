// ref: https://gohugo.io/content-management/front-matter/#front-matter-formats
export type PostMetaType = {
  path: string // for url
  title: string
  keywords: string
  description: string
  date: string
  tags: string[]
  demos?: string[]
  summary: string
}

export type PostType = {
  meta: PostMetaType
  code?: string
}

export type PagerType = {
  prev?: number
  next?: number
  tag?: string
}
