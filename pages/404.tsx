import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/page404.module.scss'
import img404 from '../assets/img-404.jpg'

const Page404 = () => {
  return (
    <div className={styles.notFound}>
      <Link href="/" replace>
        <a>
          <Image src={img404} title="Click to back" alt="404" />
        </a>
      </Link>
    </div>
  )
}
export default Page404
