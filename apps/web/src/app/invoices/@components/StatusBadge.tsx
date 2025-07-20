import {capitalizeFirstLetter} from "@/lib/utils/string";

export const StatusBadge = ({status, showChevron=true}:{status:string, showChevron?:boolean}) => {
    return (
        <div className={`flex items-center gap-4`}>
            <div data-status={status} className={`w-[104px] rounded-[6px] py-3.5 flex justify-center text-preset-2 items-center gap-2
                            data-[status=paid]:text-green-500 data-[status=pending]:text-orange-500 text-neutral-900
                                data-[status=paid]:bg-green-500/10 data-[status=pending]:bg-orange-500/10 bg-neutral-900/10 dark:data-[status=draft]:text-white`}>
                <div data-status={status} className={`h-2 w-2 rounded-full aspect-square dark:data-[status=draft]:text-white 
                                    data-[status=paid]:bg-green-500 data-[status=pending]:bg-orange-500 bg-neutral-900 `}></div>
                {capitalizeFirstLetter(status)}</div>
            {showChevron && <div>&gt;</div>}
        </div>
    );
};