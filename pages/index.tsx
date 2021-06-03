import { GetStaticProps } from 'next'
import getContents from '../components/content/getContent'

const Yarn: React.FC = () => {

  return (
    <div>
      
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  console.log(await getContents())
  return { props: {} }

}

export default Yarn
