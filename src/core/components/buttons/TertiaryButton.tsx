
import { FC } from "react";
import { Button_I } from "./interfaces"

export const TertiaryButton: FC<Button_I> = ({
    label,
    className = '',
    disabled = false,
    size = 'default',
    icon,
    onClick,
    isLoading,

    ref,

}) => {

    const sizeButton = (): string => {

        if (size === 'default') return 'bttn';

        return `bttn-${size}`;

    }

    const _onclick = () => {

        if (disabled) return;
        if (isLoading) return;
        onClick();

    }

    const set_disabled = (): boolean => {

        if (disabled) return true;
        if (isLoading) return true;
        return false;

    }


    return (
        <button
            type="button" className={`${className} ${sizeButton()} dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300 w-fit h-fit`}
            onClick={_onclick}
            disabled={set_disabled()}
        >
            {isLoading &&
                <svg className="w-4 h-4 fill-current mr-s_7.5 animate-spin shrink-0" viewBox="0 0 16 16">
                    <path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
                </svg>
            }
            {
                icon && !isLoading && <i className={`${icon} text-20p`}></i>
            }
            {
                label && (
                    label
                )
            }
        </button>
    )
}
