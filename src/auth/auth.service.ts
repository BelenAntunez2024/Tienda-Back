import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsuarioDto } from 'src/usuario/dto/usuario.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/usuario/dto/login.dto';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
    private googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly jwtService: JwtService,
    ) { }

    async registro(usuarioDto: UsuarioDto) {
        const usuario = await this.usuarioService.obtenerUsuarioPorEmail(usuarioDto.email);
        if (usuario) {//aca deberia ponerse lo del email en uso
            throw new BadRequestException('El usuario ya existe');
        }

        //Encriptamos la contraseña antes de guardar el nuevo usuario
        const contraseñaHasheada = await bcryptjs.hash(usuarioDto.contraseña, 10);
        usuarioDto.contraseña = contraseñaHasheada;

        //Se registra el usuario con la contraseña encriptada, se guarda en la base de datos
        return await this.usuarioService.registrar(usuarioDto);
    }

    async login(loginDto: LoginDto) {
        const usuario = await this.usuarioService.obtenerUsuarioPorEmailConContraseña(loginDto.email);
        if (!usuario) {//aca deberia ponerse lo del email incorrecto
            throw new UnauthorizedException('El usuario no existe');
        }

        //compara la contraseña que escribio el usuario con la que viene de la BD
        const contraseñaValida = await bcryptjs.compare(loginDto.password, usuario.contraseña);
        if (!contraseñaValida) {
            throw new UnauthorizedException('La contraseña es incorrecta');
        }

        const payload = {
            id: usuario.Id_usuario,
            email: usuario.email,
            role: usuario.role
        };
        const token = await this.jwtService.signAsync(payload);

        return {
            token,
            email: usuario.email
        };
    }
       async googleLogin(credential: string) {
        try {
            const ticket = await this.googleClient.verifyIdToken({
                idToken: credential,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            
            if (!payload) throw new UnauthorizedException('Token inválido');
            
            const { email, name, sub: googleId } = payload;

            if (!email || !name) throw new UnauthorizedException('Datos insuficientes del token');

            // Buscar usuario existente por email
            let usuario: any = await this.usuarioService.obtenerUsuarioPorEmail(email);
            
            if (!usuario) {
                // Generar contraseña dummy para usuarios OAuth
                const dummyPassword = await bcryptjs.hash(Math.random().toString(36), 10);

                // Crear nuevo usuario si no existe
                const nuevoUsuario: Partial<UsuarioDto> = {
                    nombreCompleto: name,
                    email,
                    contraseña: dummyPassword,
                    fechaNacimiento: new Date('2000-01-01'), // Fecha por defecto
                };
                usuario = await this.usuarioService.registrar(nuevoUsuario);
            }
            
            // Generar JWT
            const jwtPayload = {
                id: usuario.Id_usuario,
                email: usuario.email,
                role: usuario.role,
            };
            const token = await this.jwtService.signAsync(jwtPayload);
            
            return { token, email: usuario.email };
        } catch (error) {
            throw new UnauthorizedException('Error en autenticación con Google');
        }
    }



    async perfil({ email, role }: { email: string; role: string }) {

        return await this.usuarioService.obtenerUsuarioPorEmail(email);
    }
}