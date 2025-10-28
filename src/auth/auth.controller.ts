import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from './guard/auth.guard';


@Controller('auth')
export class AuthController {

    @Get('perfil')
    @UseGuards(AuthGuard)
    perfil(
        @Request() req
    ){
        return req.usuario;
    }
}
