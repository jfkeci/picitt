import {
  BadRequestException,
  CanActivate,
  ConflictException,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserService } from 'src/resources/user/user.service';
import { Role } from 'src/interfaces/role.enum';

interface JwtPayloadId extends jwt.JwtPayload {
  id?: any;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly moduleRef: ModuleRef
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    let userId;

    const contextName = context.getClass().name;
    const req = context.switchToHttp().getRequest();

    if (contextName !== 'AuthController') {
      userId = await this.authUser(req);

      if (!userId) throw new UnauthorizedException('Not authorized');
    }

    return true;
  }

  private async authUser(req: Request): Promise<string | void> {
    let token;
    if (this.reqHasToken(req)) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) throw new UnauthorizedException('Not authorized');

    const decoded = jwt.verify(token, 'temp-server-secret') as JwtPayloadId;

    const userId = decoded.id;

    try {
      const userService = await this.moduleRef.get(UserService, {
        strict: false
      });

      const user = await userService.findOne({ id: Number(userId) });

      if (!user) throw new UnauthorizedException('Not authorized');

      if (!user.isEmailVerified) {
        throw new ConflictException('Email not verified');
      }
    } catch (err) {
      throw new UnauthorizedException('Not authorized');
    }

    return userId;
  }

  private getReqIdParam(req: Request): string {
    let id = req.params.id;

    if (!id) id = req.params.postId;
    if (!id) id = req.params.userId;

    return id;
  }

  private reqHasToken(req: Request): boolean {
    return (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    );
  }
}
