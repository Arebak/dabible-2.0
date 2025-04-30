type Color = 
  | "green"
  | "red"
  | "yellow"
  | "orange"
  | "light blue"
  | "dark blue"
  | "purple"
  | "pink"
  | "white"
  | "black";

type Size =
  | "xx-small"
  | "x-small"
  | "small"
  | "medium"
  | "large"
  | "x-large"
  | "xx-large"
  | "3x-large"
  | "4x-large";

interface Product {
  id: string;
  title: string;
  price: number;
  imageSrc: string;
  imageAlt: string;
  category: string;
  colors?: Color[]; // optional
  sizes?: Size[];    // required
}

  
  interface ProductGalleryProps {
    products: Product[] | undefined;
  }
  