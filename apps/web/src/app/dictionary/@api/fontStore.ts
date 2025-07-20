import {Store} from "@tanstack/react-store";

export const fontStore = new Store<'serif'|'sans'|'monospace'>('serif');