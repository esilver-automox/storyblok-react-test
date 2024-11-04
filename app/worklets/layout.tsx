
import { apiPlugin, storyblokInit } from '@storyblok/react/rsc'

import Navigation from "../navigation";
import Footer from "../footer";
import StoryblokProvider from '../../components/StoryblokProviderWorklets'

export default function RootLayout({ children }: any) {
  return (
    <StoryblokProvider>
      <div>
        <Navigation/>
        {children}
        <Footer/>
      </div>
    </StoryblokProvider>
  )
}