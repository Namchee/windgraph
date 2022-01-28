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
  titleClass?: string;
  subtitleClass?: string;
  imageClass?: string;
  fontSans?: string;
  fontSerif?: string;
  fontMono?: string;
}
