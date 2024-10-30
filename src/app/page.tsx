import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('/api/products');
            const data = await response.json();
            setProducts(data);
        };

        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold">Welcome to Our Store</h1>
                <Navbar />
            </header>

            <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4">
                        <Image
                            src={product.img}
                            alt={product.title}
                            width={300}
                            height={200}
                            className="object-cover rounded"
                        />
                        <h2 className="text-xl font-semibold mt-2">{product.title}</h2>
                        <p className="text-lg text-gray-700">{product.price}</p>
                        <Link href={`/products/${product.id}`} className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded">
                            View Details
                        </Link>
                    </div>
                ))}
            </main>

            <footer className="mt-8 text-center">
                <p>&copy; {new Date().getFullYear()} My E-commerce Store. All rights reserved.</p>
            </footer>
        </div>
    );
}
