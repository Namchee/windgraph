export interface Dimension {
  width: number;
  height: number;
}

export interface PageOptions {
  dimension?: Dimension;
}

export interface OpenGraphContent {
  title?: string;
  subtitle?: string;
  image?: string;
  containerClass?: string;
  fontFamily?: string;
  titleClass?: string;
  subtitleClass?: string;
}
