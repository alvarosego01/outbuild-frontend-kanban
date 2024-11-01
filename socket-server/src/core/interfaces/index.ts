

export interface ConnectedUser_I {

    id: string;
    position?: CursorPosition_I;
    username?: string;

}

export interface CursorPosition_I {
    x: number;
    y: number;
}
