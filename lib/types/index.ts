export type User = {
    name?: string;
    email: string;
    id: number;
};

export type LoginRequestParams = {
    email: string;
    password: string;
};

export type RegisterRequestParams = {
    name?: string;
    email: string;
    password: string;
};
