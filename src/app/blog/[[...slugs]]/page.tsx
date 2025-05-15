type PageProps = {
  params: Promise<{
    slugs: string
  }>
}
export const generateMetadata = async (props: PageProps) => {
  const { slugs } = await props.params
  console.log('slugs', slugs)

  try {
    return {
      title: 'Blog',
      description: '一些关于前端的文字'
    }
  } catch (error) {
    console.error(error)
    return {}
  }
}

const Page = () => {
  return <></>
}

export default Page
