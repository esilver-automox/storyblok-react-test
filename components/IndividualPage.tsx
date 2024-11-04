import { storyblokEditable } from "@storyblok/react/rsc";

export default function IndividualPage({blok}: any) {
  return (
    <div {...storyblokEditable}>
      <h1>{blok.content.title}</h1>
      <p>{blok.content.short_summary}</p>
    </div>
  )
}