import type { NextPage } from 'next'
import Link from 'next/link'

type HomeProps = {
  posts: {
    title: string
    id: string
  }[]
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <div>
      Home
      {posts.map((post) => (
        <Link key={post.id} href={`/post/${post.id}`}>
          {post.title}
        </Link>
      ))}
    </div>
  )
}

export default Home

export async function getStaticProps() {
  const res = await fetch(`http://localhost:3000/posts.json`)
  const posts = await res.json()

  return {
    props: {
      posts,
    },
  }
}
