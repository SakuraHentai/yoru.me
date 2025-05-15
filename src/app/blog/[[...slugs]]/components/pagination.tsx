import Link from 'next/link'

import type { Pager } from '../utils/posts'

type PagerProps = {
  pager: Pager
}

export const Pagination: React.FC<PagerProps> = ({ pager }) => {
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
        <div className="flex justify-center py-12">
          <div className="flex items-center gap-8">
            {prevLink && (
              <Link
                href={prevLink}
                title="Previous Page"
                className="group flex items-center gap-2 rounded-lg px-4 py-2 text-gray-600 transition-all hover:scale-105 hover:bg-gray-100 hover:text-gray-900 active:scale-95 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  className="transition-transform duration-200 group-hover:-translate-x-1"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M14.75 8a.75.75 0 0 1-.75.75H3.81l2.72 2.72a.75.75 0 1 1-1.06 1.06l-4-4a.75.75 0 0 1 0-1.06l4-4a.75.75 0 0 1 1.06 1.06L3.81 7.25H14a.75.75 0 0 1 .75.75"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">Previous</span>
              </Link>
            )}
            {prevLink && nextLink && (
              <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
            )}
            {nextLink && (
              <Link
                href={nextLink}
                title="Next Page"
                className="group flex items-center gap-2 rounded-lg px-4 py-2 text-gray-600 transition-all hover:scale-105 hover:bg-gray-100 hover:text-gray-900 active:scale-95 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-100"
              >
                <span className="font-medium">Next</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M1.25 8A.75.75 0 0 1 2 7.25h10.19L9.47 4.53a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 1 1-1.06-1.06l2.72-2.72H2A.75.75 0 0 1 1.25 8"
                    clipRule="evenodd"
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
