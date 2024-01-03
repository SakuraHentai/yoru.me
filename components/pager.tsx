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
    <>
      {(prevLink || nextLink) && (
        <div className={styles.pager}>
          <div className={styles.pagerInner}>
            {prevLink && (
              <Link
                href={prevLink}
                title="Previous Page"
                className={styles.pagerPrev}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M14.75 8a.75.75 0 0 1-.75.75H3.81l2.72 2.72a.75.75 0 1 1-1.06 1.06l-4-4a.75.75 0 0 1 0-1.06l4-4a.75.75 0 0 1 1.06 1.06L3.81 7.25H14a.75.75 0 0 1 .75.75"
                    clip-rule="evenodd"
                  />
                </svg>
              </Link>
            )}
            {prevLink && nextLink && (
              <span className={styles.pagerDivider}></span>
            )}
            {nextLink && (
              <Link
                href={nextLink}
                title="Next Page"
                className={styles.pagerNext}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M1.25 8A.75.75 0 0 1 2 7.25h10.19L9.47 4.53a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 1 1-1.06-1.06l2.72-2.72H2A.75.75 0 0 1 1.25 8"
                    clip-rule="evenodd"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Pager
