import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="mt-4">
      <Link href="/" className="mr-4">Home</Link>
      <Link href="/product" className="mr-4">Products</Link>
      <Link href="/about" className="mr-4">About Us</Link>
      <Link href="/contact" className="mr-4">Contact Us</Link>
      <Link href="/faq" className="mr-4">FAQ</Link>
      <Link href="/login" className="mr-4">Login</Link>
      <Link href="/register">Register</Link>
    </nav>
  );
};

export default Navbar;