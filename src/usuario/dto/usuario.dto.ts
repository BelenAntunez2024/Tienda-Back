import{IsEmail,  MinLength} from 'class-validator'

export class UsuarioDto {
    @IsEmail({},{ message: 'El correo no es valido' })
    email: string;
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    contrasena: string;

    nombreCompleto?:string;
}
