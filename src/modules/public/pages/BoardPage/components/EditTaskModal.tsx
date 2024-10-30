

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

export const EditTaskModal: FC = () => {

    const {
        state: {
            modals: {
                EditModal
            }
        },
        emit_EditModal
    } = useUiStore();

    const {
        state: {
            boards
        },
        emit_editTask,
        emit_setTaskLoading

    } = useBoardStore();

    const { status, board_id, task_id } = EditModal;

    let init_values: Init_valuesData_I = {
        title: '',
        description: ''
    }

    const { initialValues, validation_rules } = useFormInitData<Init_valuesData_I>(formData, init_values);

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {

            emit_editTask(board_id, task_id, values.title, values.description);
            onCloseModal();

        },
        validationSchema: validation_rules
    });


    const {
        values,
        errors,
        submitForm,
        setValues
    } = formik;

    const onCloseModal = () => {

        emit_EditModal(false, '', '');
        setValues({
            description: '',
            title: ''
        })
        emit_setTaskLoading(task_id, false);

    }

    useEffect(() => {

        if (status) {

            const board = boards.find(board => board.id === board_id);
            if (board) {
                const task = board.tasks.find(task => task.id === task_id);
                if (task) {
                    setValues({
                        title: task.title,
                        description: task.description
                    });
                }
            }

            emit_setTaskLoading(task_id, true);

        }

    }, [status]);

    return (
        <>
            <InfoModal title='Edit task' status={status} onClose={onCloseModal} >
                <div className="p-6 space-y-6">

                    <div className="text-sm">
                        Complete the following fields to edit a task
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
