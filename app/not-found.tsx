import type { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    "Not Found",
  description:
    '404',
}

export default function NotFound() {
  return (
    <div>
      404: page not found
    </div>
  )
}