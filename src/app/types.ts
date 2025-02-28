export interface Image {
  large: string;
  medium: string;
  small: string;
  alt: string;
  title: string;
}

export interface Person {
  id: string;
  boolean: boolean;
  phone: string;
  date: number;
  tags: string[];
  sex: 'm' | 'f' | string;
  firstname: string;
  surname: string;
  email: string;
  title: string;
  intro: string;
  body: string;
  personal_code: number;
  image: Image;
  images: Image[];
}

export interface ArticleData {
  id: string;
  boolean: boolean;
  phone: string;
  date: number;
  tags: string[];
  sex: string;
  firstname: string;
  surname: string;
  email: string;
  title: string;
  intro: string;
  body: string;
  personal_code: number;
  image: Image;
  images: Image[];
}
