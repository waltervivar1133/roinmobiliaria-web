import type { SliderResponse } from "@/types/slider";
import { ENV } from "@/constants/env";


export async function getSlider(): Promise<SliderResponse> {

  const url = `${ENV.SLIDERS_ENDPOINT}/${ENV.VERSION}/slider/${ENV.SLIDER}/slides`;

  const response = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch slider: ${response.statusText}`);
  }

  return response.json();
}


export async function getPublishedSlides() {
  const data = await getSlider();
  return data.slides
    .filter((slide) => slide.published === 1)
    .sort((a, b) => a.order - b.order);
}
