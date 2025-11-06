import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CorreoModule } from './correo/correo.module';
import { ProductoModule } from './producto/producto.module';
import { ItemOrdenesModule } from './item-ordenes/item-ordenes.module';
import { UsuariosModule } from './usuario/usuario.module';
import { OrdenesModule } from './ordenes/ordenes.module';
import { ClienteModule } from './cliente/cliente.module';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    // Carga las variables de entorno primero.
    ConfigModule.forRoot({
      isGlobal: true, // Hace que esté disponible en toda la app
      envFilePath: '.env', // Ruta del archivo .env
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Asegura que ConfigModule esté disponible
      useFactory: (configService: ConfigService) => ({//Usa ConfigService para obtener las variables de entorno
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),// Obtiene la URL de la base de datos desde las variables de entorno
        synchronize: true,
        autoLoadEntities: false,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
      inject: [ConfigService],
    }),
    UsuariosModule,
    CorreoModule,
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

