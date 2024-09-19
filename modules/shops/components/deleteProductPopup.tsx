import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

import { notify } from '@/components/ui/Toast';
import { createCompanyShop } from '@/http/shop';
import { getUserInfo } from '@/http/auth';
import useAuthMutation from '@/hooks/Auth/useAuthMutation';
import { useRouter } from 'next/router';

function CreateProductPopupForm({ togglePopup }: {togglePopup: () => void }) {
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

  const { mutate: CreateShop, isLoading: isCreateShopLoading } = useAuthMutation(createCompanyShop(companyId), {
    onSuccess: (data) => onCreateShopSuccess(data),
    onError: (error) => onCreateShopError(error),
  });

  const [logoFile, setLogoFileName] = useState(null);
  const [cover_imageFile, setCoverImageFileName] = useState(null);

  const handleLogoFileChange = (files: React.SetStateAction<null>[]) => {
    setLogoFileName(files[0]);
  };

  const handleCoverFileChange = (files: React.SetStateAction<null>[]) => {
    setCoverImageFileName(files[0]);
  };

  const handleCreate = async (values: any) => {
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
              <h2 className="text-[30px] font-manropeB leading-[27.04px] font-semibold text-gray-700">Add Product</h2>
              <button onClick={togglePopup} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateProductPopupForm;
