import { get_Validation } from "../components";
import { FieldValue_I, LayoutRow_I, ValidationRule_I } from "../components/forms/interfaces";

import * as Yup from 'yup';


export const useFormInitData = <T = any>(data: LayoutRow_I[], init_fieldValues?: FieldValue_I) => {

    let aux_initial: { [key: string]: any } = {};
    let validation_rules: { [key: string]: any } = {};

    for (const input of data) {

        for (const field of input.fields) {

            aux_initial[field.props.name] = init_fieldValues?.[field.props.name] || '';
            let schema_fields = Yup.string();
            // let schema_select = Yup.mixed();

            if (!field.props.validation_rules) {

                continue;
            };

            for (const r of field.props.validation_rules) {

                const rule: ValidationRule_I = r;

                schema_fields = get_Validation(rule, schema_fields);


            }

            validation_rules[field.props.name] = schema_fields;

        }

    }

    validation_rules = Yup.object({ ...validation_rules })

    const initialValues: T = aux_initial as T;

    return {
        initialValues,
        validation_rules
    }

}


