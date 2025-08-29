import {Store} from "@tanstack/react-store";

export const queryStore = new Store<string|undefined>(undefined);

export const filterStore = new Store<string|undefined>(undefined);