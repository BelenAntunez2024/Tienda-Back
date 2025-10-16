import { Usuario } from "src/usuario/entities/usuario.entity";
import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
@Entity("correo")
export class Correo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    clasificacion_mjs: string;

    @Column()
    mensaje: number;

    @ManyToMany(()=> Usuario, (usuario) => usuario.correos)
    usuario: Usuario

}

