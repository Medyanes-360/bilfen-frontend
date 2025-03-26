"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const ContactMeSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Geçerli bir email adresi girin.")
        .required("Email adresi zorunludur."),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("Form submitted:", values);
      setIsSubmitted(true);
      resetForm();
      setTimeout(() => setIsSubmitted(false), 3000);
    },
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    formik.setFieldValue(id, value);
  };

  return (
    <section className="w-full py-20 px-4 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-10 border border-purple-100">
        <h1 className="text-3xl font-bold mb-4 text-[color:var(--color-orange)] text-center">
          İletişim formu
        </h1>
        <p className="mb-8 text-center text-gray-700">
          Aşağıdaki formu kullanarak bizimle iletişime geçin
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-1">
              Adınız
            </label>
            <input
              id="name"
              type="text"
              value={formik.values.name}
              onChange={handleChange}
              placeholder="Adınız"
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-purple-300 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1">
              Email Adresiniz
            </label>
            <input
              id="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="ornek@mail.com"
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-purple-300 focus:outline-none"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold mb-1"
            >
              Mesajınız
            </label>
            <textarea
              id="message"
              rows={5}
              value={formik.values.message}
              onChange={handleChange}
              placeholder="Mesajınızı buraya yazın..."
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-purple-300 focus:outline-none resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="cursor-pointer w-full bg-[color:var(--color-lila)] text-white font-semibold px-6 py-3 rounded-md hover:bg-[color:var(--color-darklila)] transition duration-300 disabled:opacity-50"
          >
            {formik.isSubmitting ? "Gönderiliyor..." : "Gönder"}
          </button>

          {/* Success */}
          {isSubmitted && (
            <p className="text-green-600 font-medium text-center mt-3 animate-pulse">
              Mesajınız başarıyla gönderildi!
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactMeSection;
