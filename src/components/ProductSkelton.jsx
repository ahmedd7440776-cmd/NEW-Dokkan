import React from 'react'

export default function ProductSkelton() {
  return (
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-4 flex flex-col justify-between animate-shimmer">
          {/* مكان الصورة */}
          <div className="aspect-square w-full bg-gray-200 dark:bg-gray-800 rounded-2xl mb-4" />

          {/* تفاصيل المنتج */}
          <div className="space-y-3">
              <div className="flex justify-between">
                  <div className="h-3 w-16 bg-gray-200 dark:bg-gray-800 rounded" />
                  <div className="h-3 w-8 bg-gray-200 dark:bg-gray-800 rounded" />
              </div>
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded" />
              <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-800 rounded" />

              <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-800">
                  <div className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded" />
                  <div className="h-8 w-24 bg-gray-200 dark:bg-gray-800 rounded-xl" />
              </div>
          </div>
      </div>
  )
}


