//import { Cliente } from 'src/cliente/entities/cliente.entity';
import { ItemOrden } from 'src/item-ordenes/entities/item-ordene.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Ordenes')
export class Ordenes {
    @PrimaryGeneratedColumn({name:'ID_orden'})
    id_orden: number;

    @Column()
    total: number;

    @Column({type:"date"})
    fecha: Date;

    /*@ManyToOne(() => Cliente, (cliente) => cliente.ordenes)  //muchas órdenes pertenecen a un cliente
    @JoinColumn({ name: "ID_usuario" }) 
    cliente: Cliente;*/

   @OneToMany(() => ItemOrden, itemOrden => itemOrden.orden)
   itemOrdenes: ItemOrden[];
}
