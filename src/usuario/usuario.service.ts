import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import * as bcryptjs from 'bcryptjs';
import { Cliente } from '../cliente/entities/cliente.entity';
import { ClienteService } from '../cliente/cliente.service';


@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    //el injectRepository lo que hace es decirle a nest que quiero usar la tabla Producto
    private readonly usuariosRepository: Repository<Usuario>,
    private readonly dataSource: DataSource,
    private readonly clienteService: ClienteService,
  ) { }

  //Registro
  async registrar(datos: Partial<Usuario>) {
    const email = datos.email;
    const contraseña = datos.contraseña; //cambiar todas las contraseña a password
    const nombreCompleto = datos.nombreCompleto;
    const fechaNacimiento = datos.fechaNacimiento;
    const foto = datos.foto;

    //Verificar si ya existe el usuario con ese mail
    const usuarioExistente = await this.usuariosRepository.findOne({ where: { email } })
    if (usuarioExistente) {
      throw new BadRequestException('El email ya esta registrado')
    }

    //Crear nuevo usuario
    const nuevoUsuario = this.usuariosRepository.create({
      email,
      contraseña,
      nombreCompleto,
      fechaNacimiento: fechaNacimiento || new Date('2000-01-01'),
      foto,
    })

    const usuarioGuardado = await this.usuariosRepository.save(nuevoUsuario);
    //Crear cliente asociado al usuario
    await this.clienteService.create({
      usuarioId: usuarioGuardado.Id_usuario,
      nombre: usuarioGuardado.nombreCompleto,
      apellido: usuarioGuardado.nombreCompleto,
      direccion: '',
      F_nacimiento: usuarioGuardado.fechaNacimiento,
    });


    //excluimos la contraseña antes de devolver el usuario
    const { contraseña: _, ...usuarioSinContraseña } = usuarioGuardado;
    return usuarioSinContraseña;


    //return this.usuariosRepository.save(nuevoUsuario);

  }

  //Login
  async login(email: string, password: string) {
    //Buscar el usuario por email
    const usuario = await this.usuariosRepository.findOne({ where: { email } })
    if (!usuario) {
      throw new NotFoundException('El usuario no existe con este email')
    }
    //Comprar contraseñas con bcrypt
    const contraseñaValida = await bcryptjs.compare(password, usuario.contraseña);
    if (!contraseñaValida) {
      throw new BadRequestException('La contraseña es incorrecta');
    }
    /*if (usuario.contraseña !== contraseña) {
      throw new BadRequestException('La contraseña es incorrecta')
    }*/

    //Ocultamos la contraseña antes de devolver el usuario
    const { contraseña: _, ...usuarioSinContraseña } = usuario;
    return usuarioSinContraseña;
  }

  //Obtener todos los usuarios
  async listaUsuarios(): Promise<Usuario[]> {
    return this.usuariosRepository.find();
  }

  //Obtener usuario por ID
  async obtenerUsuario(id: number): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOneBy({ Id_usuario: id });
    if (!usuario) throw new NotFoundException('Usuario no encontrado')
    return usuario;
  }

  //Obtener usuario por Email (Registro/login)
  async obtenerUsuarioPorEmail(email: string): Promise<Usuario | null> {
    return await this.usuariosRepository.findOneBy({ email });
    //buscamos por la propiedad: email
  }

  //Obtener usuario por Email y Contraseña (como una query/consulta personalizada - no es sql) - este método específico se hace dado que en la entity se le ha puesto select:false para que no traiga la contraseña
  async obtenerUsuarioPorEmailConContraseña(email: string) {
    const usuario = await this.usuariosRepository.findOne({
      where: { email }, //condicion: busca cuando el email coincida
      select: ['Id_usuario', 'nombreCompleto', 'email', 'contraseña', 'role'], //y ademas trae estos datos
    });
    console.log(usuario);
    return usuario;
  }

  //Actualizar Perfil
  async actualizarPerfil(id: number, datos: Partial<Usuario>): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOneBy({ Id_usuario: id });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    // Validaciones básicas
   /* if (datos.nombreCompleto && datos.nombreCompleto.trim() === '') {
      throw new BadRequestException('El nombre no puede estar vacío');
    }*/

    if (datos.contraseña && datos.contraseña.length < 6) {
      throw new BadRequestException('La contraseña debe tener al menos 6 caracteres');
    }

    // Encriptar contraseña si se actualiza
    if (datos.contraseña) {
      datos.contraseña = await bcryptjs.hash(datos.contraseña, 10);
    }

    // Actualizar los campos que vengan en el body
    Object.assign(usuario, datos);
    return this.usuariosRepository.save(usuario);
  }

  //Eliminar Usuario
  async eliminarUsuario(id: number): Promise<void> {
    const usuario = await this.usuariosRepository.findOneBy({ Id_usuario: id });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    await this.usuariosRepository.remove(usuario);
  }
}
