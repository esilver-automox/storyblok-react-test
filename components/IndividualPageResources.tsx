import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";

export default function IndividualPageResources({blok}: any) {
  return (
    <div {...storyblokEditable}>
      <h1>{blok.title}</h1>
      <p>this is an individual page</p>
      {(blok.body || []).map((nestedBlok: any) => {
        return <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      })}
    </div>
  )
}