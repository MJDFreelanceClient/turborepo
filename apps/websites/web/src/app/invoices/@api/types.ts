
import {DateTime} from "luxon";

type Address = {
    street: string;
    city: string;
    postCode: string;
    country: string;
};

export type InvoiceItem = {
    name: string;
    quantity: number;
    price: number;
    total: number;
};

type InvoiceStatus = "draft" | "pending" | "paid";

export type Invoice = {
    id: string;
    createdAt: string; // ISO date string
    paymentDue: string; // ISO date string
    description: string;
    paymentTerms: number;
    clientName: string;
    clientEmail: string;
    status: InvoiceStatus | string;
    senderAddress: Address;
    clientAddress: Address;
    items: InvoiceItem[];
    total: number;
};

export const generateEmptyInvoice = () => {
    return {
        id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        createdAt: DateTime.now().toFormat("yyyy-MM-dd"),
        paymentDue: DateTime.now().plus({ days: 1 }).toFormat("yyyy-MM-dd"),
        description: "",
        paymentTerms: 1,
        clientName: "",
        clientEmail: "",
        status: "draft",
        senderAddress: {
            street: "",
            city: "",
            postCode: "",
            country: ""
        },
        clientAddress: {
            street: "",
            city: "",
            postCode: "",
            country: ""
        },
        items: [],
        total: 0
    };
}

export function isBlankInvoice(invoice: Invoice | BlankInvoice): invoice is BlankInvoice {
    return (invoice as BlankInvoice).isNew;
}

export type BlankInvoice = Partial<Invoice> & {isNew:true};