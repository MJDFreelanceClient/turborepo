"use client";

import {Dialog, DialogHeader, DialogContent, DialogFooter, DialogTitle, DialogTrigger} from "@/components/Dialog";
import {useState} from "react";
import modal from "@/lib/reducers/ModalReducer";
import colors from "@/app/personal-finance/styles/colors.module.css";
import text from "@/app/personal-finance/styles/text.module.css";

export const WithdrawMoney = () => {
    const [open, setOpen] = useState<boolean>(false); // This should be controlled by your modal state management
    modal.listen({current:"pot", op:"add"}, () => setOpen(true))

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className={`bg-beige-100 flex-1 rounded-[8px] py-4 cursor-pointer`}>Withdraw</DialogTrigger>
                <DialogContent className={`bg-white ${colors.setup} ${text.setup} flex flex-col-gap-5 p-5`}>
                    <DialogHeader className={`text-left flex flex-col gap-5`}>
                        <DialogTitle className={`text-preset-1 text-gray-900 font-bold`}>Withdraw Money</DialogTitle>
                        <p className={`text-preset-4 text-gray-500`}>
                            Create a pot to set savings targets. These can help keep you on track as you save for special
                            purchases.
                        </p>
                    </DialogHeader>
                    <form className={`flex flex-col gap-4 `}>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="pot-name" className="text-gray-700 text-preset-5 font-bold">
                                Pot Name
                            </label>
                            <input
                                id="pot-name"
                                type="text"
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter pot name"
                            />
                            <div className={`text-gray-500 text-preset-5 text-right`}>30 characters left</div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="pot-amount" className="text-gray-700 text-preset-5 font-bold">
                                Target
                            </label>
                            <input
                                id="pot-amount"
                                type="number"
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter initial amount"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="pot-amount" className="text-gray-700 text-preset-5 font-bold">
                                Theme
                            </label>
                            <input
                                id="pot-amount"
                                type="number"
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter initial amount"
                            />
                        </div>
                    </form>
                    <DialogFooter>
                        <button className="bg-gray-900 text-white w-full py-4 rounded-[12px]">
                            Add Pot
                        </button>
                    </DialogFooter>
                </DialogContent>
        </Dialog>
    );
};