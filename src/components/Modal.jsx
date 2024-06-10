import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';


const Modal = forwardRef(function Modal({children, buttonCap}, ref){
    const dialog = useRef();
    useImperativeHandle(ref, ()=>{
        return{
            open(){
                dialog.current.showModal();
            }
        };
    });
    return(
        createPortal(<dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
            {children}
            <form method="dialog" className="mt-4 text-right">
                <button className="p-2 m-3 text-xl font-bold rounded-lg border-2 border-blue-500 bg-white text-blue-700 hover:bg-stone-200">{buttonCap}</button>
            </form>
        </dialog>, document.getElementById("modal-root"))
    );
});

export default Modal;