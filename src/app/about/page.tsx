import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <>
        <Navbar />
        <div className="min-h-screen p-8 bg-gray-50">
            <h1 className="text-4xl font-bold text-center text-gray-800">About Us</h1>
            <p className="mt-4 text-lg text-gray-700">
        Welcome to our eCommerce store! We are dedicated to providing the best products and services to our customers.
      </p>
      <p className="mt-2 text-lg text-gray-700">
        Our mission is to deliver high-quality products at competitive prices while ensuring a seamless shopping experience.
      </p>
      <h2 className="text-3xl font-semibold mt-6 text-gray-800">Our Story</h2>
      <p className="mt-4 text-lg text-gray-700">
        Founded in [Year], our store began with a simple idea: to make shopping for [specific products] easier and more enjoyable. 
        Over the years, we have grown into a trusted name in the industry, serving thousands of satisfied customers.
      </p>
      <h2 className="text-3xl font-semibold mt-6 text-gray-800">Our Values</h2>
      <ul className="mt-4 list-disc list-inside text-lg text-gray-700">
        <li>Customer Satisfaction: We prioritize our customers needs and strive to exceed their expectations.</li>
        <li>Quality: We carefully select our products to ensure they meet high standards of quality and durability.</li>
        <li>Integrity: We believe in honest and transparent business practices.</li>
        <li>Innovation: We continuously seek new ways to improve our services and product offerings.</li>
      </ul>
      <h2 className="text-3xl font-semibold mt-6 text-gray-800">Meet the Team</h2>
      <p className="mt-4 text-lg text-gray-700">
        Our team is composed of passionate individuals who are experts in their fields. From product sourcing to customer service, 
        we work together to ensure that you have the best shopping experience possible.
      </p>
      <h2 className="text-3xl font-semibold mt-6 text-gray-800">Get in Touch</h2>
      <p className="mt-4 text-lg text-gray-700">
        We love hearing from our customers! If you have any questions, feedback, or suggestions, please feel free to reach out to us at 
        <a href="mailto:support@example.com" className="text-blue-500"> support@example.com</a>.
      </p>
      <p className="mt-2 text-lg text-gray-700">
        Thank you for choosing us for your shopping needs. We look forward to serving you!
            </p>
        </div>
        <Footer />
    </>
  );
};

export default About;
