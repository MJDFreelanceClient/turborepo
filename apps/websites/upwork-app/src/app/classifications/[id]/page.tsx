import {getClassification} from "@/lib/dynamo";

export default async function Page({ params }: { params: { id: string } }
) {
    const { id } = params;
    const classification = await getClassification(id);

    return (
        <div className="flex flex-col gap-6 p-4">
            <p>ID: {id}</p>
            <pre>
                {JSON.stringify(classification, null, 2)}
            </pre>
        </div>
    );

}
