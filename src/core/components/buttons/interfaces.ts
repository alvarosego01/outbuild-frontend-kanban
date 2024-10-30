import { RefObject } from "react";



export interface Button_I {
    label?: string;
    onClick: () => void; // Añadir esta línea
    className?: string;
    disabled?: boolean;
    isLoading?: boolean;
    icon?: string;
    size?: 'sm' | 'md' | 'lg' | 'default';


    ref?: RefObject<HTMLButtonElement>;
    // "aria-haspopup"?: string;
    // "aria-expanded"?: boolean;
}