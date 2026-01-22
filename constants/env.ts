
export const ENV = {
  GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT as string,
  SLIDERS_ENDPOINT: process.env.SLIDERS_ENDPOINT as string,
  SLIDER: process.env.SLIDER as string,
  VERSION: process.env.VERSION as string,
} as const;
