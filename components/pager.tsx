import Link from 'next/link'
import styles from '../styles/blog.module.scss'
import type { PagerType } from '../types'

type PagerProps = {
  pager: PagerType
}

const Pager: React.FC<PagerProps> = ({ pager }) => {
  const tagPath = pager.tag ? `/tag/${pager.tag}` : ''
  let prevLink = ''
  let nextLink = ''

  if (pager.prev) {
    if (pager.prev === 1) {
      // omit page param
      prevLink = `/blog${tagPath}`
    } else {
      prevLink = `/blog${tagPath}/page/${pager.prev}`
    }
  }
  if (pager.next) {
    nextLink = `/blog${tagPath}/page/${pager.next}`
  }

  return (
    <div className={styles.pager}>
      {prevLink && <Link href={prevLink}>Prev</Link>}
      {nextLink && <Link href={nextLink}>Next</Link>}
    </div>
  )
}

export default Pager
