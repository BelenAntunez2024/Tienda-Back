import { Cliente } from 'src/cliente/entities/cliente.entity';
import { ItemOrden } from 'src/item-ordenes/entities/item-ordene.entity';
//import { ItemOrden } from 'src/item-ordenes/entities/item-ordenes.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'Ordenes'})
export class Ordenes {
    @PrimaryGeneratedColumn({name:'ID_orden'})
    ID_orden: number;

    @Column()
    total: number;

    @Column({type:"date"})
    fecha: Date;

    //AGREGADO
    @Column({name:"metodo_pago", nullable:true})
    metodo_pago: string;

    @ManyToOne(() => Cliente, (cliente) => cliente.ordenes)  //muchas órdenes pertenecen a un cliente
    @JoinColumn({ name: "Id_usuario" }) 
    cliente: Cliente;

    @OneToMany(() => ItemOrden, itemOrden => itemOrden.orden,
    {onDelete: 'CASCADE',}) //
    itemOrdenes: ItemOrden[];
}
