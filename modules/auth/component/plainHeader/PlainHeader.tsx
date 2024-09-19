import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/assets/images/logo/INT_logo.png"
import Container from "../container/Container";

function PlainHeader() {
    return (
        <Container>
            <header className="py-6 xl:mx-auto lg:py-[14px]">
                <Link href={'/'} className="flex items-center gap-2 hover:underline">
                    <Image src={logo} alt="logo" className='w-[30px] h-[30px]' />
                    <span className="font-bold tracking-[0.008rem]">Inclusive&nbsp;Technologies</span>
                </Link>
            </header>
        </Container>
    );
};

export default PlainHeader;