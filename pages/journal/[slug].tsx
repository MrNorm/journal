import { GetStaticProps } from 'next'
import path from 'path'
import * as fsWithCallbacks from 'fs'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import matter from 'gray-matter'

const fs = fsWithCallbacks.promises
const postsPath = path.join(process.cwd(), 'content/journal')

interface JournalProps {
  source: MDXRemoteSerializeResult
  frontMatter: {
    [key: string]: string
  }
}

const Journal: React.FC<JournalProps> = ({ source, frontMatter }) => {

  return (
    <div>
      <MDXRemote {...source} />
    </div>
  )
}

export async function getStaticPaths() {
  const posts = (await fs.readdir(postsPath)).map((post) => {
    const [slug] = post.split('.')
    
    return "/journal/" + slug
  })
  return { paths: posts, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const posts = (await fs.readdir(postsPath)).map((post) => {
    const [slug] = post.split('.')
    return slug
  })

  const slug = context?.params?.slug
  
  const source = (
    await fs.readFile(path.join(postsPath, `${slug}.mdx`), {
      encoding: 'utf8'
    })
  ).trim()
  
  const { content, data } = matter(source)
  const mdxSource = await serialize(content, { scope: data })
  return { props: { source: mdxSource, frontMatter: data } }

}

export default Journal
