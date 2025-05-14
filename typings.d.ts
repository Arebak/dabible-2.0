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
  thumbnail_url: string | (() => Promise<string>);
  title: string;
  price: number;
  imageSrc: string | (() => Promise<string>);
  imageAlt: string;
  id: string;
  name: string;
  description: string;
  default_price: {
    unit_amount: number;
    currency: string;
    id: string;
    product: string;
    recurring: {
      interval: string;
      interval_count: number;
      usage_type: string;
      currency: string;
      billing_scheme: string;
      aggregate_usage: string;
      amount: number;
      amount_decimal: string;
      created: number;
      livemode: boolean;
      metadata: {
        [key: string]: string;
      };
      id: string;
      object: string;
      interval: string;
      interval_count: number;
      usage_type: string;
      currency: string;
      billing_scheme: string;
      aggregate_usage: string;
      amount: number;
      amount_decimal: string;
      created: number;
      livemode: boolean;
      metadata: {
        [key: string]: string;
      };
    };
  title: string;
  price: number;
  imageSrc: string;
  imageAlt: string;
  category: string;
  colors?: Color[]; // optional
  sizes?: Size[];    // required
  };
}

  
  interface ProductGalleryProps {
    products: Product[] | undefined;
  }
  