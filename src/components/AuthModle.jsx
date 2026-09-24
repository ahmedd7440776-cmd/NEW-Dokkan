import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { X, User, Mail, Lock } from 'lucide-react';
import ReactDOM from 'react-dom'

export default function AuthModle({ isOpen, onClose }) {
    const [isLogin, setIsLogin] = useState(true); //  to switch btw login و register
    const login = useAuthStore((state) => state.login);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        // will be closed on success login
        login({
            name: isLogin ? (formData.email ? formData.email.split('@')[0] : 'مستخدم') : formData.name,
            email: formData.email,
        });

        onClose();
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-999 flex items-center shadow-2xl justify-center bg-gray-600/60 dark:bg-white/60 backdrop-blur-md transition-opacity duration-300  p-4  ">
            <div  dir='rtl' className="bg-white dark:bg-gray-800 rounded-2xl max-w-120 w-full p-6 py-13 shadow-2xl relative border border-gray-100 ">
                {/* closing button */}
                <button
                    onClick={onClose}
                    type="button"
                    className="absolute right-4 top-4 text-red-400 hover:text-red-600 p-1 cursor-pointer"
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-xl font-bold dark:text-white text-gray-800 mb-2">
                    {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
                </h2>
                <p className="text-xs dark:text-white text-gray-500 mb-6">
                    {isLogin
                        ? 'مرحباً بك مجدداً! أدخل بياناتك للمتابعة.'
                        : 'قم بإنشاء حساب للاستفادة من كافة مميزات المتجر.'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label className="block text-xs font-semibold  dark:text-white text-gray-600 mb-1">الاسم بالكامل</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder= 'ادخل الاسم بالكامل'
                                    className="w-full border dark:bg-gray-800 dark:text-white border-gray-200 rounded-xl pr-10 pl-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                                />
                                <User className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-semibold  dark:text-white  text-gray-600 mb-1">البريد الإلكتروني</label>
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="example@mail.com"
                                className="w-full border   dark:bg-gray-800 dark:text-white border-gray-200 rounded-xl pr-10 pl-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                            />
                            <Mail className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold dark:text-white text-gray-600 mb-1">كلمة المرور</label>
                        <div className="relative">
                            <input
                                type="password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full border  dark:bg-gray-800 dark:text-white border-gray-200 rounded-xl pr-10 pl-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                            />
                            <Lock className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-green-800 hover:bg-green-900 text-white rounded-xl font-medium text-sm transition-all shadow-md mt-2 cursor-pointer"
                    >
                        {isLogin ? 'تسجيل الدخول' : 'إنشاء الحساب'}
                    </button>
                </form>

                {/*  switching btw login and creating a new one*/}
                <div className="mt-4 text-center text-xs dark:text-white text-gray-500">
                    {isLogin ? 'ليس لديك حساب؟ ' : 'لديك حساب بالفعل؟ '}
                    <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-green-800 dark:text-green-400 font-bold hover:underline cursor-pointer"
                    >
                        {isLogin ? 'أنشئ حساباً الآن' : 'تسجيل الدخول'}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}






