"use client"

import {useStore} from "@tanstack/react-store";
import {menuStore} from "@/app/invoices/@api/menuStore";
import {useEffect, useState} from "react";
import modal from "@/lib/reducers/ModalReducer"
import {EditInvoice} from "@/app/invoices/@components/EditInvoice";
import {DarkMode} from "@/app/invoices/@components/DarkMode";
import {BlankInvoice, Invoice, isBlankInvoice} from "@/app/invoices/@api/types";

export const Menu = () => {
    const menuOpen = useStore(menuStore);
    const [invoice, setInvoice] = useState<Invoice | BlankInvoice | null>(null);

    useEffect(() => {
        console.log("Menu", menuOpen);
        const unsub = modal.listen(
            { current: "invoices" },
            (data) => {
                console.log("Modal invoices", data);
                setInvoice(data ?? null);
                menuStore.setState(!!data);
            }
        );
        return () => unsub();
    }, []);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && menuOpen) {
                modal.close(()=>setInvoice(null));
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [menuOpen]);

    return (
       <>
           <div role="presentation" aria-hidden={!menuOpen} data-open={menuOpen}
                    onClick={()=>modal.close(()=>setInvoice(null))}
                   className={`data-[open=false]:pointer-events-none overlay inset-0 bg-black absolute data-[open=true]:opacity-50 opacity-0 transition-all duration-300 cursor-pointer`}></div>
           <menu className={`flex max-xl:flex-col relative`}>
               <div data-open={menuOpen} className={`flex flex-col p-15 absolute xl:h-full max-xl:w-full bg-white  right-0 dark:bg-neutral-400
                    data-[open=true]:translate-x-full transition-all duration-300 xl:rounded-r-[20px]`}>
                   {invoice && !isBlankInvoice(invoice) && <EditInvoice invoice={invoice} onCancel={()=>modal.close(()=>setInvoice(null))} />}
                   {invoice && isBlankInvoice(invoice) && <EditInvoice invoice={invoice} onCancel={()=>modal.close(()=>setInvoice(null))}  />}
               </div>
               <div className={`relative flex xl:flex-col items-center justify-between bg-neutral-900 w-[103px] xl:h-screen max-xl:w-screen rounded-r-[20px]`}>
                   <div className={`relative xl:w-full h-[103px] bg-purple-100 xl:rounded-r-[20px] overflow-hidden flex items-center justify-center`}>
                       <div className={`absolute inset-0 top-[50%] xl:rounded-tl-[20px] bg-purple-200`}></div>
                       <img src="/invoices/logo.svg" className={`relative h-9`} />
                   </div>
                   <div className={`flex xl:flex-col items-center gap-8 xl:mb-6`}>
                       <DarkMode />
                       <hr className={`text-neutral-800 w-full`} />
                       <img src="/invoices/image-avatar.jpg" className={`w-12 rounded-full h-10 w-10 aspect-square`} />
                   </div>
               </div>
           </menu>
       </>
    );
};
