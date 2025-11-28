import { Usuario } from "../../usuario/entities/usuario.entity";
import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import { ClasificacionMensaje } from "../clasificacion-mensaje.enum";

@Entity({name: 'correo'})
export class Correo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum', //solo permite valores predefinidos
        enum: ClasificacionMensaje,
        nullable: false
    })   
    clasificacion_mjs: string;

    @Column({nullable: false})
    mensaje: string;

    @Column({unique: true, nullable: false})
    email: string;

    @ManyToMany(()=> Usuario, (usuario) => usuario.correos)
    usuario: Usuario

}

