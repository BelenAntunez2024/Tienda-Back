import { Injectable, NotFoundException } from '@nestjs/common';
import { ClienteDto } from './dto/cliente.dto';
import { Cliente } from './entities/cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    //el injectRepository lo que hace es decirle a nest que quiero usar la tabla Producto
    private clienteRepository: Repository<Cliente>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>
  ) { }

  async create(clienteDto: ClienteDto) {
    const cliente = this.clienteRepository.create({
      Id_usuario: clienteDto.usuarioId,
      nombre: clienteDto.nombre,
      apellido: clienteDto.apellido,
      direccion: clienteDto.direccion,
      F_nacimiento: clienteDto.F_nacimiento,
    });

    if (clienteDto.usuarioId) {
      const usuario = await this.usuarioRepository.findOne({ where: { Id_usuario: clienteDto.usuarioId } });
      if (!usuario) {
        throw new NotFoundException(`Usuario con ID ${clienteDto.usuarioId} no existe`);
      }
      // Asignar la PK compartida y la relación
      cliente.Id_usuario = usuario.Id_usuario;
      cliente.usuario = usuario;
    }

    return this.clienteRepository.save(cliente);
  }

  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }

  async findOne(id: number): Promise<Cliente | null> {//el null es por si no lo encuentra
    return this.clienteRepository.findOne({ where: { Id_usuario: id } });
  }

  update(id: number, updateClienteDto: ClienteDto) {
    return `This action updates a #${id} cliente`;
  }

  remove(id: number) {
    return `This action removes a #${id} cliente`;
  }
}
