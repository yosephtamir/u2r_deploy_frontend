import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, EyeSlash } from "iconsax-react";
import { useRouter } from "next/router";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";

import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { notify } from "@/components/ui/Toast";
import AuthLayout from "./authLayout";
import useAuthMutation from "@/hooks/Auth/useAuthMutation";
import { signUpUserWithEmail } from "@/http/auth";
import { userEmailEntered } from "@/features/user/registrationSlice";


const notifyError = (message: string) => notify({
    type: 'error',
    message,
    theme: 'light'
});

function SignUpWithEmail() {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);
    const [isMicrosoftEdge, setIsMicrosoftEdge] = useState(false)
    
    const schema = z.object({
        email: z.string().email({ message: 'An Email is Required.' }),
        password: z.string().regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{6,}$/, { message: 'Please match requirements.' }),
        confirmPassword: z.string().min(2, { message: 'Confirm Password is required.' })
    })
        .superRefine(({ password, confirmPassword }, ctx) => {
            if (password !== confirmPassword) {
                ctx.addIssue({
                    path: ['confirmPassword'],
                    code: 'custom',
                    message: 'Password do not match.',
                });
            }
        });


    const form = useForm({
        validate: zodResolver(schema),
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            agree: false,
        },
    });

    const { mutate: signUpUser, isLoading: isUserSigningUp } = useAuthMutation(signUpUserWithEmail, {
        onSuccess: (data) => onSignUpWithEmailSuccess(data),
        onError: (error: any) => onSignUpWithEmailError(error),
    });

    const router = useRouter();
    const userEmail = useSelector((state: any) => state.registration.email)

    const onSignUpWithEmailSuccess = (res: any) => {
        if (res.status === 200) {
             if (res.data.is_email_available) {
                console.log("The data: ", res.data)
                router.push(`/auth/continue-signup1?email=${userEmail}`);
                return;
            } else {
                console.log("The error: ", res.data)
                notify({message: "User Already Exist"});
            };
            return;
        }
    };

    const onSignUpWithEmailError = (error: any) => {
        console.log(error)

        // for axios timeout error
        if (error.message === 'AxiosError: timeout of 30000ms exceeded') {
            const timeoutErrorMessage =
                'Oops! The request timed out. Please try again later. If the problem persists, please contact support.';
            notifyError(timeoutErrorMessage);
            return;
        }
        // Error sent from API
        notifyError(error.message);
    };

    const dispatch = useDispatch()

    const handleSignUpWithEmail = (values: any) => {
        dispatch(userEmailEntered(values))
        signUpUser({ email: values.email });
    };

    useEffect(() => {
        // Check if the user is using Microsoft Edge
        if (window.navigator.userAgent.includes('Edg') || window.navigator.userAgent.includes('Edge')) {
            setIsMicrosoftEdge(true);
        }
    }, []);

    return (
        <AuthLayout>
            <div className="text-center lg:text-left">
                <h1 className="mb-1 md:mb-6 text-2xl md:text-[36px] font-semibold text-dark-100 font-manropeEB">Sign up</h1>
                <p className="md:text-[20px]  text-custom-color20 font-manropeB">Let&apos;s get you started</p>
            </div>
            {/* <p>formdata: </p>
            <pre>{JSON.stringify(formData, null, 2)}</pre> */}
            <div className="mt-6 md:my-12">
                <form className="flex flex-col gap-6" onSubmit={form.onSubmit((values) => handleSignUpWithEmail(values))}>
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
                        <label htmlFor="password" className="font-manropeB">
                            Password
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
                        <p className="text-[red] text-xs">{form.errors.password && form.errors.password}</p>
                        <label htmlFor="confirmPassword" className="font-manropeB">
                            Confirm Password
                        </label>
                        <Input
                            placeHolder="Enter password again"
                            id="Enter your password"
                            {...form.getInputProps('confirmPassword')}
                            className={`w-full border text-black h-[44px] md:h-[60px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] ${form.errors.email ? 'border-red-200' : 'border-slate-50'}`}
                            type={isConfirmPasswordShown ? "text" : "password"}
                            rightIcon={isMicrosoftEdge ? null : (
                                isConfirmPasswordShown ? (
                                    <Eye className="cursor-pointer" onClick={() => setIsConfirmPasswordShown(false)} />
                                ) : (
                                    <EyeSlash className="cursor-pointer" onClick={() => setIsConfirmPasswordShown(true)} />
                                )
                            )}
                        />
                        <p className="text-[red] text-xs">{form.errors.confirmPassword && form.errors.confirmPassword}</p>
                        <div className="flex items-center leading-[27.04px] my-4 h-5">
                            <span className="mr-2 flex my-auto ">
                                <input
                                    id="agree"
                                    type="checkbox"
                                    {...form.getInputProps('agree', { type: 'checkbox' })}
                                    className="w-4 border-[#64D1FF] cursor-pointer"
                                />
                            </span>
                            <label htmlFor="agree" className="text-gray text-sm font-manropeL">
                                I agree with Inclusive Technologies{' '}
                                <Link href={'/'} className="text-[#64D1FF]">
                                    Terms of Service
                                </Link>{' '}
                                &{' '}
                                <Link href={'/'} className="text-[#64D1FF]">
                                    Privacy Policy
                                </Link>{' '}
                                .
                            </label>
                        </div>
                        <Button
                            isLoading={isUserSigningUp}
                            intent={'primary'}
                            size={'md'}
                            className="w-full rounded-lg h-[44px] md:h-[60px]"
                            type="submit"
                            disabled={form.values.agree === true ? false : true}
                        >
                            Continue
                        </Button>
                    </div>
                </form>
                <div className="mt-6">
                    <p className="text-center text-custom-color30 text-[0.875rem] md:font-semibold font-[400] font-manropeL">
                        Already have an account?{' '}
                        <Link href="/auth/login" className="text-[#64D1FF]">
                            Sign in
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
        </AuthLayout>
    );
};

export default SignUpWithEmail;