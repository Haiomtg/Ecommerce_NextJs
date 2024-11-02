'use client';
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { getAllProducts } from './api/products';

type Product = {
    id: number;
    title: string;
    img: string;
    price: number;
};

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error("Failed to load products:", error);
            }
        };

        loadProducts();
    }, []);

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
            <header className="mb-8 p-4 bg-white shadow-md">
                <h1 className="text-3xl font-bold text-center">Welcome to Our Store</h1>
                <Navbar />
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </header>

            <main className="flex-grow p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentProducts.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4 bg-white shadow hover:shadow-lg transition-shadow duration-200">
                        <img
                            src={product.img}
                            alt={product.title}
                            className="object-cover rounded h-48 w-full"
                        />
                        <h2 className="text-xl font-semibold mt-2">{product.title}</h2>
                        <p className="text-lg text-gray-700">${product.price}</p>
                        <Link href={`/product/${product.id}`} className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
                            View Details
                        </Link>
                    </div>
                ))}
            </main>

            <div className="flex justify-center mb-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`mx-1 px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            <Footer />
        </div>
    );
}
