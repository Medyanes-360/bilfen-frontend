"use client";

import { useState } from "react";

const ContactMe = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Validate email
        if (!validateEmail(formData.email)) {
            alert("Please enter a valid email address.");
            return;
        }

        console.log("Form submitted:", formData);
        alert("Form submitted successfully!");
        // Reset the form fields
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4 text-[color:var(--color-orange)]">
                İletişim
            </h1>
            <p className="mb-4">Aşağıdaki formu kullanarak bizimle iletişime geçin:</p>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium">
                        Ad
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                        placeholder="Adınız"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                        placeholder="Email Adresiniz"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium">
                        Mesaj
                    </label>
                    <textarea
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                        placeholder="Mesajınız"
                        rows="5"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-[color:var(--color-lila)] text-white px-4 py-2 rounded-md hover:bg-[color:var(--color-darklila)] transition duration-300"
                >
                    Gönder
                </button>
            </form>
        </div>
    );
};

export default ContactMe;