

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

export interface CursorPosition_I {
    x: number;
    y: number;
}

export interface ConnectedUser_I {

    id: string;
    position?: CursorPosition_I;
    username?: string;

}

export * from './modals';