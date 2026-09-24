import { useFilterStore } from "./useFilterStore";

export default function PriceFilter() {
    const { maxPrice, setMaxPrice } = useFilterStore();

    return (
        <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 my-4 md:w-100">
            <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    أقصى سعر: <strong className="text-green-600 dark:text-green-400">{maxPrice} ج.م</strong>
                </span>
                <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full sm:w-48 accent-green-600 cursor-pointer"
                />
            </div>
        </div>
    );
}