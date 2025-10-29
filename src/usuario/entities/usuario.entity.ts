import { Correo } from "src/correo/entities/correo.entity";
import{Column, Entity, OneToMany, PrimaryGeneratedColumn, } from "typeorm"


@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn()
    Id_usuario: number;

    @Column()
    nombreCompleto: string;

    @Column({unique: true, nullable: false})
    email: string;

    @Column({nullable: false})
    contraseña: string;

    @Column({type: 'date', nullable: true })
    fechaNacimiento: Date

    @Column({nullable: true})
    foto: string;

    //type: 'enum', default: Role.USER, enum: Role 
    @Column({ default: 'usuario'})
    role: string;


    @OneToMany(() => Correo, (correo) => correo.usuario)
    correos: Correo[]
}

