export interface Slide {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  image: string;
  background_image: string;
  link: string;
  background_type: string;
  background_color: string;
  layers: unknown[];
  published: number;
  order: number;
}

export interface Slider {
  id: number;
  title: string;
  type: string;
}

export interface SliderResponse {
  success: boolean;
  slider: Slider;
  total_slides: number;
  slides: Slide[];
}
