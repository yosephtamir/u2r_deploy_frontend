import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { getCategoryNames, getSubCategories } from '@/http/marketplace';

interface FilterPopupProps {
  togglePopup: () => void;
}

const KeyWordNames = {
  data: [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Fashion' },
    { id: 3, name: 'Home & Kitchen' },
    { id: 4, name: 'Beauty & Personal Care' },
    { id: 5, name: 'Sports & Outdoors' },
    { id: 6, name: 'Automotive' },
    { id: 7, name: 'Books & Magazine' },
    { id: 8, name: 'Toys & Games' },
    { id: 9, name: 'Health & Wellness' },
    { id: 10, name: 'Groceries' },
    { id: 11, name: 'Handmade' },
    { id: 12, name: 'Office Products' },
    { id: 13, name: 'Garden & Outdoor' },
    { id: 14, name: 'Baby' },
    { id: 15, name: 'Tools & Home Improvement' },
  ],
};

const DiscountFilterNames = {
  data: [
    { id: 1, name: 'All' },
    { id: 2, name: '25% Off or More' },
    { id: 3, name: '50% Off or More' },
    { id: 4, name: '75% Off or More' },
    { id: 5, name: 'Holiday Specials' },
    { id: 6, name: 'Buy One Get One Free' },
    { id: 7, name: 'Limited Time Offer' },
    { id: 8, name: 'Seasonal Discounts' },
  ],
};

const RatingFilterNames = {
  data: [
    { id: 1, name: '1 Star' },
    { id: 2, name: '2 Stars' },
    { id: 3, name: '3 Stars' },
    { id: 4, name: '4 Stars' },
    { id: 5, name: '5 Stars' },
  ],
};

const PriceFilterNames = {
  data: [
    { id: 1, name: 'Lowest to Highest' },
    { id: 2, name: 'Highest to lowest' },
  ],
};

function FilterPopup({ togglePopup }: FilterPopupProps) {
	const [category, setCategory] = useState('');
	const [subcategory, setSubcategory] = useState('');
	const [discount, setDiscount] = useState('');
	const [keyword, setKeyWord] = useState('');
	const [rating, setRating] = useState('');
	const [price, setPrice] = useState('');
	const [minPrice, setMinPrice] = useState('');
	const [maxPrice, setMaxPrice] = useState('');

  const handleFilter = () => {
    // Implement filter logic here
    togglePopup();
  };

  const { data: CategoryNames } = useQuery(['categoryNames'], getCategoryNames)

  const handleCategoryClick = (categoryId: string) => {
    setCategory(categoryId);
    // Implement filtering logic here
  };

//   const { data: SubCategoryies } = useQuery(['subcategories', categoryId], async () => getSubCategories(categoryId));
//   const handleSubCategoryClick = (categoryId: string) => {
//     setSubcategory(categoryId);
//   };

  const handleKeyWordClick = (keywordId: string) => {
    setKeyWord(keywordId);
  };

  const handleDiscountClick = (discountId: string) => {
	setDiscount(discountId)
  };

  const handleRatingClick = (ratingId: string) => {
	setRating(ratingId)
  };

  const handlePriceClick = (priceId: string) => {
	setPrice(priceId)
  };

  return (
    <>
      {togglePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white-100 rounded-lg p-8 max-w-[700px] lg:w-[700px] md:w-[500px] sm:w-[400px]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-700">Filter Content just for You</h2>
              <button onClick={togglePopup} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form>
				<div className="flex flex-col gap-2 border-r-[1px]  max-h-[80vh] sm:max-h-[70vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-white-610 border-[#E1E3E2]">
                <div className="mb-4">
					<label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-2">By Category</label>
					<div id="category-filter" className="flex flex-wrap gap-2">
						{CategoryNames.data.map((category: any, index: React.Key | null | undefined) => (
						<Button
							key={index}
							intent={'secondary'}
							size={'sm'}
							type="button"
							className="h-[30px]"
							onClick={() => handleCategoryClick(category.id)}
						>
							{category.name}
						</Button>
						))}
					</div>
				</div>
                <div className="mb-4">
                    <label htmlFor="sub_category-filter" className="block text-sm font-medium text-gray-700 mb-2">By Sub-category</label>
                </div>
                <div className="mb-4">
                    <label htmlFor="discount-filter" className="block text-sm font-medium text-gray-700 mb-2">By Discount</label>
					<div id="discount-filter" className="flex flex-wrap gap-2">
						{DiscountFilterNames.data.map((discount: any, index: React.Key | null | undefined) => (
						<Button
							key={index}
							intent={'secondary'}
							size={'sm'}
							type="button"
							className="h-[30px]"
							onClick={() => handleDiscountClick(discount.id)}
						>
							{discount.name}
						</Button>
						))}
					</div>
                </div>
                <div className="mb-4">
                    <label htmlFor="keyword-filter" className="block text-sm font-medium text-gray-700 mb-2">By KeyWords</label>
					<div id="keyword-filter" className="flex flex-wrap gap-2">
						{KeyWordNames.data.map((keyword: any, index: React.Key | null | undefined) => (
						<Button
							key={index}
							intent={'secondary'}
							size={'sm'}
							type="button"
							className="h-[30px]"
							onClick={() => handleKeyWordClick(keyword.id)}
						>
							{keyword.name}
						</Button>
						))}
					</div>
                </div>
				<div className="mb-4">
                    <label htmlFor="rating-filter" className="block text-sm font-medium text-gray-700 mb-2">By Rating</label>
					<div id="rating-filter" className="flex flex-wrap gap-2">
						{RatingFilterNames.data.map((rating: any, index: React.Key | null | undefined) => (
						<Button
							key={index}
							intent={'secondary'}
							size={'sm'}
							type="button"
							className="h-[30px]"
							onClick={() => handleRatingClick(rating.id)}
						>
							{rating.name}
						</Button>
						))}
					</div>
                </div>
				<div className='w-[100%]'>
					<label htmlFor="price-filter" className="block text-sm font-medium text-gray-700 mb-2">By Price</label>
					<div className='flex items-center justify-between w-[60%] mr-4'>
						<div className="mb-4 w-[45%]">
							<label htmlFor="min-price" className="block text-sm text-gray-500">Min Price</label>
							<Input
								type="number"
								id="min-price"
								value={minPrice}
								onChange={(e) => setMinPrice(e.target.value)}
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
								placeholder="0"
							/>
						</div>
						<div className="mb-4 w-[45%]">
							<label htmlFor="max-price" className="block text-sm  text-gray-500">Max Price</label>
							<Input
								type="number"
								id="max-price"
								value={maxPrice}
								onChange={(e) => setMaxPrice(e.target.value)}
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								placeholder="1000"
							/>
						</div>
					</div>
				</div>
				<div className='flex items-center justify-center gap-10 w-[100%]'>
					<Button
						intent={'secondary'}
						size={'md'}
						className="w-[40%]"
						type="button"
						onClick={handleFilter}
					>
						Reset
					</Button>
					<Button
						intent={'primary'}
						size={'md'}
						className="w-[40%]"
						type="button"
						onClick={handleFilter}
					>
						Apply
					</Button>
				</div>
                </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default FilterPopup;
