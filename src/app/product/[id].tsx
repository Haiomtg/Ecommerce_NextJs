'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProductById } from '../api/products'; // Adjust the import path as necessary


type Product = {
    id: number;
    title: string;
    img: string;
    price: number;
    description: string;
};

const ProductDetail = () => {

    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                try {
                    const data = await getProductById(id);
                    setProduct(data);
                } catch (error) {
                    console.error("Failed to load product:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div className="min-h-screen p-8">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <img src={product.img} alt={product.title} className="object-cover rounded" />
            <p className="text-lg text-gray-700">{product.description}</p>
            <p className="text-xl font-semibold">{product.price}</p>
        </div>
    );
};

export default ProductDetail;
