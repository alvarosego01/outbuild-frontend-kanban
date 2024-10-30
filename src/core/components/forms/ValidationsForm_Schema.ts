
import * as Yup from 'yup';
import { ValidationRule_I, SelectValue_I, ValidationsRule_Separate_I } from './interfaces';

export const get_Validation = (rule: ValidationRule_I, schema: any) => {

    if (rule.type === 'isArray_required') {
        schema = schema.test(
            'isArray',
            rule.message,
            (array: any) => Array.isArray(array) && array.length > 0
        );
    }
    if (rule.type === 'required') {
        schema = schema.required(rule.message);
    }
    if (rule.type === 'notRequired') {
        schema = schema.notRequired();
    }
    if (rule.type === 'minLength') {
        schema = schema.min(Number(rule.value) || 1, rule.message);
    }
    if (rule.type === 'maxLength') {
        schema = schema.max(Number(rule.value) || 1, rule.message);
    }
    if (rule.type === 'email') {
        schema = schema.email(rule.message);
    }
    if (rule.type === 'tel') {
    }
    if (rule.type === 'url') {
        schema = schema.url(rule.message);
    }
    if (rule.type === 'pattern') {
        schema = schema.matches(rule.value, rule.message);
    }
    if (rule.type === 'same_field') {
        schema = schema.oneOf([Yup.ref(String(rule.value))], rule.message)
    }
    if (rule.type === 'conditional_required') {
        if (!rule.conditional) return schema;
        const { key, is, then, otherwise } = rule.conditional;
        schema = schema.when(key, {
            is: (value: any) => {
                return value === is
                },
            then: (schm: any) => schm.required(rule.message),
            otherwise: (schm: any) => schm.notRequired(),
        });
    }
    if (rule.type === 'fileSize_5m') {
        schema = schema.test('fileSize', 'Solo se permiten archivos no mayores a 5MB',
            (value: any) => {
                if (value) {
                    return value.size <= 5000000;
                }
                return true;
            });
    }
    if (rule.type === 'fileSize_10m') {
        schema = schema.test('fileSize', 'Solo se permiten archivos no mayores a 10MB',
            (value: any) => {
                if (value) {
                    return value.size <= 10000000;
                }
                return true;
            });
    }

    return schema;

}

export const get_Validations = (rule: ValidationsRule_Separate_I) => {

    let schema = Yup.string()

    Object.keys(rule).forEach((key: string) => {
        rule[key].forEach((rule: ValidationRule_I) => {
            schema = get_Validation(rule, schema);
        });
    })

    return schema;

}