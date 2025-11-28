import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Producto } from '../../producto/entities/producto.entity';
import { Ordenes } from '../../ordenes/entities/ordenes.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Entity({ name: 'Item_ordenes' }) //asi supabase lo reconoce
export class ItemOrden {
  @PrimaryGeneratedColumn({ name: 'id_item_orden' })
  id_item_orden: number;

  @Column({ name: 'id_producto', type: 'int' })
  id_producto: number;

  @Column({ name: 'Id_usuario', type: 'int' })  // Agrega de vuelta
  Id_usuario: number;

  @Column({ name: 'cantidad_productos', type: 'int' })
  cantidad_productos: number;

  //relacion muchos a uno con producto
  @ManyToOne(() => Producto, producto => producto.itemOrdenes)
  @JoinColumn({ name: 'id_producto' }) //nombre de la columna FK en la BD que referencia a Producto
  producto: Producto;

  //relacion muchos a uno con orden (pendiente conectar entidad orden)
  //agregado: nulleable
  @ManyToOne(() => Ordenes, orden => orden.itemOrdenes, { nullable: true })
  @JoinColumn({ name: 'id_orden' }) //nombre de la columna FK en la BD que referencia a Orden
  orden: Ordenes;

  @ManyToOne(() => Usuario, usuario => usuario.itemOrdenes, { nullable: true })
  @JoinColumn({ name: 'Id_usuario' })
  usuario: Usuario;
}
