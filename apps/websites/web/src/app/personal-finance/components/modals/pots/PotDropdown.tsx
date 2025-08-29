"use client";

import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/DropdownMenu";
import modal from "@/lib/reducers/ModalReducer";

export const PotDropdown = ({id}:{id:string}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger><img src="/personal-finance/images/icon-ellipsis.svg" /></DropdownMenuTrigger>
            <DropdownMenuContent className={`bg-white`}>
                <DropdownMenuItem onClick={()=>modal.open("pot", "edit", id)}>Edit Pot</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>modal.open("pot", "delete", id)}>Delete Pot</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};