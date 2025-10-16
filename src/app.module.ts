import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ProductoModule } from './producto/producto.module';
import { ItemOrdenesModule } from './item-ordenes/item-ordenes.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://postgres.epdmrxhnyuscqmarffmf:2025Wisteria@aws-1-us-east-1.pooler.supabase.com:6543/postgres',
      synchronize: true,
      autoLoadEntities: false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    UsuariosModule,
    ProductoModule,
    ItemOrdenesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  onApplicationBootstrap() {
    console.log("Conexion a la base de datos exitosa")
  }
}

