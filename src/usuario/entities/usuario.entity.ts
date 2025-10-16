import { Correo } from "src/correo/entities/correo.entity";
import{Column, Entity, OneToMany, PrimaryGeneratedColumn, } from "typeorm"

@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn()
    Id_usuario: number;

    @Column()
    nombreCompleto: string

    @Column({unique: true})
    email: string

    @Column()
    contraseña: string

    @Column({type: 'date', nullable: true })
    fechaNacimiento: Date


    @OneToMany(() => Correo, (correo) => correo.usuario)
    correos: Correo[]
}

