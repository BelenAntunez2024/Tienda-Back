import { Controller, Get, UseGuards, Req, Post, Body } from '@nestjs/common';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './auth.service';
import { UsuarioDto } from 'src/usuario/dto/usuario.dto';
import { RequestConUsuario } from './interface/request.int';
import { Roles } from './decorators/roles.decorators';
import { RolesGuard } from './guard/roles.guard';
import { Role } from '../common/enums/role.enum';
import { Auth } from './decorators/auth.decorator';
import { ActiveUsuario } from 'src/common/decorators/active-usuario.decorator';
import { AactiveUsuarioInterface } from 'src/common/interface/usuario-active.interface';
import { LoginDto } from 'src/usuario/dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('registro')
    registro(
        @Body()
        usuarioDto: UsuarioDto
    ) {
        console.log(usuarioDto);
        return this.authService.registro(usuarioDto);
    }

    @Post('login')
    login(
        @Body()
        loginDto: LoginDto
    ) {
        return this.authService.login(loginDto);
    }
    
    @Post('google-login')
    async googleLogin(@Body() body: { credential: string }) {
    return this.authService.googleLogin(body.credential);
 }
    
    @Get('perfil')
    @Auth(Role.USUARIO)
    perfil(@ActiveUsuario() usuario: AactiveUsuarioInterface) {
        console.log(usuario);
        return this.authService.perfil(usuario);
    }


}