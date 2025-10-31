import { Cliente } from "src/cliente/entities/cliente.entity";
import { Role } from "../../common/enums/role.enum";
import { Correo } from "src/correo/entities/correo.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, } from "typeorm"


@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn()
    Id_usuario: number;

    @Column()
    nombreCompleto: string;

    @Column({ unique: true, nullable: false })
    email: string;

    //el select: false es para que no devuelva la contraseña
    @Column({ nullable: false, select: false })
    contraseña: string;

    @Column({ type: 'date', nullable: true })
    fechaNacimiento: Date

    @Column({ nullable: true })
    foto: string;

    @Column({ type: 'enum', enumName: 'role', enum: Role, default: Role.USUARIO })
    role: Role;


    @OneToMany(() => Correo, (correo) => correo.usuario)
    correos: Correo[];
    
    @OneToOne(() => Cliente, (cliente) => cliente.usuario)
    cliente: Cliente;
}

