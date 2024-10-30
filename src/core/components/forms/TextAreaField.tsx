


import { is_required } from './Commons';
import { TextAreaField_Props_I } from './interfaces';

import { ErrorMessage, useField } from 'formik';

export const TextAreaField = ({ label, parent_class: parent_className, ...props }: TextAreaField_Props_I) => {

    const [field, meta] = useField(props);

    // const isRequired = props.validation_rules?.some(rule => rule.type === "required") || false;
        const isRequired = props.validation_rules?.some(rule => (is_required(rule.type))) || false;


        const fieldState = (): string => {

        if (meta.error && meta.touched) return 'border-rose-300';

        if (meta.touched) return 'border-emerald-300';

        return '';
    }

    return (
        <div className={`${parent_className || ''} mb-s_10 lg:mb-0`} >
            {
                props.name && (<label className="block mb-1 text-sm font-medium" htmlFor={props.id || props.name}>     {label}
                    {isRequired && <span className="text-rose-500">*</span>}
                </label>)
            }
            <textarea className={`w-full form-textarea focus:border-slate-300 ${fieldState()}`} rows={4} placeholder={props.placeholder} {...field} {...props} />
            <ErrorMessage name={props.name} component='span' className="mt-1 text-xs text-rose-500" />

        </div>
    )
}
