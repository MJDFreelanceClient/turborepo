import {Store} from "@tanstack/react-store";
import {uniqueArray} from "@/lib/utils/data/arrays";

export const upvotesStore = new Store<(number|string)[]>([]);

export const upvote = (id:string|number)=> upvotesStore.setState((upvotes)=>uniqueArray([...upvotes, id]));