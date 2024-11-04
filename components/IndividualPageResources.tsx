import { storyblokEditable } from "@storyblok/react/rsc";
import { StoryblokComponent } from "@storyblok/react";

export default function IndividualPageResources({blok}: any) {
  return (
    <div {...storyblokEditable}>
      <h1>{blok.title}</h1>
      <p>this is an individual page</p>
      {(blok.body || []).map((nestedBlok: any) => {
        return <StoryblokComponent story={nestedBlok} key={nestedBlok._uid} />
      })}
    </div>
  )
}