import type { NextPage } from 'next'
import Link from 'next/link'
import MetaInfo from '../components/meta-info'

import styles from '../styles/home.module.scss'

const Home: NextPage = () => {
  return (
    <>
      <MetaInfo />
      <div className={styles.home}>Home</div>
    </>
  )
}

export default Home
