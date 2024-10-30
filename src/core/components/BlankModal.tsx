
import { FC, useEffect, useRef } from "react";
import { Modal_Base_I } from "../interfaces";




export const BlankModal: FC<Modal_Base_I> = ({
    status,
    children,
    size = 'normal',
    onClose
}) => {

    const modalRef = useRef<HTMLDialogElement>(null);
    const closeModalRef = useRef<HTMLButtonElement>(null);
    const id: string = Math.random().toString(36).substring(7);


    useEffect(() => {

        if (status) {
            modalRef.current?.showModal();
        }

    }, [status]);

    const closeModal = () => {
        // console.log('el status', status);
        modalRef.current?.close();
        setTimeout(() => {
            onClose && onClose();
        }, 200);
    }

    const set_size_parent = (): string => {

        let aux_size: string = 'modal-box'

        if(size === 'big') aux_size = 'modal-box max-w-[95%] pcTab:max-w-4xl lg:max-w-5xl w-full';

        return aux_size

    }

    return (
        <dialog
            ref={modalRef}
            id={id} className="modal">
            <div className={`p-0 overflow-visible bg-transparent rounded-rd_5 ${set_size_parent()}`}>

                <div className={`w-full children-content max-full max-h-full overflow-visible bg-white rounded shadow-lg p-s_25 dark:bg-slate-800 `}>
                    {
                        children
                    }
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button
                    type="button"
                    onClick={closeModal}
                    ref={closeModalRef}
                >close</button>
            </form>
        </dialog>
    )
}
