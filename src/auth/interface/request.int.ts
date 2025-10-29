import { Request } from 'express';

export interface RequestConUsuario extends Request{
    usuario: {
        email: string;
        role: string;
    }
}