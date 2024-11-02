'use client';
import React, { useEffect, useState } from "react";
import { getProductById } from '../../api/products';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

type Product = {
    id: number;
    title: string;
    img: string;
    price: number;
    description: string;
};

export default function ProductDetail({ params }: { params: { id: number } }) {
    const [product, setProduct] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const id = params.id;
                const data = await getProductById(id);
                console.log(data);
                setProduct(data);
            } catch (error) {
                console.error("Failed to load product:", error);
                setError("Failed to load product. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [params]);

    if (loading) return <div className="text-center text-lg">Loading...</div>;
    if (error) return <div className="text-center text-lg">{error}</div>;
    if (!product) return <div className="text-center text-lg">Product not found</div>;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
            <Navbar />
            <div className="flex-grow p-8 flex flex-row items-center">
                <img 
                    src={product.img} 
                    alt={product.title} 
                    className="object-cover rounded-lg shadow-lg mb-4 w-1/2" 
                    width={500}
                    height={300}
                />
                <div className="flex flex-col ml-8 w-1/2">
                    <h1 className="text-4xl font-bold mb-4 text-gray-800">{product.title}</h1>
                    <p className="text-2xl font-semibold mb-2 text-gray-900">${product.price}</p>
                    <div className="flex space-x-4 mb-4">
                        <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">
                            Add to Cart
                        </button>
                        <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200">
                            Buy Now
                        </button>
                    </div>
                    <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">Description</h2>
                    <p className="text-lg text-gray-700 text-center">{product.description}</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}
