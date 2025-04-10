"use client";
import React, { useEffect } from "react";
import { getSession, signIn } from "next-auth/react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  tcNo: Yup.string()
    .matches(/^[1-9][0-9]{10}$/, "T.C. Kimlik No 11 haneli ve geçerli olmalı")
    .required("T.C. Kimlik No zorunludur"),
  password: Yup.string().required("Şifre zorunludur"),
});

const LoginPopup = ({ isOpen, setIsOpen }) => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      tcNo: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
      const res = await signIn("credentials", {
        tc: values.tcNo,
        password: values.password,
        redirect: false,
      });

      if (res?.ok && !res.error) {
        const session = await getSession();

        if (session?.user?.role === "student") {
          router.push("/student-dashboard");
        } else if (session?.user?.role === "teacher") {
          router.push("/teacher-dashboard");
        } else {
          router.push("/");
        }

        setIsOpen(false);
        resetForm();
      } else {
        setErrors({ password: "T.C. Kimlik No veya şifre hatalı" });
      }

      setSubmitting(false);
    },
  });

  // ESC tuşu ile kapatma
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        formik.resetForm();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  // Body scroll kilidi
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
      formik.resetForm();
    }
  };

  return (
    <div className="font-sans">
      {/* Popup Overlay - Fade in/out animasyonu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={handleOverlayClick}
        >
          {/* Popup Container */}
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-bounce-in">
            {/* Kapatma Butonu */}
            <button
              onClick={() => {
                setIsOpen(false);
                formik.resetForm();
              }}
              className="absolute top-4 right-4 text-darklila transition-all duration-200 z-10 bg-orange bg-opacity-50 rounded-full p-1 cursor-pointer"
              aria-label="Kapat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-8 md:w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Animasyonlu Karakterler kaldırıldı */}

            {/* Header */}
            <div className="bg-darklila pt-10 p-6 sm:pt-6 text-center">
              <div className="relative">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Macera Başlıyor!
                </h2>
                <p className="text-white text-lg">
                  Dijital içerikler ile hem eğlen hem öğren.
                </p>
              </div>
            </div>

            {/* Login Form */}
            <form
              onSubmit={formik.handleSubmit}
              className="p-6 space-y-6 bg-gradient-to-b from-white to-purple-50"
            >
              {/* TC Kimlik Input */}
              <div className="space-y-2">
                <label
                  htmlFor="tcNo"
                  className="text-lg font-medium text-purple-700 flex items-center transition-all duration-300 hover:text-purple-900"
                >
                  <svg
                    className="w-6 h-6 mr-2 text-purple-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                    />
                  </svg>
                  T.C. Kimlik Numaran
                </label>
                <div className="relative group">
                  <input
                    id="tcNo"
                    name="tcNo"
                    type="text"
                    maxLength={11}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      formik.setFieldValue("tcNo", value);
                    }}
                    value={formik.values.tcNo}
                    placeholder="11 haneli kimlik numaran"
                    className="pl-4 pr-4 py-4 w-full bg-white border-2 border-purple-300 rounded-xl focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 text-lg transition-all duration-300 shadow-sm group-hover:shadow-md hover:border-purple-400 outline-none"
                  />
                </div>
                {formik.touched.tcNo && formik.errors.tcNo && (
                  <p className="text-orange-500 text-sm">
                    {formik.errors.tcNo}
                  </p>
                )}
              </div>

              {/* Şifre Input */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-lg font-medium text-purple-700 flex items-center transition-all duration-300 hover:text-purple-900"
                >
                  <svg
                    className="w-6 h-6 mr-2 text-purple-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Gizli Şifren
                </label>
                <div className="relative group">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    className="pl-4 pr-4 py-4 w-full bg-white border-2 border-purple-300 rounded-xl focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 text-lg transition-all duration-300 shadow-sm group-hover:shadow-md hover:border-purple-400 outline-none"
                    placeholder="Şifreni yaz"
                  />
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-orange-500 text-sm">
                      {formik.errors.password}
                    </p>
                  )}
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full py-4 mt-6 bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold rounded-xl shadow-lg transform hover:translate-y-px hover:shadow-xl transition-all duration-300 relative overflow-hidden cursor-pointer"
              >
                <span
                  className={`flex justify-center items-center transition-opacity duration-300 ${formik.isSubmitting ? "opacity-0" : "opacity-100"
                    }`}
                >
                  Giriş Yap
                </span>

                {formik.isSubmitting && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </button>
            </form>

            {/* Footer Animasyonu */}
            <div className="bg-darklila p-4">
              <div className="flex justify-center space-x-6">
                <span className="text-3xl animate-bounce delay-100">📝</span>
                <span className="text-3xl animate-bounce delay-300">📚</span>
                <span className="text-3xl animate-bounce delay-500">🎮</span>
                <span className="text-3xl animate-bounce delay-700">🧩</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Özel Stil */}
      <style jsx global>{`
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.03);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-700 {
          animation-delay: 0.7s;
        }

        @keyframes wave {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-wave {
          animation: wave 1.5s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default LoginPopup;
