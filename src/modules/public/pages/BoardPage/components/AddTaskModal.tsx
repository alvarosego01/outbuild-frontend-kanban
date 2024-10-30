

import React, { FC, useEffect } from 'react'
import { useUiStore } from '../../../../../core/store';
import { FormLayoutBuilder, InfoModal, PrimaryButton } from '../../../../../core/components';
import { LayoutRow_I } from '../../../../../core/components/forms/interfaces';
import { useFormInitData } from '../../../../../core/hooks/useFormInitData';
import { Form, FormikProvider, useFormik } from 'formik';
import { useBoardStore } from '../../../store/hooks';


const formData: LayoutRow_I[] = [
    {
        fields: [
            {
                typeField: 'text',
                props: {
                    label: 'Title task',
                    name: 'title',
                    type: 'text',
                    validation_rules: [
                        {
                            type: "required",
                            message: "Is required"
                        },
                        {
                            type: "minLength",
                            value: 3,
                            message: "The name must be at least 3 characters long"
                        }
                    ]
                }
            },
            {
                typeField: 'textarea',
                props: {
                    label: 'Description',
                    name: 'description',
                    type: 'text',
                    validation_rules: [
                        {
                            type: "required",
                            message: "Is required"
                        },
                        {
                            type: "minLength",
                            value: 3,
                            message: "The name must be at least 3 characters long"
                        }
                    ]
                }
            },
        ],
        grid_columns: 'grid-cols-1 space-y-4'
    }

]

interface Init_valuesData_I {
    title: string;
    description: string;
}

export const AddTaskModal: FC = () => {

    const {
        state: {
            modals: {
                CreateTaskModal
            }
        },
        emit_CreateTaskModal

    } = useUiStore();

    const {
        emit_addTaskToBoard,
        emit_setBoardLoading

    } = useBoardStore();

    const { status, board_id } = CreateTaskModal;

    let init_values: Init_valuesData_I = {
        title: '',
        description: ''
    }

    const { initialValues, validation_rules } = useFormInitData<Init_valuesData_I>(formData, init_values);

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {

            emit_addTaskToBoard(board_id, values.title, values.description);

            onCloseNewTaskModal();

        },
        validationSchema: validation_rules
    });

    const {
        values,
        errors,
        submitForm,
        setValues
    } = formik;

    const onCloseNewTaskModal = () => {

        emit_CreateTaskModal(false, '');
        emit_setBoardLoading(board_id, false);
        setValues({
            description: '',
            title: ''
        })

    }

    useEffect(() => {

        if (status) emit_setBoardLoading(board_id, true);

    }, [status]);

    return (
        <>
                    <InfoModal title='Add new task' status={status} onClose={onCloseNewTaskModal} >
                        <div className="p-6 space-y-6">

                            <div className="text-sm">
                                Complete the following fields to create a new task
                            </div>

                            <FormikProvider value={formik}>
                                <Form noValidate>
                                    <FormLayoutBuilder rows={formData} />
                                </Form>
                            </FormikProvider>


                            <footer >
                                <div className="flex flex-col py-5 pb-0 border-t border-slate-200 dark:border-slate-700">
                                    <div className="flex self-end">
                                        <PrimaryButton onClick={submitForm} isLoading={false} label="Save" />
                                    </div>
                                </div>
                            </footer>

                        </div>
                    </InfoModal>
        </>
    )
}
