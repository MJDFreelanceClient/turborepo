"use client";

import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/DropdownMenu";
import modal from "@/lib/reducers/ModalReducer";

export const BudgetDropdown = ({id}:{id:string}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger><img src="/personal-finance/images/icon-ellipsis.svg" /></DropdownMenuTrigger>
            <DropdownMenuContent className={`bg-white`}>
                <DropdownMenuItem onClick={()=>modal.open("budget", "edit", id)}>Edit Budget</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>modal.open("budget", "delete", id)}>Delete Budget</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};