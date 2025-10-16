import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Producto } from '../../producto/entities/producto.entity';

@Entity({name: 'Item_ordenes'}) //asi supabase lo reconoce
export class ItemOrden {
  @PrimaryGeneratedColumn({ name: 'id_item_orden' })
  id_item_orden: number;

  @Column({name: 'cantidad_productos', type: 'int'})
  cantidad_productos: number;

  //relacion muchos a uno con producto
  @ManyToOne(() => Producto, producto => producto.itemOrdenes)
  @JoinColumn({ name: 'id_producto' }) //nombre de la columna FK en la BD que referencia a Producto
  producto: Producto;

  //relacion muchos a uno con orden (pendiente conectar entidad orden)
  //@ManyToOne(() => Orden, orden => orden.itemOrdenes)
  //@JoinColumn({ name: 'id_orden' }) //nombre de la columna FK en la BD que referencia a Orden
  //orden: Orden;
}
