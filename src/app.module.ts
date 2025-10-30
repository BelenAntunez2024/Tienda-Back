import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoModule } from './producto/producto.module';
import { ItemOrdenesModule } from './item-ordenes/item-ordenes.module';
import { UsuariosModule } from './usuario/usuario.module';
import { CorreoModule } from './correo/correo.module';
import { AuthModule } from './auth/auth.module';
import { OrdenesModule } from './ordenes/ordenes.module';
import { ClienteModule } from './cliente/cliente.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: "postgresql://postgres.epdmrxhnyuscqmarffmf:2025Wisteria@aws-1-us-east-1.pooler.supabase.com:6543/postgres",
      synchronize: true,
      autoLoadEntities: false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    UsuariosModule,
    CorreoModule,
    AuthModule,
    ProductoModule,
    ItemOrdenesModule,
    OrdenesModule,
    ClienteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  onApplicationBootstrap() {
    console.log("Conexion a la base de datos exitosa")
  }
}

