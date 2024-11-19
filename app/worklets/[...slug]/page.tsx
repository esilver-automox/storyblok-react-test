
import { ISbStoriesParams, ISbStory, StoryblokClient, StoryblokStory } from '@storyblok/react/rsc'
import { Metadata } from "next"

import NotFound from "../../not-found"
import { getStoryblokApi } from '@/lib/storyblok-worklets'

interface Stories {
  stories: any[]
}

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {

  const slug = params.slug ? params.slug : ''
  const res = await fetch(`https://api-us.storyblok.com/v2/cdn/stories/worklets/${slug}?token=${process.env.NEXT_PUBLIC_STORYBLOK_READ_API_KEY}&version=${process.env.NEXT_PUBLIC_SB_VERSION}`)
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
  const initialResources = await fetch(`https://api-us.storyblok.com/v1/cdn/stories?token=${process.env.NEXT_PUBLIC_STORYBLOK_READ_API_KEY}&version=${process.env.NEXT_PUBLIC_SB_VERSION}&per_page=50&page=1&filter_query[component][in]=worklet-individual`)
  let resources: any[] = (await initialResources.json() as unknown as Stories).stories
  const total = Number(initialResources.headers.get('total'))
  let pageNumber = 2
  while (pageNumber * 50 < total) {
    const nextResources = await fetch(`https://api-us.storyblok.com/v1/cdn/stories?token=${process.env.NEXT_PUBLIC_STORYBLOK_READ_API_KEY}&version=${process.env.NEXT_PUBLIC_SB_VERSION}&per_page=50&page=${pageNumber}&filter_query[component][in]=worklet-individual`)
    const nextStories = (await nextResources.json() as unknown as Stories).stories
    resources = resources.concat(nextStories)
    pageNumber += 1
  }
  return resources.map(resource => ({slug: resource.full_slug.split['/']}))
}

async function fetchData(slug: string): Promise<ISbStory> {
  const version = process.env.NEXT_PUBLIC_SB_VERSION === 'published' ? 'published' : 'draft'
  const sbParams: ISbStoriesParams = {version}
  const storyblokApi: StoryblokClient = getStoryblokApi()
  return storyblokApi.get(`cdn/stories/worklets/${slug}`, sbParams, {cache: 'no-store'})

  // try {
  //   const version = process.env.NEXT_PUBLIC_SB_VERSION === 'published' ? 'published' : 'draft'
  //   const res = await fetch(`https://api-us.storyblok.com/v2/cdn/stories/worklets/${slug}?token=${process.env.NEXT_PUBLIC_STORYBLOK_READ_API_KEY}&version=${version}`)
  //   const data = await res.json()
  //   return data
  // } catch (err) {
  //   console.log(err)
  //   return {}
  // }
}

export default async function SBPage({params}: {params: {slug: string}}) {
  try {
    const {data}: ISbStory = await fetchData(params.slug)
    return (
      <div>
        <StoryblokStory blok={data.story} />
      </div>
    );
  } catch (e) {
    console.log(e)
    return <NotFound/>
  }
  // if (!data.story) {
  //   return <NotFound/>
  // }

  

}