import { storyblokEditable } from "@storyblok/react/rsc";

export default function IndividualPage({blok}: any) {
  return (
    <div {...storyblokEditable}>
      <h1>{blok.title}</h1>
      <p>{blok.short_summary}</p>
    </div>
  )
}