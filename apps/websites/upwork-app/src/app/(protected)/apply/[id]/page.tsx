import {getJob} from "@/lib/dynamo";
import {ApplicationAdvice} from "@/components/ApplicationAdvice";

export default async function Page({ params }: { params: { id: string } }
) {
    const { id } = params;
    const job = await getJob(id);


    return (
        <ApplicationAdvice job={job} />
    );

}
