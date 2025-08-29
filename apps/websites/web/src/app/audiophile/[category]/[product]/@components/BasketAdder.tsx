"use client"

import {addQuantity, cartStore} from "@/app/audiophile/@api/cartStore";
import {useStore} from "@tanstack/react-store";

export const BasketAdder = ({product}:{product:{slug:string}}) => {
    const quantity = useStore(cartStore, (items)=>items[product.slug]?.quantity);

    return (
        <div className={`flex gap-4`}>
            <div className={`flex text-black bg-neutral-200 px-4 py-4 gap-5 w-fit text-preset-4`}>
                <button disabled={!quantity || quantity<1} onClick={()=>addQuantity(product.slug, -1, product)} className={`disabled:cursor-not-allowed opacity-25 cursor-pointer`}>-</button>
                <div>{quantity??0}</div>
                <button onClick={()=>addQuantity(product.slug, 1, product)} className={`opacity-25 cursor-pointer`}>+</button>
            </div>
            <button className={`py-4 px-8 bg-primary text-white w-fit text-preset-4`}>ADD TO CART</button>
        </div>
    );
};