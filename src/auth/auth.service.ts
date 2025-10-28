import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsuarioDto } from 'src/usuario/dto/usuario.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (private readonly usuarioService: UsuarioService, 
        private readonly jwtService: JwtService){}

    async registro(usuarioDto: UsuarioDto){
        const usuario = await this.usuarioService.obtenerUsuarioPorEmail(usuarioDto.email);
        if(usuario){
            throw new BadRequestException('El usuario ya existe');
        }
        
        //Encriptamos la contraseña antes de guardar el nuevo usuario
        const contraseñaHasheada = await bcrypt.hash(usuarioDto.contraseña, 10);
        usuarioDto.contraseña = contraseñaHasheada;
        
        //Se registra el usuario con la contraseña encriptada
        return await this.usuarioService.registrar(usuarioDto);
    }

    async login(usuarioDto: UsuarioDto){
        const usuario = await this.usuarioService.obtenerUsuarioPorEmail(usuarioDto.email);
        if(!usuario){
            throw new UnauthorizedException('El usuario no existe');
        } 
        const contraseñaValida = await bcrypt.compare(usuarioDto.contraseña, usuario.contraseña);
        if(!contraseñaValida){
            throw new UnauthorizedException('La contraseña es incorrecta');
        }
        const payload = {email : usuario.email};
        const token = await this.jwtService.signAsync(payload);
        
        return {
            token,
            email: usuario.email
        };
    }
} 

 