import { useQuery } from "@tanstack/react-query";
import { useFilterStore } from "./useFilterStore";
import PriceFilter from "./PriceFilter";

export default function CategoryFilter() {

    const selectedCategory = useFilterStore((state) => state.selectedCategory)
    const setSelectedCategory = useFilterStore((state) => state.setSelectedCategory)

    //  Bring the categories from fake api
    const { data: categories = [] } = useQuery({

        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('https://fakestoreapi.com/products/categories');
            return res.json()
        }
    })

    const allCategories = ['all', ...categories]

    return (

        <>
            <PriceFilter />




            {/*  category filter bars */}

            
            <div className="flex items-center gap-2 overflow-x-auto py-4 no-scrollbar">
                {allCategories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        type="button"
                        className={`px-4 py-2 rounded-xl text-sm font-medium capitalize whitespace-nowrap transition-all cursor-pointer
                         ${selectedCategory === cat
                                ? 'bg-green-800 dark:bg-green-600 text-white shadow-md shadow-green-200 dark:shadow-none'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600  dark:text-gray-200 hover:bg-gray-200 border dark:hover:bg-gray-700 border-gray-500'
                            }`}
                    >
                        {cat === 'all' ? 'all' : cat}

                    </button>
                ))}
            </div>
</>
      



    

    )
}
