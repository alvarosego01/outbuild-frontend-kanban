

export enum TaskStatus_E {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

export interface Comment_I {
    id: string;
    content: string;
    created_at: string;
    created_by: string;
}

export interface Task_I {
    id: string;
    title: string;
    description: string;
    created_at: string;
    comments: Comment_I[];
    // status: TaskStatus_E;
}

export interface Board_I {
    id: string;
    title: string;
    tasks: Task_I[];
}

export interface Handle_Events_I {
    isLoading: boolean;
    isInteracting: Boolean;
}

export interface Modal_Base_I {
    status: boolean;
    title?: string;
    children?: React.ReactNode;
    size?: "normal" | "big";
    onClose?: () => void;
}

export * from './modals';