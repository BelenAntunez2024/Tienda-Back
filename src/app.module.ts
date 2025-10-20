import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
<<<<<<< HEAD
import { UsuariosModule } from './usuario/usuario.module';
import { CorreoModule } from './correo/correo.module';
=======
import { UsuariosModule } from './usuarios/usuarios.module';
import { ProductoModule } from './producto/producto.module';
import { ItemOrdenesModule } from './item-ordenes/item-ordenes.module';
>>>>>>> origin/tablas-product-ordenes


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
<<<<<<< HEAD
      url: "postgresql://postgres.epdmrxhnyuscqmarffmf:2025Wisteria@aws-1-us-east-1.pooler.supabase.com:6543/postgres",
=======
      url: 'postgresql://postgres.epdmrxhnyuscqmarffmf:2025Wisteria@aws-1-us-east-1.pooler.supabase.com:6543/postgres',
>>>>>>> origin/tablas-product-ordenes
      synchronize: true,
      autoLoadEntities: false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    UsuariosModule,
<<<<<<< HEAD
    CorreoModule
=======
    ProductoModule,
    ItemOrdenesModule
>>>>>>> origin/tablas-product-ordenes
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  onApplicationBootstrap() {
    console.log("Conexion a la base de datos exitosa")
  }
}

