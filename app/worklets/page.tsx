import type { Metadata } from 'next'

import ListingPage from "../../components/ListingPage"

export async function generateMetadata(): Promise<Metadata> {
  const res = await fetch(`https://api-us.storyblok.com/v2/cdn/stories/worklets?token=${process.env.NEXT_PUBLIC_STORYBLOK_READ_API_KEY}&version=${process.env.NEXT_PUBLIC_SB_VERSION}`)
  const data = await res.json()
  if (!data.story) {
    return {}
  }

  const content = data.story.content
  return {
    title: content.og_title || content.title,
    description: content.og_description,
  }
}

async function fetchData() {
  const version = process.env.NEXT_PUBLIC_SB_VERSION === 'published' ? 'published' : 'draft'
  const res = await fetch(`https://api-us.storyblok.com/v2/cdn/stories/worklets?token=${process.env.NEXT_PUBLIC_STORYBLOK_READ_API_KEY}&version=${version}`)
  const data = await res.json()
  return data
}

export default async function WorkletsHome(){
  const blok = await fetchData()
  return (
    <div>
      <ListingPage blok={blok.story.content}/>
    </div>
  )
}