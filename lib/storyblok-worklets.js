import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import ListingPage from '../components/ListingPage'
import IndividualPage from '../components/IndividualPage'
 
const components = {
  'worklets-main': ListingPage,
  'worklet-individual': IndividualPage 
}

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_READ_API_KEY,
  use: [apiPlugin],
  apiOptions: {
    region: 'us'
  },
  components
});