import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { notify } from '@/components/ui/Toast';
import { createCompanyShop } from '@/http/shop';
import { getUserInfo } from '@/http/auth';
import useAuthMutation from '@/hooks/Auth/useAuthMutation';
import { useRouter } from 'next/router';

function CreateShopPopupForm({ togglePopup }: {togglePopup: () => void }) {
  const userId = typeof window !== 'undefined' ? localStorage.getItem("userId") : null
  const { data: UserInfo } = useQuery(["user-information", userId], async () => getUserInfo(userId));

  const companyId = UserInfo?.data.company.id;

  const schema = z.object({
    name: z.string().min(1, { message: 'Shop Name is Required.' }),
    description: z.string(),
  });

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      name: '',
      description: '',
    },
  });

  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: CreateShop, isLoading: isCreateShopLoading } = useAuthMutation(createCompanyShop(companyId), {
    onSuccess: (data) => {
      onCreateShopSuccess(data),
      queryClient.invalidateQueries(['company-all-shops']);
    },
    onError: (error) => onCreateShopError(error),
  });

  const [logoFile, setLogoFileName] = useState(null);
  const [cover_imageFile, setCoverImageFileName] = useState(null);

  const handleLogoFileChange = (files: any) => {
    setLogoFileName(files[0]);
  };

  const handleCoverFileChange = (files: any) => {
    setCoverImageFileName(files[0]);
  };

  const handleCreate = async (values: { name: string; description: string; }) => {
    const payload = {
      ...values,
      logo: logoFile,
      cover_image: cover_imageFile
    };

    CreateShop(payload);
  };

  const onCreateShopSuccess = (data: { status: number; }) => {
    if (data.status === 200) {
      router.push('/shops/me');
      return;
    }
    notify({
      message: 'Shop Created Successfully',
      type: 'success',
      theme: 'light',
    });
  };

  const onCreateShopError = (error: any) => {
    console.log(error);
    notify({
      message: error.message,
      type: 'error',
      theme: 'light',
    });
  };

  return (
    <>
      {togglePopup && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-[#ffffff] rounded-lg p-8 max-w-md w-[500px]">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-[30px] font-manropeB leading-[27.04px] font-semibold text-gray-700">Create Your Shop</h2>
              <button onClick={togglePopup} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form className="flex flex-col gap-6" encType="multipart/form-data" onSubmit={form.onSubmit((values) => handleCreate(values))}>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-manropeB leading-[27.04px] font-semibold text-gray-700">
                  Your Shop Name
                </label>
                <Input
                  placeHolder="Enter Shop Name"
                  id="Enter your Shop Name"
                  {...form.getInputProps('name')}
                  className={`w-full border text-black h-[44px] md:h-[60px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] ${form.errors.name ? 'border-red-200' : 'border-slate-50'}`}
                  type="text"
                />
                <p className="text-[red] text-xs">{form.errors.name && form.errors.name}</p>
                <label htmlFor="description" className="font-manropeB leading-[27.04px] font-semibold text-gray-700">
                  Description
                </label>
                <Input
                  placeHolder="Enter Description"
                  id="description"
                  {...form.getInputProps('description')}
                  className={`w-full border text-black h-[44px] md:h-[60px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] ${form.errors.description ? 'border-red-200' : 'border-slate-50'}`}
                />
                <p className="text-[red] text-xs">{form.errors.description && form.errors.description}</p>
                <div className="flex flex-col gap-2 mb-2">
                  <label htmlFor="logo" className=" font-manropeL leading-[27.04px] font-semibold text-gray-700">
                    Shop Logo
                  </label>
                  <Input
                    placeHolder="Upload Shop Logo"
                    id="logo"
                    onChange={(event) => {
                      handleLogoFileChange(event.target.files);
                      form.getInputProps('logo').onChange(event);
                    }}
                    value={form.getInputProps('logo').value}
                    className={`w-full text-black border h-[44px] md:h-[60px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] ${form.errors.logo ? 'border-[red]' : 'border-slate-50'
                      }`}
                    type="file"
                  />
                  <p className="text-[red] text-xs">{form.errors.logo && form.errors.logo}</p>
                </div>
                <div className="flex flex-col gap-2 mb-2">
                  <label htmlFor="cover_image" className=" font-manropeL leading-[27.04px] font-semibold text-gray-700">
                    Shop Cover Image
                  </label>
                  <Input
                    placeHolder="Upload Shop Cover Image"
                    id="cover_image"
                    onChange={(event) => {
                      handleCoverFileChange(event.target.files);
                      form.getInputProps('cover_image').onChange(event);
                    }}
                    value={form.getInputProps('cover_image').value}
                    className={`w-full text-black border h-[44px] md:h-[60px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] ${form.errors.cover_image ? 'border-[red]' : 'border-slate-50'
                      }`}
                    type="file"
                  />
                  <p className="text-[red] text-xs">{form.errors.cover_image && form.errors.cover_image}</p>
                </div>
                <Button
                  isLoading={isCreateShopLoading}
                  intent={'primary'}
                  size={'md'}
                  className="w-full rounded-lg h-[44px] md:h-[60px]"
                  type="submit"
                >
                  Create
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateShopPopupForm;
