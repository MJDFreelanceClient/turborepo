import {FieldApi} from "@tanstack/react-form";

type BaseTextFieldProps = {
    field: FieldApi<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>;
    id: string;
    label: string;
    className?: string;
    placeholder?: string;
};

type TextInputProps = {
    type?: 'input'; // optional, defaults to input
};

type TextAreaProps = {
    type: 'area';
    rows?: number;
};

type TextFieldProps = BaseTextFieldProps & (TextInputProps | TextAreaProps);

function TextField({
                       field,
                       id,
                       label,
                       className = '',
                       placeholder,
                       ...rest
                   }: TextFieldProps) {
    const sharedProps = {
        id,
        ['data-error']: field.state.meta.errors.length > 0 ? 'true' : 'false',
        value: field.state.value,
        onChange: (e: { target: { value: string; }; })=>field.handleChange(e.target.value),
        placeholder,
        className:
            'border border-gray-300 rounded-[8px] p-2 hover:border-green-500 data-[error=true]:border-red-500 active:border-green-900 w-full',
    };

    function isTextAreaProps(props: typeof rest): props is TextAreaProps {
        return props.type === 'area';
    }

    return (
        <div className={`grid gap-2 h-full auto-rows-min ${className}`}>
            <label htmlFor={id}>
                {label} <span className="text-green-600">*</span>
            </label>
            <div className="relative isolate">
                {isTextAreaProps(rest) ? (
                    <textarea  {...sharedProps} rows={rest.rows ?? 3} />
                ) : (
                    <input type="text" {...sharedProps} />
                )}
            </div>
            <div>
                {field.state.meta.errors.map((error, index) => (
                    <div key={`error-${index}`} role="alert" className="text-red-500">
                        {typeof error === 'string' ? error : error.message}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TextField;