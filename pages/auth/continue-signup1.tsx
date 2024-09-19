import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";

import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { notify } from "@/components/ui/Toast";
import AuthLayout from "@/modules/auth/component/authLayout";
import { useAuth } from "@/context/AuthContext";
import SEO from "@/components/SEO";
import { useDispatch, useSelector } from "react-redux";
import { userProfileEntered } from "@/features/user/registrationSlice";
import store from "@/app/store";

const notifyError = (message: string) => notify({
  type: 'error',
  message,
  theme: 'light'
});

function ContinueSignUpOne() {
  const schema = z.object({
    userFirstName: z.string().min(1, { message: 'First name is required' }),
    userMiddleName: z.string().min(1, { message: 'Middle name is required' }),
    userLastName: z.string().min(1, { message: 'Last name is required' }),
    userCountry: z.string().min(1, { message: 'Country is required' }),
    userRegion: z.string().min(1, { message: 'Region is required' }),
    userZone: z.string().min(1, { message: 'Zone is required' }),
    userWoreda: z.string().min(1, { message: 'Woreda is required' }),
    userKebele: z.string().min(1, { message: 'Kebele is required' }),
    userPhoneNumber: z.string().min(1, { message: 'Phone Number is required' }),
    userRole: z.string().min(1, { message: 'Role is required' }),
    //userRenewedIDFront: z.string().min(1, { message: 'ID (Front Side) is required' }),
    //userRenewedIDBack: z.string().min(1, { message: 'ID (Back Side) is required' }),
  });


  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      userFirstName: '',
      userMiddleName: '',
      userLastName: '',
      userCountry: '',
      userRegion: '',
      userZone: '',
      userWoreda: '',
      userKebele: '',
      userPhoneNumber: '',
      userRole: "",
      userRenewedIDFront: [],
      userRenewedIDBack: [],
      profilePic: [],
    },
  });

  const router = useRouter();
  const dispatch = useDispatch()
  const userEmail = useSelector((state: any) => state.registration.email)

  const [userRenewedIDFront, setUserRenewedIDFront] = useState<File | null>(null)
  const [userRenewedIDBack, setUserRenewedIDBack] = useState<File | null>(null)
  const [userProfilePic, setUserProfilePic] = useState<File | null>(null)

  const handleUserRenewedIDFrontChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      setUserRenewedIDFront(files[0]);
    }
	}

  const handleUserRenewedIDBackChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      setUserRenewedIDBack(files[0]);
    }
	}

  const handleUserProfilePicChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      setUserProfilePic(files[0])
    }
  }

  const handleUserInfo = (values: any) => {
    console.log(values)
    const ProfileData = {
        ...values,
        userRenewedIDFront: userRenewedIDFront,
        userRenewedIDBack: userRenewedIDBack,
        profilePic: userProfilePic,
    }
    console.log(ProfileData)
    dispatch(userProfileEntered(ProfileData))
    console.log("Redux state:", store.getState());

    router.push(`/auth/continue-signup2?email=${userEmail}`);
  };

  return (
    <AuthLayout>
      <SEO title='SignUp - ' description='SignUp to your U2R Technologies account.' image="" url="" />
      <div className="text-center lg:text-left">
        <h1 className="mb-1 md:mb-6 font-semibold text-dark-100 font-manropeEB text-2xl md:text-4xl text-[1.5rem]">
          Sign up
        </h1>
        <p className="md:text-[22px] text-[#536066] font-manropeEB">Tell us more about yourself.</p>
      </div>
      <div className="mt-6 md:my-12">
        <form className="flex flex-col" encType="multipart/form-data" onSubmit={form.onSubmit((values) => handleUserInfo(values))}>
          {/* First name */}
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="userFirstName" className=" font-manropeL leading-[27.04px] font-semibold text-gray-700">
              First name
            </label>
            <Input
              placeHolder="Enter First Name"
              id="userFirstName"
              {...form.getInputProps('userFirstName')}
              className={`w-full text-black border h-[44px] md:h-[60px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] ${form.errors.userFirstName ? 'border-[red]' : 'border-slate-50'
                }`}
              type="text"
            />
            <p className="text-[red] text-xs">{form.errors.userFirstName && form.errors.userFirstName}</p>
          </div>

          {/* Middle Name */}
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="userMiddleName" className=" font-manropeL leading-[27.04px] font-semibold text-gray-700">
              Middle name
            </label>
            <Input
              placeHolder="Enter Middle Name"
              id="userMiddleName"
              {...form.getInputProps('userMiddleName')}
              className={`w-full text-black border h-[44px] md:h-[60px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] ${form.errors.userMiddleName ? 'border-[red]' : 'border-slate-50'
                }`}
              type="text"
            />
            <p className="text-[red] text-xs">{form.errors.userMiddleName && form.errors.userMiddleName}</p>
          </div>

          {/* last Name */}
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="userLastName" className=" font-manropeL leading-[27.04px] font-semibold text-gray-700">
              Last name
            </label>
            <Input
              placeHolder="Enter Last Name"
              id="userLastName"
              {...form.getInputProps('userLastName')}
              className={`w-full text-black border h-[44px] md:h-[60px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] ${form.errors.userLastName ? 'border-[red]' : 'border-slate-50'
                }`}
              type="text"
            />
            <p className="text-[red] text-xs">{form.errors.userLastName && form.errors.userLastName}</p>
          </div>

          {/* Country */}
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="userCountry" className=" font-manropeL leading-[27.04px] font-semibold text-gray-700">
              Country
            </label>
            <Input
              placeHolder="Enter Country"
              id="userCountry"
              {...form.getInputProps('userCountry')}
              className={`w-full text-black border h-[44px] md:h-[60px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] ${form.errors.userCountry ? 'border-[red]' : 'border-slate-50'
                }`}
              type="text"
            />
            <p className="text-[red] text-xs">{form.errors.userCountry && form.errors.userCountry}</p>
          </div>

          {/* Region and Zone */}
          <div className="flex gap-5">
            <div className="flex flex-col flex-1 gap-2 mb-2">
              <label htmlFor="userRegion" className=" font-manropeL leading-[27.04px] font-semibold text-gray-700">
                Region
              </label>
              <Input
                placeHolder="Enter Region"
                id="userRegion"
                {...form.getInputProps('userRegion')}
                className={`w-full text-black border h-[44px] md:h-[60px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] ${form.errors.userRegion ? 'border-[red]' : 'border-slate-50'
                  }`}
                type="text"
              />
              <p className="text-[red] text-xs">{form.errors.userRegion && form.errors.userRegion}</p>
            </div>
            <div className="flex flex-col flex-1 gap-2 mb-2">
              <label htmlFor="userZone" className=" font-manropeL leading-[27.04px] font-semibold text-gray-700">
                Zone
              </label>
              <Input
                placeHolder="Enter Zone"
                id="userZone"
                {...form.getInputProps('userZone')}
                className={`w-full text-black border h-[44px] md:h-[60px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] ${form.errors.userZone ? 'border-[red]' : 'border-slate-50'
                  }`}
                type="text"
              />
              <p className="text-[red] text-xs">{form.errors.userZone && form.errors.userZone}</p>
            </div>
          </div>

          {/* Woreda and Kebele */}
          <div className="flex gap-5">
            <div className="flex flex-col flex-1 gap-2 mb-2">
              <label htmlFor="userWoreda" className=" font-manropeL leading-[27.04px] font-semibold text-gray-700">
                Woreda
              </label>
              <Input
                placeHolder="Enter Woreda"
                id="userWoreda"
                {...form.getInputProps('userWoreda')}
                className={`w-full text-black border h-[44px] md:h-[60px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] ${form.errors.userWoreda ? 'border-[red]' : 'border-slate-50'
                  }`}
                type="text"
              />
              <p className="text-[red] text-xs">{form.errors.userWoreda && form.errors.userWoreda}</p>
            </div>
            <div className="flex flex-col flex-1 gap-2 mb-2">
              <label htmlFor="userKebele" className=" font-manropeL leading-[27.04px] font-semibold text-gray-700">
                Kebele
              </label>
              <Input
                placeHolder="Enter Kebele"
                id="userKebele"
                {...form.getInputProps('userKebele')}
                className={`w-full text-black border h-[44px] md:h-[60px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] ${form.errors.userKebele ? 'border-[red]' : 'border-slate-50'
                  }`}
                type="text"
              />
              <p className="text-[red] text-xs">{form.errors.userKebele && form.errors.userKebele}</p>
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="userPhoneNumber" className=" font-manropeL leading-[27.04px] font-semibold text-gray-700">
              Phone Number
            </label>
            <Input
              placeHolder="Enter Phone Number"
              id="userPhoneNumber"
              {...form.getInputProps('userPhoneNumber')}
              className={`w-full text-black border h-[44px] md:h-[60px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] ${form.errors.userPhoneNumber ? 'border-[red]' : 'border-slate-50'
                }`}
              type="text"
            />
            <p className="text-[red] text-xs">{form.errors.userPhoneNumber && form.errors.userPhoneNumber}</p>
          </div>

          {/* Dropdown Choice */}
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="userRole" className="font-manropeL leading-[27.04px] font-semibold text-gray-700">
              User Role
            </label>
            <select
              id="userRole"
              {...form.getInputProps('userRole')}
              className={`w-full text-black border h-[44px] md:h-[60px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] rounded-[10px] px-4 focus-within:border-[#64D1FF] ${form.errors.userRole ? 'border-[red]' : 'border-slate-50'
                }`}
            >
              <option value="" disabled>I am a...</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              {/* Add more options as needed */}
            </select>
            <p className="text-[red] text-xs">{form.errors.userRole && form.errors.userRole}</p>
          </div>

          {/* Renewed ID Front */}
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="userRenewedIDFront" className=" font-manropeL leading-[27.04px] font-semibold text-gray-700">
              Renewed ID - Front
            </label>
            <Input
              placeHolder="Upload ID - Front Side"
              id="userRenewedIDFront"
              onChange={(event) => {
                handleUserRenewedIDFrontChange(event.target.files);
                form.getInputProps('userRenewedIDFront').onChange(event);
              }}
              value={form.getInputProps('userRenewedIDFront').value}
              className={`w-full text-black border h-[44px] md:h-[60px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] ${form.errors.userRenewedIDFront ? 'border-[red]' : 'border-slate-50'
                }`}
              type="file"
            />
            <p className="text-[red] text-xs">{form.errors.userRenewedIDFront && form.errors.userRenewedIDFront}</p>
          </div>

          {/* Renewed ID Back */}
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="userRenewedIDBack" className=" font-manropeL leading-[27.04px] font-semibold text-gray-700">
              Renewed ID - Back
            </label>
            <Input
              placeHolder="Upload ID - Back Side"
              id="userRenewedIDBack"
              onChange={(event) => {
                handleUserRenewedIDBackChange(event.target.files);
                form.getInputProps('userRenewedIDBack').onChange(event);
              }}
              value={form.getInputProps('userRenewedIDBack').value}
              className={`w-full text-black border h-[44px] md:h-[60px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] ${form.errors.userRenewedIDBack ? 'border-[red]' : 'border-slate-50'
                }`}
              type="file"
            />
            <p className="text-[red] text-xs">{form.errors.userRenewedIDBack && form.errors.userRenewedIDBack}</p>
          </div>
          {/* profilePic */}
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="profilePic" className=" font-manropeL leading-[27.04px] font-semibold text-gray-700">
              Profile Picture
            </label>
            <Input
              placeHolder="Upload ID - Back Side"
              id="profilePic"
              onChange={(event) => {
                handleUserProfilePicChange(event.target.files);
                form.getInputProps('profilePic').onChange(event);
              }}
              value={form.getInputProps('profilePic').value}
              className={`w-full text-black border h-[44px] md:h-[60px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] ${form.errors.profilePic ? 'border-[red]' : 'border-slate-50'
                }`}
              type="file"
            />
            <p className="text-[red] text-xs">{form.errors.profilePic && form.errors.profilePic}</p>
          </div>
          <Button
            isLoading={false}
            intent={'primary'}
            size={'sm'}
            className={`w-full h-[44px] md:h-[60px] rounded-lg mt-3 `}
            type="submit"
          >
            Continue
          </Button>
        </form>
        <div className="mt-6">
          <p className="text-center text-custom-color30 text-[0.875rem] md:font-semibold font-[400] font-manropeL">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-[#64D1FF]">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ContinueSignUpOne;