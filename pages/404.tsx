import Image from 'next/image'
import Link from 'next/link'
import img404 from '../assets/img-404.jpg'
import styles from '../styles/page404.module.scss'

const Page404 = () => {
  return (
    <div className={styles.notFound}>
      <Link href="/" replace>
        <Image src={img404} title="Click to back" alt="404" />
      </Link>
    </div>
  )
}
export default Page404
