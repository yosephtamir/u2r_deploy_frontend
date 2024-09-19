import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { useRouter } from 'next/router';

import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { notify } from '@/components/ui/Toast';
import { updateProductDetails } from '@/http/shop';
import { getUserInfo } from '@/http/auth';
import useAuthMutation from '@/hooks/Auth/useAuthMutation';
import { getCategoryNames, getProductDetail, getSubCategories } from '@/http/marketplace';


interface EditProductPopupProps {
	togglePopup: () => void;
	shopId: any;
	productId: any;
	productName: any;
	productPrice: any;
	currency: any
}

function EditProductPopupForm({ togglePopup, shopId, productId, productName, productPrice, currency }: EditProductPopupProps) {
	const queryClient = useQueryClient();
	
	const userId = typeof window !== 'undefined' ? localStorage.getItem("userId") : null
	const { data: UserInfo } = useQuery(["user-information", userId], async () => getUserInfo(userId));

	const { data: ProductDetail } = useQuery(['product-detail', productId], async () => getProductDetail(productId))

	const companyId = UserInfo?.data.company.id;
	console.log(companyId, ProductDetail?.data)

	const { data: CategoryNames } = useQuery(['categoryNames'], getCategoryNames)

	const [categoryId, setCategoryId] = useState("")
	const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedCategoryId = event.target.value;
		setCategoryId(selectedCategoryId);
	};

	const { data: SubCategoryies } = useQuery(['subcategories', categoryId], async () => getSubCategories(categoryId));

	const availability_status = ["In Stoke", "Low Stoke", "Out of Stoke"]

	const schema = z.object({
		name: z.string().min(1, { message: 'Product Name is Required.' }).max(50, { message: 'Maximum of 50 characters' }),
		description: z.string().min(50, { message: 'Add a minimum of 50 words' }).max(240, { message: 'Maximum of 240 characters' }),
		price: z.string().min(1, { message: 'Price is Required.' }),
		currency: z.string().min(1, { message: 'Currency is Required.' }),
		status: z.string().min(1, { message: 'Select Stoke Quantity Status' }),
	});

	const form = useForm({
		validate: zodResolver(schema),
		initialValues: {
			name: productName,
			description: '',
			category: '',
			sub_category: '',
			price: productPrice,
			has_discount: false,
			discount_price: '',
			currency: currency,
			tax: '',
			status: '',
			quantity: '',
			product_file: null,
			product_thumbnail: null,
			product_images: null,
		},
	});

	useEffect(() => {
		if (ProductDetail?.data) {
		form.setValues({
			description: ProductDetail.data.description || '',
			category: ProductDetail.data.category || '',
			sub_category: ProductDetail.data.sub_category || '',
			has_discount: ProductDetail.data.has_discount,
			discount_price: ProductDetail.data.discount_price || '',
			tax: ProductDetail.data.tax || '',
			status: ProductDetail.data.status || '',
			quantity: ProductDetail.data.quantity || '',
		});
		setCategoryId(ProductDetail.data.category || '');
		}
	}, [ProductDetail]);

	const { mutate: EditProduct, isLoading: isEditProductLoading } = useAuthMutation(updateProductDetails(companyId, shopId, productId), {
		onSuccess: (data) => {
			onEditProductSuccess(data);
			queryClient.invalidateQueries(['shop-products']);
			queryClient.invalidateQueries(['product-detail']);
		},
		onError: (error) => onEditProductError(error),
	});

	const onEditProductSuccess = (data: { status: number; }) => {
		notify({
			message: 'Product Edited Successfully',
			type: 'success',
			theme: 'light',
		});
	};

	const onEditProductError = (error: any) => {
		console.log(error);
		notify({
			message: error.message,
			type: 'error',
			theme: 'light',
		});
	};

	const [product_file, setProduct_fileName] = useState<File | null>(null);
	const [productThumbnailImage, setProductThumbnailImage] = useState<File | null>(null);;

	const handleProductFileChange = (files: FileList | null) => {
		if (files && files.length > 0) {
			setProduct_fileName(files[0]);
		}	
	};

	const handleProductThumbnailChange = (files: FileList | null) => {
		console.log(files, productThumbnailImage)
		if (files && files.length > 0) {
			setProductThumbnailImage(files[0]);
		}
	};

	
	const [uploadedImages, setUploadedImages] = useState<File[]>([]);
	const handleProductImageFileChange = (files: FileList | null) => {
		if (files) {
			const newFiles = Array.from(files);
			setUploadedImages((prevFiles) => [...prevFiles, ...newFiles]);
		}
		
	};

	// Handle file removal
	const removeFile = (fileToRemove: File) => {
		setUploadedImages((prevFiles) =>
		prevFiles.filter((file) => file !== fileToRemove)
		);
	};

  	const handleEdit = async (values: { 
		name: string;
		description: string;
		product_thumbnail: null;		
		category: string;
		sub_category: string;
		price: string;
		has_discount: boolean;
		discount_price: string;
		currency: string;
		tax: string;
		status: string;
		quantity: string;
		// file_description: string;
		product_file: null;
		product_images: null;
	}) => {
		const payload = {
			...values,
			product_file: product_file,
			product_thumbnail: productThumbnailImage,
			product_image2: uploadedImages[0],
			product_image3: uploadedImages[1],
			product_image4: uploadedImages[2],
			product_image5: uploadedImages[3],
			product_image6: uploadedImages[4],
		};
		console.log(values)
		console.log(payload)
		EditProduct(payload);
		console.log('Sending update request:', values);
	};

  return (
    <>
    {togglePopup && (
	<div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
		<div className="bg-[#ffffff] rounded-lg p-8 max-w-[700px] w-[600px]">
			<div className="flex justify-between items-center mb-10">
				<h2 className="text-[30px] font-manropeB leading-[27.04px] font-semibold text-gray-700">Edit Your Product</h2>
				<button onClick={togglePopup} className="text-gray-500 hover:text-gray-700 focus:outline-none">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
            <form className="flex flex-col gap-6" encType="multipart/form-data" onSubmit={form.onSubmit((values) => handleEdit(values))}>
				<div className="max-w-[1240px] mx-auto flex flex-col md:flex-row gap-10 my-4">
					{/* <div className=""> */}
					<div className="flex flex-col gap-2 border-r-[1px]  md:max-h-[80vh] md:overflow-y-scroll md:scrollbar-thin md:scrollbar-thumb-white-610 border-[#E1E3E2] w-[100%]">
						{/* product details */}
						<div className="p-3 border flex flex-col border-[#00000024] rounded-md mt-3">
							<div className="flex flex-col gap-2">
							<label htmlFor="name" className="font-manropeB leading-[27.04px] font-semibold text-gray-700">
								Product Name <span className="text-[red]">*</span>
							</label>
							<Input
								placeHolder="Add product name"
								id="name"
								{...form.getInputProps('name')}
								className={`w-full border text-black h-[44px] md:h-[60px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] ${form.errors.name ? 'border-red-200' : 'border-slate-50'}`}
								type="text"
							/>
							<p className="text-[red] text-xs">{form.errors.name && form.errors.name}</p>
							<label htmlFor="description" className="font-manropeB leading-[27.04px] font-semibold text-gray-700">
								Product Description <span className="text-[red]">*</span>
							</label>
							<textarea
								placeholder="Enter Description"
								id="description"
								inputMode="none"
								{...form.getInputProps('description')}
								className={`w-full border text-black h-[100px] md:h-[60px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] p-2 rounded-md ${form.errors.description ? 'border-red-200' : 'border-slate-50'}`}                  
							/>
							<p className="text-[red] text-xs">{form.errors.description && form.errors.description}</p>
							<label htmlFor="category" className="font-manropeB leading-[27.04px] font-semibold text-gray-700">
								Product Category <span className="text-[red]">*</span>
							</label>
							<select
								className={`border text-black h-[44px] md:h-[60px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] p-2 rounded-lg text-left ${form.errors.category ? 'border-red-200' : 'border-slate-50'}`}
								value={form.getInputProps('category').value}
								onChange={(event) => {
									handleCategoryChange(event);
									form.getInputProps('category').onChange(event);
								}}
							>
								<option value="" className="placeholder:text-[#000] text-black capitalize" disabled>
									Select product category
								</option>
								{CategoryNames?.data.map((category: any) => (
								<>
									<option className="" key={category.id} value={category.id}>
										{category.name}
									</option>
								</>
								))}
							</select>
							<p className="text-[red] text-xs">{form.errors.category && form.errors.category}</p>
							<label htmlFor="sub_category" className="font-manropeB leading-[27.04px] font-semibold text-gray-700">
								Product Sub-Category <span className="text-[red]">*</span>
							</label>
							<select
								className={`border text-black h-[44px] md:h-[60px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] p-2 rounded-lg text-left ${form.errors.sub_category ? 'border-red-200' : 'border-slate-50'}`}
								{...form.getInputProps('sub_category')}
							>
								<option value="" className="placeholder:text-[#000] text-black capitalize" disabled>
									Select product sub-category
								</option>
								{SubCategoryies?.data.map((sub_category: any) => (
								<>
									<option className="" key={sub_category.id} value={sub_category.id}>
										{sub_category.name}
									</option>
								</>
								))}
							</select>
							<p className="text-[red] text-xs">{form.errors.sub_category && form.errors.sub_category}</p>
							</div>
						</div>
						{/* Product Thumbnail image */}
						<div className="p-3 border flex flex-col border-[#00000024] rounded-md mt-3">
							<label htmlFor="product_thumbnail" className="font-manropeL leading-[27.04px] font-semibold text-gray-700">
							Product Thumbnail <span className="text-[red]">*</span>
							</label>
							<div className="grid grid-cols-1">
							<div className="flex items-center justify-center w-full">
								<label className="flex flex-col rounded-lg border-4 border-dashed w-full h-20 p-10 group text-center">
								<div className="h-full w-full text-center flex flex-col items-center justify-center">
									<p className="pointer-none text-gray-500 mb-4">
									<span className="text-sm">Drag and drop</span> files here{' '}<br />or&nbsp;
									<input
										id="product_thumbnail"
										type="file"
										className="hidden"
										onChange={(event) => {
											handleProductThumbnailChange(event.target.files);
											form.getInputProps('product_thumbnail').onChange(event);
										}}
										value={form.getInputProps('product_thumbnail').value}
									/>
									<label htmlFor="product_thumbnail" className="text-[#64D1FF] hover:underline cursor-pointer">
										select a file&nbsp;
									</label>
										from your computer
									</p>
								</div>
								</label>
							</div>
							</div>
							{/* Display the uploaded image */}
							<div className="mt-3">
							<h3 className="text-gray-700 font-semibold">Uploaded File: </h3>
							<ul className="list-disc list-inside text-gray-500">
								<li className="flex justify-between items-center">
								{productThumbnailImage?.name}
								</li>
							</ul>
							</div>
							<p className="text-sm text-gray-300">
							<span>File type: jpeg, png, jpg</span>
							</p>
						</div>
						{/* Product variation images */}
						<div className="p-3 border flex flex-col border-[#00000024] rounded-md mt-3">
							<label htmlFor="product_images" className="font-manropeL leading-[27.04px] font-semibold text-gray-700">
							Product Image Variations <span className="text-[red]">*</span>
							</label>
							<p className="text-sm text-gray-300 mt-1">
							<span>Upload up to 5 images variations</span>
							</p>
							<div className="grid grid-cols-1">
							<div className="flex items-center justify-center w-full">
								<label className="flex flex-col rounded-lg border-4 border-dashed w-full h-20 p-10 group text-center">
								<div className="h-full w-full text-center flex flex-col items-center justify-center">
									<p className="pointer-none text-gray-500 mb-4">
									<span className="text-sm">Drag and drop</span> files here{' '}<br />or&nbsp;
									<input
										id="product_images"
										type="file"
										className="hidden"
										onChange={(event) => {
											handleProductImageFileChange(event.target.files);
											form.getInputProps('product_images').onChange(event);
										}}
										value={form.getInputProps('product_images').value}
									/>
									<label htmlFor="product_images" className="text-[#64D1FF] hover:underline cursor-pointer">
										select a file&nbsp;
									</label>
										from your computer
									</p>
								</div>
								</label>
							</div>
							</div>
							{/* Display the list of uploaded files */}
							<div className="mt-3">
							<h3 className="text-gray-700 font-semibold">Uploaded Files:</h3>
							<ul className="list-disc list-inside text-gray-500">
							{uploadedImages.map((file, index) => (
								<li key={index} className="flex justify-between items-center">
								{file.name}
								<button
									onClick={() => removeFile(file)}
									className="text-red-500 ml-2"
								>
									Remove
								</button>
								</li>
							))}
							</ul>
							</div>
							<p className="text-sm text-gray-300">
							<span>File type: jpeg, png, jpg</span>
							</p>
						</div>
						{/* Product File */}
						<div className="p-3 border border-[#00000024] rounded-md mt-3">
							<div className="flex flex-col gap-2">
							<label htmlFor="product_file" className=" font-manropeL leading-[27.04px] font-semibold text-gray-700">
								Add Product File
							</label>
							<Input
								placeHolder="Upload Product File"
								id="product_file"
								onChange={(event) => {
									handleProductFileChange(event.target.files);
									form.getInputProps('product_file').onChange(event);
								}}
								value={form.getInputProps('product_file').value}
								className={`w-full text-black border h-[44px] md:h-[60px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] ${form.errors.product_file ? 'border-[red]' : 'border-slate-50'
								}`}
								type="file"
							/>
							<p className="text-[red] text-xs">{form.errors.product_file && form.errors.product_file}</p>
							</div>
						</div>
						{/* Pricing and quantity */}
						<div className="p-3 border flex flex-col-2 border-[#00000024] rounded-md mt-3 gap-4">
							<div className="flex flex-col w-[50%] gap-2">					
							<label htmlFor="price" className="font-manropeB leading-[27.04px] font-semibold text-gray-700">
								Product Price <span className="text-[red]">*</span>
							</label>
							<Input
								placeHolder="00.00"
								id="price"
								{...form.getInputProps('price')}
								className={`w-full border text-black h-[44px] md:h-[60px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] ${form.errors.price ? 'border-red-200' : 'border-slate-50'}`}
								type="text"
								inputMode="none"
								size={100}
							/>
							<p className="text-[red] text-xs">{form.errors.price && form.errors.price}</p>
							<div className='flex gap-5 items-center'>
								<label htmlFor="discount_price" className="font-manropeB leading-[27.04px] font-semibold text-gray-700">
								Product Discount Price
								</label>
								<input
								id="has_discount"
								name="has_discount"
								type="checkbox"
								{...form.getInputProps('has_discount', { type: 'checkbox' })}
								className="w-4 border-[#64D1FF] cursor-pointer"
								/>
							</div>
							<Input
								placeHolder="00.00"
								id="discount_price"
								{...form.getInputProps('discount_price')}
								className={`w-full border text-black h-[44px] md:h-[60px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] ${form.errors.discount_price ? 'border-red-200' : 'border-slate-50'}`}
								type="text"
								inputMode="none"
								size={100}
								disabled={form.values.has_discount === true ? false : true}
							/>
							<p className="text-[red] text-xs">{form.errors.discount_price && form.errors.discount_price}</p>
							<label htmlFor="currency" className="font-manropeB leading-[27.04px] font-semibold text-gray-700">
								Currency <span className="text-[red]">*</span>
							</label>
							<Input
								placeHolder="00.00%"
								id="currency"
								{...form.getInputProps('currency')}
								className={`w-full border text-black h-[44px] md:h-[60px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] ${form.errors.currency ? 'border-red-200' : 'border-slate-50'}`}
								type="text"
								inputMode="none"
								size={100}
							/>
							<p className="text-[red] text-xs">{form.errors.currency && form.errors.currency}</p>
							</div>
							<div className="flex flex-col w-[50%] gap-2">	
							<label htmlFor="tax" className="font-manropeB leading-[27.04px] font-semibold text-gray-700">
								Value Added Tax (VAT) <span className="text-[red]">*</span>
							</label>
							<Input
								placeHolder="00.00%"
								id="tax"
								{...form.getInputProps('tax')}
								className={`w-full border text-black h-[44px] md:h-[60px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] ${form.errors.tax ? 'border-red-200' : 'border-slate-50'}`}
								type="text"
								inputMode="none"
								size={100}
							/>
							<p className="text-[red] text-xs">{form.errors.tax && form.errors.tax}</p>
							<label htmlFor="status" className="font-manropeB leading-[27.04px] font-semibold text-gray-700">
								Availability Status <span className="text-[red]">*</span>
							</label>
							<select
								className={`border text-gray-700 h-[44px] md:h-[60px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] p-2 rounded-lg text-left ${form.errors.status ? 'border-red-200' : 'border-slate-50'}`}
								{...form.getInputProps('status')}
							>
							<option value="" className="placeholder:text-gray-700 text-gray-700 capitalize" disabled>
								Select availability status
							</option>
							{availability_status.map((status: any, index) => (
								<>
								<option className="" key={index}>
									{status}
								</option>
								</>
							))}
							</select>
							<p className="text-[red] text-xs">{form.errors.status && form.errors.status}</p>
							<label htmlFor="quantity" className="font-manropeB leading-[27.04px] font-semibold text-gray-700">
								Stoke Quantity <span className="text-[red]">*</span>
							</label>
							<Input
								placeHolder="0"
								id="quantity"
								{...form.getInputProps('quantity')}
								className={`w-full border text-black h-[44px] md:h-[60px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] ${form.errors.quantity ? 'border-red-200' : 'border-slate-50'}`}
								type="text"
								inputMode="none"
								size={100}
							/>
							<p className="text-[red] text-xs">{form.errors.quantity && form.errors.quantity}</p>
							</div>
						</div>
						<Button
							isLoading={isEditProductLoading}
							intent={'primary'}
							size={'md'}
							className="w-full rounded-lg h-[44px] md:h-[60px] mt-2 mb-4"
							type="submit"
						>
							Edit Details
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

export default EditProductPopupForm;
