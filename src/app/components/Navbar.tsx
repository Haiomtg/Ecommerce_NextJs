import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link href="/" className="hover:text-gray-300">My E-commerce Store</Link>
        </div>
        <div className="flex space-x-6">
          <Link href="/" className="hover:text-gray-300">Home</Link>
          <Link href="/about" className="hover:text-gray-300">About Us</Link>
          <Link href="/contact" className="hover:text-gray-300">Contact Us</Link>
          <Link href="/faq" className="hover:text-gray-300">FAQ</Link>
          <Link href="/login" className="hover:text-gray-300">Login</Link>
          <Link href="/register" className="hover:text-gray-300">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;