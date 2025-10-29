import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsuarioDto } from 'src/usuario/dto/usuario.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor (
        private readonly usuarioService: UsuarioService, 
        private readonly jwtService: JwtService
    ){}

    async registro(usuarioDto: UsuarioDto){
        const usuario = await this.usuarioService.obtenerUsuarioPorEmail(usuarioDto.email);
        if(usuario){//aca deberia ponerse lo del email en uso
            throw new BadRequestException('El usuario ya existe');
        }
        
        //Encriptamos la contraseña antes de guardar el nuevo usuario
        const contraseñaHasheada = await bcryptjs.hash(usuarioDto.contraseña, 10);
        usuarioDto.contraseña = contraseñaHasheada;
        
        //Se registra el usuario con la contraseña encriptada
        return await this.usuarioService.registrar(usuarioDto);
    }

    async login(usuarioDto: UsuarioDto){
        const usuario = await this.usuarioService.obtenerUsuarioPorEmail(usuarioDto.email);
        if(!usuario){//aca deberia ponerse lo del email incorrecto
            throw new UnauthorizedException('El usuario no existe');
        } 

        //compara la contraseña que escribio el usuario con la que viene de la BD
        const contraseñaValida = await bcryptjs.compare(usuarioDto.contraseña, usuario.contraseña);
        if(!contraseñaValida){
            throw new UnauthorizedException('La contraseña es incorrecta');
        }

        const payload = {email : usuario.email, role: usuario.role};
        const token = await this.jwtService.signAsync(payload);
        
        return {
            token,
            email: usuario.email
        };
    }

    async perfil({email, role}:{ email: string; role: string }){

        /*if(role == 'admin'){

        }*/
        return await this.usuarioService.obtenerUsuarioPorEmail(email);
    }
} 

