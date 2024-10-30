
import { FC } from "react";
import { TextAreaField, TextInputField } from "..";
import { LayoutRow_I, SelectField_Props_I } from "./interfaces"


interface FormLayoutBuilder_Props_I {
    rows: LayoutRow_I[]
    // ref?: React.RefObject<HTMLInputElement>;
}

export const FormLayoutBuilder: FC<FormLayoutBuilder_Props_I> = ({ rows }) => {

    return (
        <>
            <div className="flex flex-col sm:items-center ">
                {
                    rows.map((row, i) => {
                        return (
                            <div key={`row-${i}`} className={`grid w-full grid-cols-1 m-0 gap-x-5 lg:mb-s_15 last:mb-0 ${row.grid_columns} `} >
                                {row.fields.map((field, j) => {

                                    switch (field.typeField) {
                                        case 'text':
                                            return <TextInputField key={j} {...field.props} />
                                        case 'textarea':
                                            return <TextAreaField key={j} {...field.props} />
                                        // case 'select':
                                        //     const f: SelectField_Props_I = field.props as SelectField_Props_I;
                                        //     return <SelectField key={j} {...f} >
                                        //         {
                                        //             f.placeholder && <option value="">
                                        //                 {f.placeholder}
                                        //             </option>
                                        //         }
                                        //         {
                                        //             f.items.map(({ value, label }) => (
                                        //                 <option key={value} value={value}>
                                        //                     {label}
                                        //                 </option>
                                        //             ))
                                        //         }
                                        //     </SelectField>
                                        // case 'file':
                                        //     return <FileHideInput key={j} {...field.props} />
                                        // case 'file_wIcon':
                                        //     return <FileWithIconField key={j} {...field.props} />
                                        // case 'date_picker':
                                        //         return <DatePicker key={j} {...field.props} />
                                        // case 'select_special':
                                        //     return <SelectSpecialField key={j} {...field.props} />
                                        // case 'checkbox':
                                        //     return <CheckBoxField key={j} {...field.props} />
                                        default:
                                            return <div key={j}>No field</div>
                                    }
                                })}
                            </div>
                        )
                    })}
            </div>
        </>

    )

}
