import { GetStaticProps } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { getContent, listContent } from '../../components/content-loader'
import { serialize } from 'next-mdx-remote/serialize'
import Head from 'next/head'


interface JournalProps {
  source: MDXRemoteSerializeResult
  frontmatter: {
    [key: string]: string
  }
}

const Journal: React.FC<JournalProps> = ({ source, frontmatter }) => {

  return (
    <div>
      <Head>
        <title>{frontmatter.title} - Oliver Northam</title>
        <meta key='og:title' property='og:title' content={`${frontmatter.title} - Oliver Northam`} />
      </Head>
      <MDXRemote {...source} />
    </div>
  )
}

export async function getStaticPaths() {
  
  const contentList = (await listContent("journal")).map((content) => {
    return content.slug
  })
  return { paths: contentList, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {

  const slug = context?.params?.slug
  const source = (await getContent(`/journal/${slug}`))
  const content = await serialize(source.content, { scope: source.data })

  return { props: { source: content, frontmatter: source.data } }
}

export default Journal
