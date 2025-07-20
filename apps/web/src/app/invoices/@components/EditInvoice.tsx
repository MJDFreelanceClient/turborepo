import {useForm} from "@tanstack/react-form";
import {InvoiceInput} from "@/app/invoices/@components/InvoiceInput";
import {Fragment} from "react";
import DeleteIcon from "@/app/invoices/@icons/icon-delete.svg";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/input/Select";
import {Popover, PopoverTrigger, PopoverContent} from "@/components/Popover";
import { Button } from "@/components/ui/Button";
import {Calendar} from "@/components/Calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import colors from "@/app/invoices/@styles/colors.module.css";
import text from "@/app/invoices/@styles/text.module.css";
import {DateTime} from "luxon"
import {BlankInvoice, generateEmptyInvoice, Invoice, isBlankInvoice} from "@/app/invoices/@api/types";
import {createInvoice, deleteInvoice} from "@/app/invoices/@api/invoices";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export const EditInvoice = ({invoice, onCancel}:{invoice:Invoice | BlankInvoice, onCancel:()=>void}) => {
    const invoiceTemplate = generateEmptyInvoice()

    const form = useForm({
        defaultValues: {...invoiceTemplate, ...invoice} as Invoice,
        onSubmit: async ({value}) => {
            await handleUpsertInvoice(value);
            onCancel();
        }
    });

    const queryClient = useQueryClient();

    const { mutate: handleUpsertInvoice, isPending } = useMutation({
        mutationFn: async (invoice: Invoice) => {
            try {
                await createInvoice(invoice);
            }
            catch (e) {
                console.error(e);
            }
        },
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ["invoices"] });
            queryClient.invalidateQueries({ queryKey: ["invoice", id] });
        }
    });

    return (
        <>
            <h2 className={`text-purple-800 text-preset-5 mb-12 dark:text-white`}>Edit <span className={`text-purple-600`}>#</span>{invoice.id || invoiceTemplate.id}</h2>
            <form onSubmit={e=>{
                e.preventDefault();
                form.handleSubmit(e);
            }} className={`flex flex-col gap-10 w-fit overflow-y-auto mb-[80px] dark:text-white`}>
                <fieldset className={`grid grid-cols-3 w-fit gap-6 `}>
                    <h3 className={`col-span-3 text-preset-3 text-purple-500 `}>Bill From</h3>

                    <form.Field name={`senderAddress.street`}>
                        {field=>(
                            <InvoiceInput value={field.state.value} onChange={(e)=>field.handleChange(e.target.value)}
                                          label={`Street Address`} id={`invoice-edit-street-address`} className={`col-span-3`} />
                        )}
                    </form.Field>
                    <form.Field name={`senderAddress.city`}>
                        {field=>(
                            <InvoiceInput value={field.state.value} onChange={(e)=>field.handleChange(e.target.value)}
                                          label={`City`} id={`invoice-edit-city`} />
                        )}
                    </form.Field>
                    <form.Field name={`senderAddress.postCode`}>
                        {field=>(
                            <InvoiceInput value={field.state.value} onChange={(e)=>field.handleChange(e.target.value)}
                                          label={`Post Code`} id={`invoice-edit-postcode`} />
                        )}
                    </form.Field>
                    <form.Field name={`senderAddress.country`}>
                        {field=>(
                            <InvoiceInput value={field.state.value} onChange={(e)=>field.handleChange(e.target.value)}
                                          label={`Country`} id={`invoice-edit-country`} />
                        )}
                    </form.Field>
                </fieldset>

                <fieldset className={`grid grid-cols-6 w-fit gap-6 `}>
                    <h3 className={`col-span-3 text-preset-3 text-purple-500`}>Bill To</h3>

                    <form.Field name={`clientName`}>
                        {field=>(
                            <InvoiceInput value={field.state.value} onChange={(e)=>field.handleChange(e.target.value)}
                                          label={`Client Name`} id={`invoice-edit-client-name`} className={`col-span-6`} />
                        )}
                    </form.Field>
                    <form.Field name={`clientEmail`}>
                        {field=>(
                            <InvoiceInput value={field.state.value} onChange={(e)=>field.handleChange(e.target.value)}
                                          label={`Client’s Email`} id={`invoice-edit-client-email`} className={`col-span-6`} />
                        )}
                    </form.Field>
                    <form.Field name={`clientAddress.street`}>
                        {field=>(
                            <InvoiceInput value={field.state.value} onChange={(e)=>field.handleChange(e.target.value)}
                                          label={`City`} id={`invoice-edit-client-street`} className={`col-span-6`} />
                        )}
                    </form.Field>
                    <form.Field name={`clientAddress.city`}>
                        {field=>(
                            <InvoiceInput value={field.state.value} onChange={(e)=>field.handleChange(e.target.value)}
                                          label={`City`} id={`invoice-client-city`} className={`col-span-2`} />
                        )}
                    </form.Field>
                    <form.Field name={`clientAddress.postCode`}>
                        {field=>(
                            <InvoiceInput value={field.state.value} onChange={(e)=>field.handleChange(e.target.value)}
                                          label={`Post Code`} id={`invoice-edit-client-postcode`} className={`col-span-2`} />
                        )}
                    </form.Field>
                    <form.Field name={`clientAddress.country`}>
                        {field=>(
                            <InvoiceInput value={field.state.value} onChange={(e)=>field.handleChange(e.target.value)}
                                          label={`Country`} id={`invoice-edit-client-country`} className={`col-span-2`} />
                        )}
                    </form.Field>
                    <form.Field name={`createdAt`}>
                        {field=>(
                            <div className={`flex flex-col gap-2 col-span-3`} >
                                <label htmlFor={`invoice-edit-invoice-date`} className={`text-preset-2 text-purple-700`}>Payment Terms</label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            data-empty={!field.state.value}
                                            className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal dark:text-white dark:bg-purple-300"
                                        >
                                            <CalendarIcon />
                                            {field.state.value ? DateTime.fromFormat(field.state.value, "yyyy-mm-dd").toFormat("dd MMM yyyy") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className={`w-auto p-0 bg-white dark:bg-neutral-400 dark:text-white ${colors.setup} ${text.setup}`}>
                                        <Calendar mode="single" selected={DateTime.fromFormat(field.state.value, "yyyy-MM-dd").toJSDate()}
                                                  onSelect={(date)=>{
                                                      field.handleChange(date?DateTime.fromJSDate(date).toFormat("yyyy-mm-dd"):"")
                                                  }} />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        )}
                    </form.Field>
                    <form.Field name={`paymentTerms`}>
                        {field=>(
                            <div className={`flex flex-col gap-2 col-span-3`} >
                                <label htmlFor={`invoice-edit-invoice-date`} className={`text-preset-2 text-purple-700`}>Payment Terms</label>
                                <Select value={field.state.value.toString()} onValueChange={(value)=>field.handleChange(Number(value))} >
                                    <SelectTrigger className={`px-5 py-4.5 outline-1 outline-purple-500 rounded-[4px] text-purple-800 text-preset-3 dark:text-white`}>
                                        {field.state.value ? `Next ${field.state.value} Days` : 'Select Terms'}</SelectTrigger>
                                    <SelectContent className={`${colors.setup} ${text.setup} dark:bg-neutral-400 dark:text-white`}>
                                        <SelectItem value={`1`}>Next 1 Days</SelectItem>
                                        <SelectItem value={`7`}>Next 7 Days</SelectItem>
                                        <SelectItem value={`30`}>Next 30 Days</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </form.Field>
                    <form.Field name={`description`}>
                        {field=>(
                            <InvoiceInput value={field.state.value} onChange={(e)=>field.handleChange(e.target.value)}
                                          label={`Project Description`} id={`invoice-edit-description`} className={`col-span-6`} />
                        )}
                    </form.Field>
                </fieldset>

                <fieldset className={`flex flex-col gap-x-6 gap-y-4`}>
                    <h3 className={`col-span-3 text-preset-3 text-purple-500`}>Items List</h3>

                    <div className={`grid grid-cols-[1fr_auto_auto_auto_auto] gap-6 items-center`}>
                        <h3 className={`text-preset-2 text-purple-700`}>Item Name</h3>
                        <h3 className={`text-preset-2 text-purple-700`}>Qty</h3>
                        <h3 className={`text-preset-2 text-purple-700`}>Price</h3>
                        <h3 className={`text-preset-2 text-purple-700`}>Total</h3>
                        <span></span>
                        <form.Field name={`items`} mode={`array`}>
                            {field=>(
                                <>
                                    {field.state.value.map((_,index)=>(
                                        <Fragment key={index}>
                                            <form.Field name={`items[${index}].name`}>
                                                {field=>(
                                                    <InvoiceInput value={field.state.value} onChange={(e)=>field.handleChange(e.target.value)}
                                                                  label={`Item Name`} id={`invoice-edit-item-${index}-name`} className={``} hideLabel={true} />
                                                )}
                                            </form.Field>
                                            <form.Field name={`items[${index}].quantity`}>
                                                {field=>(
                                                    <InvoiceInput value={field.state.value} onChange={(e)=>field.handleChange(Number(e.target.value))}
                                                                  label={`Qty.`} id={`invoice-edit-item-${index}-qty`} className={`max-w-[50px]`} hideLabel={true} />
                                                )}
                                            </form.Field>
                                            <form.Field name={`items[${index}].price`}>
                                                {field=>(
                                                    <InvoiceInput value={field.state.value} onChange={(e)=>field.handleChange(Number(e.target.value))}
                                                                  label={`Price`} id={`invoice-edit-item-${index}-price`} className={`max-w-[100px]`} hideLabel={true} />
                                                )}
                                            </form.Field>
                                            <form.Field name={`items[${index}].total`}>
                                                {field=>(
                                                    <InvoiceInput value={field.state.value} onChange={(e)=>field.handleChange(Number(e.target.value))}
                                                                  label={`Total`} id={`invoice-edit-item-${index}-total`} className={`max-w-[100px]`} hideLabel={true} />
                                                )}
                                            </form.Field>
                                            <button
                                                type="button"
                                                onClick={() => field.removeValue(index)}
                                            ><DeleteIcon /></button>
                                        </Fragment>
                                    ))}
                                    <button
                                        className={`col-span-5 bg-neutral-200 rounded-[24px] py-4.5 text-purple-700 text-prest-3 font-bold`}
                                        type="button"
                                        onClick={() =>
                                            field.pushValue({
                                                "name": "",
                                                "quantity": 1,
                                                "price": 0,
                                                "total": 0
                                            })
                                        }
                                    >
                                        + Add New Item
                                    </button>

                                </>
                            )}
                        </form.Field>
                    </div>
                </fieldset>

                {!isBlankInvoice(invoice) && <div className={`flex gap-1 items-center fixed bottom-0 left-0 px-15 py-10 w-full bg-white dark:bg-neutral-400`}>
                    <button type="button" onClick={onCancel}
                        className={`px-7 py-4.5 text-purple-100 bg-neutral-200 rounded-full text-preset-3 ml-auto`}>Cancel
                    </button>
                    <button className={`px-7 py-4.5 bg-purple-100 text-white rounded-full text-preset-3`}>Save Changes
                    </button>
                </div>}

                {isBlankInvoice(invoice) && <div className={`flex gap-1 items-center fixed bottom-0 left-0 px-15 py-10 w-full bg-white dark:bg-neutral-400`}>
                    <button type="button" onClick={onCancel}
                        className={`px-7 py-4.5 text-purple-100 bg-neutral-200 rounded-full text-preset-3 mr-auto`}>Discard
                    </button>
                    <button className={`px-7 py-4.5 text-purple-600 rounded-full text-preset-3 bg-neutral-900 `}>Save as Draft
                    </button>
                    <button className={`px-7 py-4.5 bg-purple-100 text-white rounded-full text-preset-3`}>Save & Send
                    </button>
                </div>}
            </form>
        </>
    );
};