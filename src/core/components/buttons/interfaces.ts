import { RefObject } from "react";



export interface Button_I {
    label?: string;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
    isLoading?: boolean;
    icon?: string;
    size?: 'sm' | 'md' | 'lg' | 'default';


    ref?: RefObject<HTMLButtonElement>;
}