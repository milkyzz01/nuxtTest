// shims.d.ts
import { type NuxtConfig } from 'nuxt/schema';

declare module 'nuxt/schema' {
  interface NuxtConfig {
    shadcn?: {
      prefix?: string;
      componentDir?: string;
    };
  }
}
