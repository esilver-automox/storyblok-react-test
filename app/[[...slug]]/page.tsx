import { StoryblokStory } from '@storyblok/react/rsc'
import { Metadata } from "next"

import NotFound from "../not-found"
import Home from "../homepage"

interface Stories {
  stories: any[]
}

type Props = {
  params: { slug: string[] | string }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {

  const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug
  const res = await fetch(`https://api.storyblok.com/v2/cdn/stories/${slug}?token=${process.env.NEXT_PUBLIC_STORYBLOK_READ_API_KEY2}&version=${process.env.NEXT_PUBLIC_SB_VERSION}`)
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

export async function generateStaticParams(){
  const initialResources = await fetch(`https://api.storyblok.com/v2/cdn/stories?token=${process.env.NEXT_PUBLIC_STORYBLOK_READ_API_KEY2}&version=${process.env.NEXT_PUBLIC_SB_VERSION}&per_page=10&page=1`)
  let resources: any[] = (await initialResources.json() as unknown as Stories).stories
  const total = Number(initialResources.headers.get('total'))
  let pageNumber = 2
  while (pageNumber * 10 < total) {
    const nextResources = await fetch(`https://api.storyblok.com/v2/cdn/stories?token=${process.env.NEXT_PUBLIC_STORYBLOK_READ_API_KEY2}&version=${process.env.NEXT_PUBLIC_SB_VERSION}&per_page=10&page=${pageNumber}`)
    const nextStories = (await nextResources.json() as unknown as Stories).stories
    resources = resources.concat(nextStories)
    pageNumber += 1
  }
  return resources.map(resource => ({slug: resource.full_slug.split['/']}))
}

async function fetchData(slug: string) {
  try {
    const version = process.env.NEXT_PUBLIC_SB_VERSION === 'published' ? 'published' : 'draft'
    const res = await fetch(`https://api.storyblok.com/v2/cdn/stories/${slug}?token=${process.env.NEXT_PUBLIC_STORYBLOK_READ_API_KEY2}&version=${version}`)
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
    return {}
  }
}

export default async function SBPage({params}: {params: {slug: string}}) {
  const slug = params.slug && Array.isArray(params.slug) ? params.slug.join("/") : params.slug;
  const data = await fetchData(slug)
  if (!data.story) {
    return <NotFound/>
  }
  if (data.story.content.component === 'homepage') {
    return <Home/>
  }

  return (
    <div>
      <StoryblokStory story={data.story} />
    </div>
  );

}