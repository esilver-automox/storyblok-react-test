'use client'
import { useInfiniteHits } from 'react-instantsearch'

export default function InfiniteHits(props: any): JSX.Element {
  const {items, isLastPage, showMore} = useInfiniteHits(props)

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <a
            href={`/${item.path}`}
            key={index}>
            {item.title}
          </a>
        </div>
      ))}
      {!isLastPage && <button onClick={() => showMore()}>Show More Results</button>}
    </div>
  )
}

