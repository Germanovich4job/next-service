import ProductCard from "@/components/ProductCard";

import { useGetProductByIdQuery } from "@/services/productsApi";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return <ProductCard id={id} />;
};

export default Page;
