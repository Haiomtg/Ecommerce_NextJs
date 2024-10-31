'use client';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
        });

        if (response.ok) {
            alert("Your message has been sent!");
            setTitle("");
            setContent("");
        } else {
            alert("Failed to send your message. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
            <Navbar />
            <div className="flex-grow p-8">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Contact Us</h1>
                <form onSubmit={handleSubmit} className="flex flex-col max-w-md mx-auto">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <textarea
                        placeholder="Your message..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Send
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;
