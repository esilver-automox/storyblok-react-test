'use client';

import { getStoryblokApi } from '../lib/storyblok-worklets';

export default function StoryblokProvider({ children }: any) {
  getStoryblokApi();
  return children;
}