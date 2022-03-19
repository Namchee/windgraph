export interface Dimension {
  width: number;
  height: number;
}

export interface PageOptions {
  dimension: Dimension;
  format: 'jpeg' | 'png';
  compress: boolean;
}

export interface OpenGraphRequest {
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
