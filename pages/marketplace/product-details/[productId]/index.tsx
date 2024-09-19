import { useRouter } from 'next/router';
import ProductDetails from '@/modules/marketplace/productDetails';

function SingleProduct() {
  const router = useRouter();

  return <ProductDetails productId={router.query.productId as string} />;
}

export default SingleProduct