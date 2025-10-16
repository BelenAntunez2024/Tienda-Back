import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity('Cliente')
export class Cliente {
    @PrimaryColumn({ name: 'ID_usuario', type: 'int' }) 
    id_usuario: number;

    @Column()
    Nombre: string;

    @Column()
    Apellido: string;

    @Column()
    Direccion: string;

    @Column({ name: 'F_Nacimiento', type: 'date' }) //hace que se mapee  exac. el nombre de la columna en la bd
    F_Nacimiento: Date;

 
    //lado dueño de la relación(por tener la FK)
    @OneToOne(() => Usuario, (usuario) => usuario.cliente)
    @JoinColumn({ name: "ID_usuario", // FK en Cliente
        referencedColumnName: "Id_usuario"
     }) 
    usuario: Usuario;
}
