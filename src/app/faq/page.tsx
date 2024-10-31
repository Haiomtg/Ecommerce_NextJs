'use client';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FAQ = () => {
    const [questions, setQuestions] = useState<string[]>([
        "What is your return policy?",
        "How long does shipping take?",
        "Can I change my order after it's been placed?",
    ]);
    const [newQuestion, setNewQuestion] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newQuestion.trim()) {
            setQuestions([...questions, newQuestion]);
            setNewQuestion("");
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
            <Navbar />
            <div className="flex-grow p-8">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Frequently Asked Questions</h1>
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Posted Questions</h2>
                    <ul className="list-disc list-inside">
                        {questions.map((question, index) => (
                            <li key={index} className="text-lg text-gray-700 mb-2">{question}</li>
                        ))}
                    </ul>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ask a New Question</h2>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <textarea
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        placeholder="Type your question here..."
                        className="p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Submit Question
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default FAQ;
