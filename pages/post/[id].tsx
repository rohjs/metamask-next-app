import { NextPage } from 'next'
import MarkdownIt from 'markdown-it'

type PostProps = {
  source: string
}

const Post: NextPage<PostProps> = ({ source }) => {
  return (
    <main>
      <div dangerouslySetInnerHTML={{ __html: source }} />
    </main>
  )
}

export default Post

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/posts.json')
  const posts: Record<string, string>[] = await res.json()
  const paths = posts.map(({ id }) => ({ params: { id } }))

  return { paths, fallback: false }
}

type Params = {
  params: {
    id: string
  }
}

const md = new MarkdownIt()

export async function getStaticProps({ params }: Params) {
  const { id } = params
  const res = await fetch(`http://localhost:3000/markdown/${id}.md`)
  const markdown = await res.text()
  const source = md.render(markdown)

  return {
    props: {
      source,
    },
  }
}
