import type { ComponentDefinition } from "vue"

// Ensure this file is parsed as a module regardless of dependencies
export {}

declare module 'vue-router' {
  // noinspection JSUnusedGlobalSymbols
  interface RouteMeta {
    title?: string
    layout?: ComponentDefinition
  }
}
