"use client"

import { useQuery } from "@tanstack/react-query";
import { getRequests } from "@/app/product-feedback/@api/requests";
import { ProductRequest } from "@/app/product-feedback/@api/types";
import { ReactNode, useState } from "react";
import {
    DndContext,
    useDraggable,
    useDroppable,
    DragEndEvent,
    closestCenter,
    DragOverlay,
} from "@dnd-kit/core";

const Capitalise = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const DraggableItem = ({ request }: { request: ProductRequest }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: request.id as any,
        data: { request },
    });

    const style = transform
        ? {
            transform: `translate(${transform.x}px, ${transform.y}px)`,
        }
        : undefined;

    return (
        <li
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
            className={`group flex flex-col bg-white ${isDragging ? 'opacity-50' : ''}`}
        >
            <span>{Capitalise(request.status)}</span>
            <h2>{request.title}</h2>
            <p>{request.description}</p>
            <div>{request.category}</div>
            <div className={`flex justify-between`}>
                <span>{request.upvotes}</span>
                <span>{request.comments?.length}</span>
            </div>
        </li>
    );
};

const Column = ({
                    status,
                    groupStatus = "planned",
                    data,
                    children,
                }: {
    status: string;
    groupStatus: string;
    data: ProductRequest[];
    children: ReactNode;
}) => {
    const { setNodeRef } = useDroppable({
        id: status,
    });

    const pipedData = data.filter((r) => r.status === status);

    return (
        <div
            ref={setNodeRef}
            data-selected={groupStatus == status}
            className={`flex flex-col gap-8 w-full max-md:data-[selected=false]:hidden`}
        >
            <header>
                <h2>{Capitalise(status)} ({pipedData.length})</h2>
                {children}
            </header>

            <ul className={`flex flex-col gap-6`}>
                {pipedData.map((request) => (
                    <DraggableItem key={request.id} request={request} />
                ))}
            </ul>
        </div>
    );
};

const Page = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["product-feedback"],
        queryFn: getRequests,
    });

    const [groupStatus] = useState<string>("planned");
    const [items, setItems] = useState<ProductRequest[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);

    // initialize data once loaded
    if (data && items.length === 0) {
        setItems(data);
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!active || !over) return;

        const draggedId = active.id;
        const newStatus = over.id;

        setItems((prev) =>
            prev.map((item) =>
                item.id === draggedId ? { ...item, status: newStatus as string } : item
            )
        );
        setActiveId(null);
    };

    const activeItem = items.find((item) => item.id === activeId);

    if (isLoading || !data) return <div>Loading...</div>;
    if (isError) return <div>Error...</div>;

    return (
        <DndContext
            onDragEnd={handleDragEnd}
            onDragStart={(event) => setActiveId(event.active.id as any)}
            collisionDetection={closestCenter}
        >
            <div className={`flex max-xl:flex-col gap-6 min-w-full xl:min-w-[255px] max-w-[1110px] mx-auto`}>
                <main className={`flex flex-col gap-6 w-full`}>
                    <menu className={`flex items-center gap-10 bg-neutral-600 text-white w-full p-6 rounded-[10px]`}>
                        <h2 className={`text-preset-3 mr-auto`}>Roadmap</h2>
                        <a className={`px-6 py-3 rounded-[10px] bg-primary text-preset-4`}>+ Add Feedback</a>
                    </menu>

                    <section data-status={`planned`} className={`flex gap-6 group`}>
                        <Column groupStatus={groupStatus} status={`planned`} data={items}>
                            <p>Ideas prioritized for research</p>
                        </Column>

                        <Column groupStatus={groupStatus} status={`in-progress`} data={items}>
                            <p>being developed</p>
                        </Column>

                        <Column groupStatus={groupStatus} status={`live`} data={items}>
                            <p>Released features</p>
                        </Column>
                    </section>
                </main>
            </div>

            <DragOverlay>
                {activeItem ? (
                    <li className="group flex flex-col bg-white shadow-lg px-4 py-2 rounded">
                        <span>{Capitalise(activeItem.status)}</span>
                        <h2>{activeItem.title}</h2>
                        <p>{activeItem.description}</p>
                    </li>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};

export default Page;
