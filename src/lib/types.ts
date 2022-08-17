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
  title: string;
  subtitle?: string;
  footer?: string;
  image?: string;
  containerClass?: string;
  titleClass?: string;
  subtitleClass?: string;
  footerClass?: string;
  imageClass?: string;
  fontSans?: string;
  fontSerif?: string;
  fontMono?: string;
  template?: string;
}

export interface TemplateMap {
  fonts: string;
  scripts: string;
  container: string;
  image: string;
  title: string;
  subtitle: string;
  footer: string;
}
