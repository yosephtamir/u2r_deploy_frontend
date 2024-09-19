import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

const buttonVariants = cva(
    'relative px-4 py-3 flex items-center justify-center gap-5 w-fit h-[48px] rounded-[16px] font-manropeB text-white-100',
    {
        variants: {
            intent: {
                primary:
                    'bg-brand-Light_Sky_Blue-primary hover:bg-[#73D5FF] focus:bg-brand-Light_Sky_Blue-primary active:bg-[#50A7CC] disabled:bg-[#E1E3E2] disabled:cursor-not-allowed ',
                secondary:
                    'bg-white text-[#64D1FF] hover:bg-[#EFFAFF] focus:shadow-grey active:bg-[#50A7CC] disabled:bg-[#6C6C6C] border-solid border-[2px] border-[#64D1FF] ',
                success:
                    'bg-[#06C270] hover:bg-[#39D98A] focus:bg-[#06C270] active:bg-[#06C270] disabled:bg-[#E1E3E2] disabled:cursor-not-allowed ',
                tertiary:
                    'bg-[#FFFFFF] text-[#64D1FF] hover:bg-[#F4FBF6] focus:shadow-grey active:bg-[#E0F5FF] disabled:bg-[#E1E3E2] disabled:cursor-not-allowed ',
                error:
                    'bg-[#FF2E2E] text-white hover:bg-[#FF5C5C] focus:bg-[#FF2E2E] active:bg-[#E53535] disabled:bg-[#E1E3E2] disabled:cursor-not-allowed',
            },
            size: {
                sm: 'text-sm py-2',
                md: 'text-base py-3',
                lg: 'text-lg py-4',
            },
        },
        defaultVariants: {
            intent: 'primary',
            size: 'md',
        },
    },
);

export interface ButtonVariants
    extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { }

export interface ButtonProps extends ButtonVariants {
    children: React.ReactNode;
    className?: React.ComponentProps<'div'>['className'];
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    isLoading?: boolean;
    disabled?: boolean;
    href?: object | string;
    spinnerColor?: string;
    spinnerSize?: string | number;
}

const Button: React.FC<ButtonProps> = ({
    children,
    isLoading,
    disabled,
    leftIcon,
    rightIcon,
    className,
    href,
    spinnerColor,
    spinnerSize,
    ...props
}) => {
    const classNames = twMerge(buttonVariants(props), className);

    if (href) {
        return (
            // @ts-expect-error
            <Link href={href} className={classNames} {...props}>
                {leftIcon && leftIcon}
                {children}
                {rightIcon && rightIcon}
            </Link>
        );
    }

    return (
        <button disabled={(isLoading ?? disabled) || disabled} className={classNames} {...props}>
            <div className="w-full h-full absolute top-0 flex flex-col items-center justify-center">
                <svg
                    width={spinnerSize ?? '20'}
                    height={spinnerSize ?? '20'}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className={twMerge(
                        ' animate-spin transition delay-[.2] ',
                        isLoading ? 'opacity-1 visible' : 'opacity-0 hidden',
                    )}
                >
                    <path
                        fill={spinnerColor ?? '#fff'}
                        d="M12 21a9 9 0 1 1 6.18-15.55a.75.75 0 0 1 0 1.06a.74.74 0 0 1-1.06 0A7.51 7.51 0 1 0 19.5 12a.75.75 0 0 1 1.5 0a9 9 0 0 1-9 9Z"
                    />
                </svg>
            </div>
            <div className={twMerge('flex items-center justify-center gap-2', isLoading ? 'opacity-0' : 'opacity-1')}>
                {leftIcon}
                {children}
                {rightIcon && (
                    <span
                        style={{
                            opacity: isLoading ? 0 : 1,
                        }}
                    >
                        {rightIcon}
                    </span>
                )}
            </div>
        </button>
    );
};

export default Button;
