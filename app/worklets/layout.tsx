import { storyblokInit } from "@storyblok/react/rsc";
import StoryblokBridgeLoader from "@storyblok/react/bridge-loader";
import Navigation from "../navigation";
import Footer from "../footer";
import ListingPage from '../../components/ListingPage'
import IndividualPage from '../../components/IndividualPage'
 
const components = {
  'worklets-main': ListingPage,
  'worklet-individual': IndividualPage 
}

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_WORKLETS_API_KEY,
  use: [],
  apiOptions: {
    region: 'us'
  },
  components
});
 
export default function RootSBLayout({ children }: any) {
  return (
     <div>
       <Navigation/>
       {children}
       <StoryblokBridgeLoader options={{}} />
       <Footer/>
    </div>
  )
}