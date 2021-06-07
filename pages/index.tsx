import { GetStaticProps } from 'next'
import { listContent } from '../components/content/content-loader'

function ContentList ({ contentItems }) {
  const contentList = contentItems.map((item) => {
    return (
      <li>
        <a href={item.slug}>{item.data.title}</a>
      </li>
    )
  })

  return (
    <ul>{contentList}</ul>
  )
}

interface JournalListProps {
  contentList: []
}

const JournalList: React.FC<JournalListProps> = ({ contentList }) => {

  return <ContentList contentItems={contentList} />
}

export const getStaticProps: GetStaticProps = async (context) => {

  const contentList = (await listContent("journal"))

  return { props: { contentList } }

}

export default JournalList
