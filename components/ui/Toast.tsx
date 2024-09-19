import { toast } from "react-toastify";

export type notifyProps = {
    type?: any; 
    message: string; 
    theme?: any; 
    position?: 
    any; autoClose?: number; 
    hideProgressBar?: boolean; 
    closeOnClick?: boolean; 
    pauseOnHover?: boolean; 
    draggable?: boolean; 
    progress?: any;
}

const notify = (props: notifyProps) => {
    const {
        message,
        position = 'top-right',
        autoClose = 3000,
        hideProgressBar = false,
        closeOnClick = true,
        pauseOnHover = true,
        draggable = true,
        progress,
        theme = 'dark',
        type = 'info',
    } = props;

    toast(message, {
        position,
        autoClose,
        hideProgressBar,
        closeOnClick,
        pauseOnHover,
        draggable,
        progress,
        type,
        theme,
    });
};

export { notify };

export const fetchErrorToast = (data: string) => {
    notify({ type: 'error', message: `Error fetching ${data}`, theme: 'light'})
}