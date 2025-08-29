"use client";

import colors from "@/app/link-sharing/@styles/colors.module.css";
import text from "@/app/link-sharing/@styles/text.module.css";
import {ReactFormExtendedApi, useForm} from "@tanstack/react-form";
import { SocialLink, SocialProviders } from "@/app/link-sharing/@api/types";
import { useStore } from "@tanstack/react-store";
import {Fragment, useCallback, useState} from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates, useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
/*import { SortableItem } from "@/components/SortableItem";*/
import IconLink from "@/app/link-sharing/@icons/icon-link.svg";
import IconGithub from "@/app/link-sharing/@icons/icon-github.svg";
import IconDND from "@/app/link-sharing/@icons/icon-drag-and-drop.svg";
import { Select, SelectContent, SelectTrigger, SelectItem } from "@/components/input/Select";
import { CSS } from "@dnd-kit/utilities";
import { useDropzone } from "react-dropzone";

export type PassableFormApi<T> = ReactFormExtendedApi<
    T,
    any, // onMount
    any, // onChange
    any, // onChangeAsync
    any, // onBlur
    any, // onBlurAsync
    any, // onSubmit
    any, // onSubmitAsync
    any, // onServer
    any  // submitMeta
>;

type LinksFormType = {
    links: SocialLink[];
    details: {
        firstName: string;
        lastName: string;
        email: string;
    };
}

const ImageDropzone = ({className, image, setImage}:
                       {className:string, image:{ file: File, preview: string } | null, setImage:any}) => {


    const onDrop = useCallback((acceptedFiles:any) => {
        const file = acceptedFiles[0];
        setImage(Object.assign(file, {
            preview: URL.createObjectURL(file)
        }));
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false
    });

    return (
        <div
            {...getRootProps()}
            className={`${className} ${
                isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
        >
            <input {...getInputProps()} />
            {image ? (
                <img
                    src={image.preview}
                    alt="Preview"
                />
            ) : (
                <p className="text-gray-500">
                    Drag & drop an image here, or click to select one
                </p>
            )}
        </div>
    );
};

const Links = ({form, links}:{form:PassableFormApi<LinksFormType>, links:SocialLink[]}) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = links.findIndex((_, index) => index === Number(active.id));
            const newIndex = links.findIndex((_, index) => index === Number(over.id));
            const newOrder = arrayMove(links, oldIndex, newIndex);

            form.setFieldValue("links", newOrder);
        }
    };

    const removeLink = (index:number) => {
        const newLinks = [...links];
        newLinks.splice(index, 1);
        form.setFieldValue(
            "links",
            newLinks
        );
    }

    return (
        <section>
            <form.Field mode={`array`} name={`links`}>
                {(field) => (
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={links.map((_, index) => String(index))}
                                         strategy={verticalListSortingStrategy}>
                            <div className={`flex flex-col gap-3 p-5`}>
                                {field.state.value.map((link:SocialLink, index:number) => (
                                    <Fragment key={index}>
                                        <SortableItem id={String(index)}>
                                            <div className={`flex items-center text-preset-2 text-gray-500`}>
                                                                    <span className={`flex items-center gap-2 font-bold`} >
                                                                        <IconDND />
                                                                        Link #{index + 1}
                                                                    </span>
                                                <button onClick={()=>removeLink(index)} className={`ml-auto`} >
                                                    Remove
                                                </button>
                                            </div>
                                            <form.Field name={`links[${index}].provider`} >
                                                {(field) => (
                                                    <div className={`flex flex-col gap-1`} >
                                                        <label className={`text-preset-3 text-gray-800`} >
                                                            Platform
                                                        </label>
                                                        <Select value={field.state.value}
                                                                onValueChange={(value) => field.handleChange(value)}
                                                        >
                                                            <SelectTrigger className={`bg-white flex items-center`}>
                                                                <div className={`flex gap-4`} >
                                                                    <IconGithub />
                                                                    {field.state.value}
                                                                </div>
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {SocialProviders.map(
                                                                    (prov) => (
                                                                        <SelectItem value={prov} key={prov} >
                                                                            {prov}
                                                                        </SelectItem>
                                                                    )
                                                                )}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                )}
                                            </form.Field>
                                            <form.Field
                                                name={`links[${index}].uri`}
                                            >
                                                {(field) => (
                                                    <div className={`flex flex-col gap-1`} >
                                                        <label className={`text-preset-3 text-gray-800`} >
                                                            Link
                                                        </label>
                                                        <div className={`flex items-center relative`} >
                                                            <IconLink className={`absolute left-4`} />
                                                            <input className={`bg-white px-4 py-3 pl-11 w-full`}
                                                                   value={field.state.value}
                                                                   onChange={(e) =>
                                                                       field.handleChange(
                                                                           e.target.value
                                                                       )
                                                                   }
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </form.Field>
                                        </SortableItem>
                                    </Fragment>
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                )}
            </form.Field>
        </section>
    )
}

export const SortableItem = ({ id, children }: { id: string; children: React.ReactNode }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {children}
        </div>
    );
};

const EmptyLinksState = () => (
    <section
        className={`flex flex-col items-center gap-6 px-5 py-12 bg-gray-200 rounded-[12px]`}
    >
        <img
            src="/link-sharing/images/illustration-empty.svg"
            className={`h-20`}
        />
        <h2 className={`text-preset-1`}>Let’s get you started</h2>
        <p className={`text-preset-2 text-center`}>
            Use the “Add new link” button to get started. Once you have more
            than one link, you can reorder and edit them. We’re here to help you
            share your profiles with everyone!
        </p>
    </section>
);

const Page = () => {
    const form = useForm({
        defaultValues: {
            links: [] as SocialLink[],
            details: {
                firstName: '',
                lastName: '',
                email: ''
            }
        },
        onSubmit: ({value}) => {
            console.log("Form Submitted:", value);
        },
    });

    const links = useStore(form.store, (state) => state.values.links);
    const details = useStore(form.store, (state) => state.values.details);

    const addNewLink = () => {
        form.setFieldValue("links", [...links, { provider: "Github", uri: "" }]);
    };

    const [view, setView] = useState<"links" | "details">("links");

    const [image, setImage] = useState<{ file: File, preview: string } | null>(null);

    return (
        <div className={`min-h-screen bg-gray-200 ${colors.setup} ${text.setup}`}>
            <menu className={`flex items-center justify-center gap-5`}>
                <button onClick={()=>setView('links')} className={`px-4 py-2 bg-white rounded-[8px] text-preset-1`}>Links</button>
                <button onClick={()=>setView('details')} className={`px-4 py-2 bg-white rounded-[8px] text-preset-1`}>Details</button>
            </menu>
            <div className={`flex p-4 max-w-[1440px] w-full mx-auto`}>
                <section className={`max-xl:hidden flex-1 flex items-center justify-center`}>
                    <div className={`grid grid-areas-[content]`}>
                        <img
                            src="/link-sharing/images/illustration-phone-mockup.svg"
                            className={`grid-area-[content]`}
                        />
                        <section className={`grid-area-[content] relative`}>
                            <div
                                className={`absolute w-full px-[34px] top-[280px] gap-[25px] flex flex-col `}
                            >
                                {links.map((link, index) => (
                                    <li
                                        key={index}
                                        className={`w-full bg-black text-white h-[40px]`}
                                    >
                                        {link.provider}
                                    </li>
                                ))}
                            </div>
                            <section
                                className={`absolute w-full px-[34px] top-[65px] gap-[25px] flex flex-col `}
                            >
                                {image && <img
                                    src={image.preview}
                                    alt="Preview"
                                />}

                                <div>
                                    {details.firstName}
                                </div>
                            </section>
                        </section>
                    </div>
                </section>
                {view === 'links' && <section className={`flex flex-col max-w-[808px]`}>
                    <div className={`flex flex-col gap-6 p-6`}>
                        <header className={`flex flex-col gap-2`}>
                            <h1 className={`text-preset-1`}>Customize your links</h1>
                            <p className={`text-preset-2`}>
                                Add/edit/remove links below and then share all your profiles with the
                                world!
                            </p>
                        </header>
                        <button
                            disabled={links.length > 4} onClick={addNewLink}
                            className={`disabled:opacity-40 mt-4 py-3 border border-purple-500 rounded-[8px] text-purple-500 
                            font-semibold`}
                        >
                            + Add new link
                        </button>
                        {links.length === 0 ? (<EmptyLinksState/>) : (<Links links={links} form={form}/>)}
                    </div>
                    <hr className={`text-gray-300`}/>
                    <button
                        disabled={links.length === 0}
                        className={`xl:w-fit xl:ml-auto m-4 py-3 bg-purple-500 text-white flex justify-center rounded-[8px] disabled:opacity-25`}
                    >
                        Save
                    </button>
                </section>}
                {view === 'details' && <section className={`flex flex-col max-w-[808px]`}>
                    <div className={`flex flex-col gap-6 p-6`}>
                        <header className={`flex flex-col gap-2`}>
                            <h1 className={`text-preset-1`}>Profile Details</h1>
                            <p className={`text-preset-2`}>
                                Add your details to create a personal touch to your profile.
                            </p>
                        </header>
                        
                        <section className={`grid md:grid-cols-3 items-center`}>
                            <label>Profile picture</label>
                            <ImageDropzone image={image} setImage={setImage}
                                           className={`bg-purple-200 rounded-[12px] h-[200px]`}></ImageDropzone>
                            <p>
                                Image must be below 1024x1024px. Use PNG or JPG format.
                            </p>
                        </section>

                        <section className={`flex flex-col`}>
                            <form.Field
                                name={`details.firstName`}
                            >
                                {(field) => (
                                    <div className={`flex items-center justify-between gap-1`} >
                                        <label className={`text-preset-3 text-gray-800`} >
                                            Link
                                        </label>
                                        <div className={`flex items-center relative`} >
                                            <IconLink className={`absolute left-4`} />
                                            <input className={`bg-white px-4 py-3 pl-11 w-full`}
                                                   value={field.state.value}
                                                   onChange={(e) =>
                                                       field.handleChange(
                                                           e.target.value
                                                       )
                                                   }
                                            />
                                        </div>
                                    </div>
                                )}
                            </form.Field>
                        </section>
                    </div>
                    <hr className={`text-gray-300`}/>
                    <button
                        disabled={links.length === 0}
                        className={`xl:w-fit xl:ml-auto m-4 py-3 bg-purple-500 text-white flex justify-center rounded-[8px] disabled:opacity-25`}
                    >
                        Save
                    </button>
                </section>}
            </div>
        </div>
    );
};

export default Page;