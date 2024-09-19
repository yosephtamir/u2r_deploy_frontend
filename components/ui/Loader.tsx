import { ImSpinner3 } from "react-icons/im";

const Loader = () => {
    return (
        <div className="flex justify-center items-center w-full h-full">
            <ImSpinner3 className="w-6 h-6 text-[#64D1FF] animate-spin" />
        </div>
    );
};

export default Loader;