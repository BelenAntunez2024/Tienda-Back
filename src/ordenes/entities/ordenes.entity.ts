import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Ordenes')
export class Ordenes {
    @PrimaryGeneratedColumn({name:'ID_orden'})
    id_orden: number;

    @Column()
    total: number;

    @Column({type:"date"})
    fecha: Date;

    @ManyToOne(() => Cliente, (cliente) => cliente.ordenes)  //muchas órdenes pertenecen a un cliente
    @JoinColumn({ name: "ID_usuario" }) 
    cliente: Cliente;

   
}
