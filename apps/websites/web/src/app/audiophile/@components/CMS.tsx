import {useForm} from "@tanstack/react-form";

export const CMS = ({data}:{data:any}) => {
    const form = useForm({
        defaultValues: data,
        onSubmit: ({value}) => {
            saveData(value)
        },
    });

    return (
        <>
            {Object.keys(data).map((key)=>(
                <form.Field key={key} name={key}>
                    {field => (
                        <FieldParser field={field}/>
                    )}
                </form.Field>
            ))}
        </>
    );
};