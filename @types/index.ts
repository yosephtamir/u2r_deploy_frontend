export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    isVerified: boolean;
    roleId: number;
    twoFactorAuth: boolean;
    two_factor_auth: boolean;
    slug: string | null;
};

export interface UserProfile {
    managerFirstName: string;
    managerMiddleName: string;
    managerLastName: string;
    managerCountry: string;
    managerRegion: string;
    managerZone: string;
    managerWoreda: string;
    managerKebele: string;
    managerPhoneNumber: string;
    managerRenewedIDFront: string;
    managerRenewedIDBack: string;
}

export interface UserCompany {
    companyName: string;
    companyHN: string;
    companyTIN: string;
    companyCountry: string;
    companyRegion: string;
    companyZone: string;
    companyWoreda: string;
    companyKebele: string;
    companyPhoneNumber: string;
    companyLicense: string;
}

export interface FormData {
    email: string;
    password: string;
    confirmPassword: string;
    agree: boolean;
    user_profile: UserProfile;
    user_company: UserCompany;
}

export interface MainLayoutProps {
  children?: React.ReactNode;
  className?: React.ComponentProps<'div'>['className'];
  activePage: string;
  showTopbar?: boolean;
  showFooter?: boolean;
  includeMarginTop?: boolean;
}

export type AuthResponse = {
    token: string;
    user: User;
};

export interface AuthContextProps {
    auth: AuthResponse | undefined;
    handleAuth: (value: AuthResponse | undefined) => void;
}

type Thumbnail = {
  id: number;
  url: string;
};

type Category = {
  id: number;
  name: string;
  thumbnails: Thumbnail[];
};

export type CategoryNames = {
  status: number;
  success: boolean;
  message: string;
  data: Category[];
};

export type ProductCardProps = {
    id: string;
    currency: string;
    image: string;
    name: string;
    price: number;
    user: string;
    ave_rating: number;
    showDiscount: boolean;
    showTopPicks: boolean;
    discount_price?: number;
    shop: { id: string; name: string; };
    product_thumbnail: any;
};

export type SummaryProp = {
  currency: string;
  delivery_address: string;
  sub_total: number;
  total_discount: number;
  vat: number;
  total: number;
  count: number;
}

export type CartProp = {
  id: number;
  summary: SummaryProp;
  created_at: string;
  updated_at: string;
  delivery_address: string;
  owner: number;
  new_cart: boolean;
}

export type CartItemProps = {
  itemId: string;
  productId: string;
  productImage: string;
  productTitle: string;
  productDescription: string;
  productPrice: number;
  productDiscount?: number;
  productQuantity: number;
};

export type WishListItemProps = {
  itemId: string;
  productId: string;
  productImage: string;
  productTitle: string;
  productDescription: string;
  productPrice: number;
  productDiscount?: number;
  productStatus: string;
};