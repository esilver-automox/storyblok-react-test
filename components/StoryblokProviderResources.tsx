'use client';

import { getStoryblokApi } from '../lib/storyblok-resources';

export default function StoryblokProvider({ children }: any) {
  getStoryblokApi();
  return children;
}