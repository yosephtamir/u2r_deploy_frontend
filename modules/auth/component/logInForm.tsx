import React, { useEffect, useState} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Eye, EyeSlash } from "iconsax-react";
import z from 'zod';
import { useForm, zodResolver } from "@mantine/form";
import { useDispatch, useSelector } from 'react-redux';

import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { notify } from "@/components/ui/Toast";

import AuthLayout from "./authLayout";
import useAuthMutation from "@/hooks/Auth/useAuthMutation";
import { loginUser } from "@/http/auth";
import {loginSuccess, loginFailure} from '../../../features/auth/authSlice'

function LogInForm() {
    const dispatch = useDispatch()

    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isMicrosoftEdge, setIsMicrosoftEdge] = useState(false)

    const schema = z.object({
        email: z.string().email({ message: 'An Email is Required.' }),
        password: z.string().min(1, { message: 'Password is Required.' }),
    });

    const form = useForm({
        validate: zodResolver(schema),
        initialValues: {
            email: '',
            password: '',
        },
    });

    const { mutate: LoginUser, isLoading: isLoginUserLoading } = useAuthMutation(loginUser, {
        onSuccess: (data) => onLoginUserSuccess(data),
        onError: (error: any) => onLoginUserError(error),
    });

    const handleLogin = (values: any) => {
        LoginUser({ email: values.email, password: values.password })
    };

    const router = useRouter();
    const previousUrl = useSelector((state: any) => state.navigation.previousUrl);
    console.log(previousUrl)

    const onLoginUserSuccess = (data: any) => {
        dispatch(loginSuccess(data?.data));
        localStorage.setItem('token', data?.data.access);
        localStorage.setItem('userId', data?.data.id);

        if (previousUrl) {
            router.push(previousUrl); // Redirect to the previous URL
        } else {
            router.push('/'); // Fallback to a default page
        }

        notify({
            message: 'Login Successful',
            type: 'success',
            theme: 'light',
        });
    };

    const onLoginUserError = (error: any) => {
        // For a user who has not verified their account
        dispatch(loginFailure({ error: error.message || 'Logging in failed' }));
        if (error.status === 403) {
            notify({
                message: error.message,
                type: 'error',
                theme: 'light',
            });
            router.push('/auth/verification-complete');
            return;
        }
        console.log(error)

        notify({
            message: error.message,
            type: 'error',
            theme: 'light',
        });
    };

    useEffect(() => {
        // Check if the user is using Microsoft Edge
        if (window.navigator.userAgent.includes('Edg') || window.navigator.userAgent.includes('Edge')) {
            setIsMicrosoftEdge(true);
        }
    }, []);

    return (
        <AuthLayout>
            <div className="md:mx-auto lg:mb-20 font-manropeL">
                <div className="md:flex sm:flex flex-col items-center justify-center lg:items-start">
                    <p className=" font-manropeEB text-2xl md:text-4xl  text-[1.5rem] mb-1 md:mb-6 text-center lg:text-left ">
                        Log In
                    </p>
                    <p className="text-[#6B797F]  mt-[1rem] md:text-[22px] font-manropeB lg:text-[20px] xl:text-[1.375rem] leading-[28px]  lg:font-semibold text-center md:text-left">
                        Log in to continue using U2R Technologies.
                    </p>
                </div>
                <div className="mt-6 md:my-12">
                    <form className="flex flex-col gap-6" onSubmit={form.onSubmit((values) => handleLogin(values))}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="font-manropeB">
                                Email Address
                            </label>
                            <Input
                                placeHolder="Enter Email"
                                id="Enter your email"
                                {...form.getInputProps('email')}
                                className={`w-full border text-black h-[44px] md:h-[60px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] ${form.errors.email ? 'border-red-200' : 'border-slate-50'}`}
                                type="email"
                            />
                            <p className="text-[red] text-xs">{form.errors.email && form.errors.email}</p>
                            <label htmlFor="email" className="font-manropeB">
                                password
                            </label>
                            <Input
                                placeHolder="Enter password"
                                id="Enter your password"
                                {...form.getInputProps('password')}
                                className={`w-full border text-black h-[44px] md:h-[60px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] ${form.errors.email ? 'border-red-200' : 'border-slate-50'}`}
                                type={isPasswordShown ? "text" : "password"}
                                rightIcon={isMicrosoftEdge ? null : (
                                    isPasswordShown ? (
                                        <Eye className="cursor-pointer" onClick={() => setIsPasswordShown(false)} />
                                    ) : (
                                        <EyeSlash className="cursor-pointer" onClick={() => setIsPasswordShown(true)} />
                                    )
                                )}
                            />
                            <p className="text-[red] text-xs">{form.errors.email && form.errors.email}</p>
                            <div className="flex justify-end mt-3 mb-[17px]">
                                <Link href="/auth/forgot-password">
                                    <span className=" font-manrope text-[#64D1FF] text-right  text-xs md:text-sm ">
                                        Forgot Password ?
                                    </span>
                                </Link>
                            </div>
                            <Button
                                isLoading={isLoginUserLoading}
                                intent={'primary'}
                                size={'md'}
                                className="w-full rounded-lg h-[44px] md:h-[60px]"
                                type="submit"
                            >
                                Continue
                            </Button>
                        </div>
                    </form>
                    <div>
                        <p className=" text-custom-color20 text-center text-[0.875rem]  md:font-semibold font-[400] mt-[1rem] leading-5">
                            Don&apos;t have an account?
                            <Link href="/auth/signup">
                                <span className="text-[#64D1FF]"> Sign Up</span>
                            </Link>
                        </p>
                    </div>
                    <div className="text-white-650 flex justify-between items-center my-6 lg:my-10">
                        <span className="w-full h-[1px] bg-white-650"></span>
                        <span className=" manropeL text-sm px-3">OR</span>
                        <span className="w-full h-[1px] bg-white-650"></span>
                    </div>
                    <div className="flex flex-col gap-y-4">
                        SignUpWithGoogle
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};

export default LogInForm;