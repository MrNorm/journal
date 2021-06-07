import { GetStaticProps } from 'next'
import { listContent } from '../components/content/content-loader'

function JournalList ({ journalItems }) {
  const journalList = journalItems.map((item) => {
    return (
      <li>
        <a href={item.slug}>{item.data.title}</a>
      </li>
    )
  })

  return (
    <ul>{journalList}</ul>
  )
}

const Yarn: React.FC = ({ journalList }) => {

  return <JournalList journalItems={journalList} />
}

export const getStaticProps: GetStaticProps = async (context) => {

  const journalList = (await listContent("journal"))

  return { props: { journalList } }

}

export default Yarn
