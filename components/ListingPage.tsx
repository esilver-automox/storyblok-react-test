import { storyblokEditable } from "@storyblok/react/rsc";
import {Search} from './AlgoliaProvider'

export default function ListingPage({blok}: any) {
  return (
    <div {...storyblokEditable}>
      <h1>{blok.title}</h1>
      <p>{blok.subtitle}</p>
      <Search/>
    </div>
  )
}