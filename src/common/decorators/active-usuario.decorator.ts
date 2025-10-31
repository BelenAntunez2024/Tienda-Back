import { createParamDecorator, ExecutionContext } from "@nestjs/common"

//decorador personalizado para devolver al usuario, se puede usar en cualquier lado que use el decorador de @Auth(Role.USUARIO/ADMIN/role solo)
export const ActiveUsuario = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.usuario;
    //objetivo: retornar el request.usuario
  }
)