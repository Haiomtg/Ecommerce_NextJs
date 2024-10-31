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
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const id = params.id;
                const data = await getProductById(id);
                console.log(data);
                setProduct(data);
            } catch (error) {
                console.error("Failed to load product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [params]);

    if (loading) return <div className="text-center text-lg">Loading...</div>;
    if (product === null) return <div className="text-center text-lg">Product not found</div>;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
            <Navbar />
            <div className="flex-grow p-8 flex flex-col items-center">
                <h1 className="text-4xl font-bold mb-4 text-gray-800">{product.title}</h1>
                <img src={product.img} alt={product.title} className="object-cover rounded-lg shadow-lg mb-4 w-full max-w-md" />
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
            <Footer />
        </div>
    );
}
