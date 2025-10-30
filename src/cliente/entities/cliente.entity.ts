import { Ordenes } from 'src/ordenes/entities/ordenes.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Entity, Column, OneToOne, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('Cliente')
export class Cliente {
    // Genera el ID automáticamente en la BD y mapea la columna real "ID_usuario"
    @PrimaryColumn({ name: 'ID_usuario', type: 'int' })
    Id_usuario: number;

    // Propiedades en camelCase para coincidir con DTOs/requests, mapeadas a las columnas reales
    @Column({ name: 'Nombre' })
    nombre: string;

    @Column({ name: 'Apellido' })
    apellido: string;

    @Column({ name: 'Direccion' })
    direccion: string;

    @Column({ name: 'F_Nacimiento', type: 'date' }) //hace que se mapee  exac. el nombre de la columna en la bd
    F_nacimiento: Date;

 
    //lado dueño de la relación(por tener la FK)
    @OneToOne(() => Usuario, (usuario) => usuario.cliente)
    @JoinColumn({
        name: 'ID_usuario', // FK en Cliente
        referencedColumnName: 'Id_usuario'
    })
    usuario: Usuario;

    @OneToMany(() => Ordenes, (orden) => orden.cliente)
    ordenes: Ordenes[];
}
