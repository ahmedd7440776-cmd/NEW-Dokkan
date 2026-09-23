
import { useState } from 'react'
import { useCartStore } from '../store/useCartStore'
import { Banknote, CheckCircle2, CreditCard, X } from 'lucide-react'

export default function ChechOutModel({ isOpen, onClose }) {

    const { cart = [], clearCart } = useCartStore()
    const [isSuccess, setIsSuccess] = useState(false)


    // get total
    const totalprice = cart.reduce(
        (sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0
    );


    // form condation
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: '',
        city: '',
        paymentMethod: 'cod' || 'card', // cash or card
        cardNumber: '',
        expieryDay: '',
        cvc: '',
    })

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSuccess(true)
        clearCart();
    }
    console.log('orderdetails:', { items: cart, customer: formData, total: totalprice });


    const handleCloseAll = () => {
        setIsSuccess(false);
        onClose()
    }



    return (
        <div className='fixed inset-0 x-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 '>
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-auto">
                {/* closeing button */}

                <button
                    onClick={handleCloseAll}
                    className='absolute left-4 top-4 dark:text-white text-gray-400 hover:text-gray-600 p-1 rounded-lg'>
                    <X className='w-5 h-5' />
                </button>

                {/* success screen */}


                {isSuccess ? (
                    <div className="text-center py-8 space-y-4 ">
                        <CheckCircle2 className='w-16 h-16 text-green-500 mx-auto animate-bounce' />
                        <h3 className='text-2xl font-bold dark:text-white text-gray-800 '>تم تسجيل طلبك بنجاح!</h3>
                        <p className='text-sm dark:text-white text-gray-500 '>
                            شكرا لتسوقك معنا, سنقوم بالتواصل معك عبر الهاتف لتاكيد الشحن.
                        </p>
                        <div className="bg-gray-50 p-4 rounded-xl text-right text-xs text-gray-600 space-y-1">
                            <p className='text-black dark:text-white'><strong>الاسم:</strong>{formData.fullName}</p>
                            <p className='text-black dark:text-white'><strong>العنوان:</strong>{formData.address}-{formData.city}</p>
                            <p className='text-black dark:text-white'><strong>طريقه الدفع:</strong>{formData.paymentMethod === 'cod' ? 'بطاقه الكترونيه' : "الدفع عند الاستلام"}</p>
                        </div>
                        <button
                            onClick={handleCloseAll}
                            className='w-full py-3 bg-green-600 hover:bg-green-700 dark:text-gray-900 text-white rounded-xl font-medium transition-all'
                        >
                            العوده للمتجر
                        </button>
                    </div>
                ) : (
                    <div>
                        <h2 className='text-xl font-bold dark:text-gray-200 text-gray-800 mb-4'>اتمام الشراء</h2>
                        <form onSubmit={handleSubmit} className='space-y-4'>
                            <div>
                                <label className='block text-xs font-semibold  dark:text-gray-200 text-gray-600 mb-1'>الاسم بالكامل</label>
                                <input
                                    type="text"
                                    name='fullName'
                                    onChange={handleChange}
                                    required
                                    value={formData.fullName}
                                    placeholder=' ادخل اسمك بالكامل'
                                    className='w-full border  dark:text-white border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none   focus:border-green-700 ' />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className='block text-xs font-semibold  dark:text-gray-200 text-gray-600 mb-1'>رقم الهاتف</label>
                                    <input
                                        name='phone'
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder='ادخل رقم الهاتف'
                                        className='w-full border  dark:text-white border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none  focus:border-green-700 '
                                        type="tel" />

                                </div>
                                <div>
                                    <label className='block text-xs font-semibold  dark:text-gray-200 text-gray-600 mb-1'>المدينه</label>
                                    <input
                                        required
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder='القاهره'
                                        type="text"
                                        name="city"
                                        className='w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none  focus:border-green-700 '
                                    />

                                </div>
                                <div>
                                    <label className='block text-xs font-semibold  dark:text-gray-200 text-gray-600 mb-1'>العنوان التفصيلي</label>
                                    <textarea
                                        rows='2'
                                        required
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder='السيده زينب - القاهره'
                                        type="text"
                                        name="address"
                                        className='w-full border border-gray-200 rounded-xl px-3 py-1.5 text-sm focus:outline-none resize-none  focus:border-green-700 '
                                    />

                                </div>

                                <div>
                                    <label className='block text-xs font-semibold  dark:text-gray-200 text-gray-600 mb-1'>طريقه الدفع</label>
                                    <div className='grid grid-cols-2 gap-2 '>

                                        <label className={`flex items-center gap-2 border p-3 dark:hover:bg-gray-800   dark:bg-gray-600 rounded-xl cursor-pointer transition-all  ${formData.paymentMethod === 'cod'
                                            ? 'border-green-600 dark:bg-green-800 bg-green-100/80'
                                            : 'border-gray-200'
                                            }`}>
                                            <input
                                                checked={formData.paymentMethod === 'cod'}
                                                value='cod'
                                                onChange={handleChange}
                                                type="radio"
                                                name="paymentMethod"
                                                className='hidden'
                                            />
                                            <Banknote className='w-5 h-5 text-green-600' />
                                            <span className=' text-xs font-medium  dark:text-gray-200 text-gray-700 text-right' >الدفع عند الاستلام</span>
                                        </label>


                                        <label
                                            className={`flex items-center gap-2 border p-3 rounded-xl cursor-pointer transition-all dark:bg-gray-600  ${formData.paymentMethod === 'card'
                                                ? 'border-green-600 dark:bg-green-800 bg-green-100/80'
                                                : 'border-gray-200'
                                                }`}>

                                            <input
                                                checked={formData.paymentMethod === 'card'}
                                                value='card'
                                                onChange={handleChange}
                                                type="radio"
                                                name="paymentMethod"
                                                className='hidden'
                                            />
                                            <CreditCard className='w-5 h-5 text-green-600' />
                                            <span className='text-xs font-medium  dark:text-gray-200 text-gray-700'>  بطاقه بنكيه (فيزا)</span>
                                        </label>
                                    </div>
                                </div>


                                {/* visa details only shown once its been selected */}


                                {formData.paymentMethod === 'card' && (
                                    <div className="p-4 dark:bg-gray-800 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
                                        <div>
                                            <label className='block text-xs font-medium  dark:text-gray-200 text-gray-600 mb-1 '>رقم البطاقه</label>
                                            <input
                                                name='cardNumber'
                                                required
                                                maxLength='19'
                                                value={formData.cardNumber}
                                                onChange={handleChange}
                                                placeholder='1234 5678 9101 1121'
                                                className='w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none  focus:border-green-700 '
                                                type="text"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 justify-between items-end">
                                            <div>
                                                <label className="font-medium block text-xs   dark:text-gray-200 text-gray-600 mb-1">تاريخ الانتهاء</label>
                                                <input
                                                    name='expieryDay'
                                                    required
                                                    maxLength='5'
                                                    value={formData.expieryDay}
                                                    onChange={handleChange}
                                                    placeholder='MM/YY'
                                                    className='w-full border border-gray-200 dark:bg-gray-800 rounded-lg px-3 py-2 text-sm focus:outline-none bg-white  focus:border-green-700 '
                                                    type="text"
                                                />
                                            </div>

                                            <div>
                                                <label className="font-medium block text-xs  dark:text-gray-200 text-gray-600 mb-1"> رمز CVC</label>
                                                <input
                                                    name='cvc'
                                                    required
                                                    maxLength='4'
                                                    value={formData.cvc}
                                                    onChange={handleChange}
                                                    placeholder='123'
                                                    className='w-full border border-gray-200 rounded-lg px-3 py-2
                                                     text-sm focus:outline-none bg-white  dark:bg-gray-800  focus:border-green-700 '
                                                    type="password"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}


                                {/* total everything */}



                                <div className="bg-green-50 dark:bg-gray-800 dark:border dark:border-gray-300  p-3 rounded-xl flex justify-between items-center text-sm font-bold mt-4">
                                    <span>المبلغ الاجمالي</span>
                                    <span className='text-green-600 text-base '>${totalprice.toFixed(2)}</span>
                                </div>


                                <button
                                    className='w-full  text-white font-medium text-sm transition-all bg-green-600 py-3 rounded-xl hover:bg-green-700'
                                    type='submit'
                                >
                                    {formData.paymentMethod === 'card' ? 'تاكيد الطلب' : 'دفع الان'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}
