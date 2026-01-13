import ProductCard from "@/components/ProductCard";

import { useGetProductByIdQuery } from "@/services/productsApi";

const Page = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetProductByIdQuery(1);
  return <ProductCard product={data} />;
};

export default ProductCard;
