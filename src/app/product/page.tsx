import { useRouter } from "next/router";

const Product = () => {
  const router = useRouter();
  const { id } = router.query;

  // Sample product data (you can replace this with actual data fetching)
  const product = {
    id: id,
    name: `Product ${id}`,
    description: `This is the description for Product ${id}.`,
    price: "$49.99",
    image: `/product${id}.jpg`, // Ensure you have images for each product
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <img src={product.image} alt={product.name} className="object-cover rounded" />
      <p className="text-lg text-gray-700">{product.description}</p>
      <p className="text-xl font-semibold">{product.price}</p>
    </div>
  );
};

export default Product;
