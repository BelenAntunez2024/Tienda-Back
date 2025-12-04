import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorators';
import { Role } from '../../common/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector){}

  canActivate(
    context: ExecutionContext,
  ): boolean{

    const role = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if(!role){
      return true;
    }

    const {usuario} = context.switchToHttp().getRequest();

    if(usuario.role === Role.ADMIN){
      return true; //esto hace que el rol admin sea aceptado en cualquier peticion del rol usuario
    }

    return role === usuario.role;
  }
}