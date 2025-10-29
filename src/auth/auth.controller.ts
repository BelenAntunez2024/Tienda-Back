import { Controller, Get, UseGuards, Req, Post, Body } from '@nestjs/common';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './auth.service';
import { UsuarioDto } from 'src/usuario/dto/usuario.dto';
import { RequestConUsuario } from './interface/request.int';
import { Roles } from './decorators/roles.decorators';
import { RolesGuard } from './guard/roles.guard';
import { Role } from './enums/role.enum';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('registrar')
    registrar(
        @Body()
        usuarioDto: UsuarioDto
    ) {
        return this.authService.registro(usuarioDto);
    }

    @Post('login')
    login(
        @Body()
        usuarioDto: UsuarioDto
    ) {
        return this.authService.login(usuarioDto);
    }

    /*@Get('perfil')
    @Roles(Role.USUARIO)
    @UseGuards(AuthGuard, RolesGuard)
    perfil(@Req() req: RequestConUsuario,) {
        return this.authService.perfil(req.usuario);
    }*/

    @Get('perfil')
    @Auth(Role.ADMIN)
    perfil(@Req() req: RequestConUsuario,) {
        return this.authService.perfil(req.usuario);
    }


}
