import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { generateToken } from 'src/utils/gen-token.util';
import { sendEmail } from 'src/utils/mailer.util';
import { VerifyEmailDto } from './dto/verify-email.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async registerUser(data: RegisterUserDto) {
    let user = await this.prisma.users.findUnique({
      where: { email: data.email },
    });

    if (user) {
      throw new ConflictException('User with this email already exists');
    }

    user = null;

    user = await this.prisma.users.findUnique({
      where: { username: data.username },
    });

    if (user) {
      throw new ConflictException('User with this username already exists');
    }

    data.password = await bcrypt.hash(data.password, 10);

    const token = generateToken();

    const newUser = await this.prisma.users.create({
      data: { ...data, emailVerificationToken: token },
    });

    if (!newUser) throw new BadRequestException('Failed to create user');

    await sendEmail({
      from: 'picitt@info.com',
      to: newUser.email,
      subject: 'Verify your email',
      html: `<html>
      <h1>Email verification</h1>
      <br><hr><br>
      <h3>
      <a href="${process.env.BASE_URL}/auth/verify/${newUser.id}/${token}">
      Verify email
      </a>
      </h3>
      <br><br>
      </html>`,
    });

    return newUser;
  }

  async loginUser(data: LoginUserDto) {
    let query;

    console.log('data', data);

    if (!data) {
      throw new BadRequestException('Provide email or username with password');
    }

    if (!data.username || !data.email) {
      throw new BadRequestException('Provide email or username');
    } else if (data.username) {
      query = { username: data.username };
    } else if (data.email) {
      query = { email: data.email };
    }

    const user = await this.prisma.users.findUnique({ where: query });

    if (!user) throw new NotFoundException('No user found');

    if (!user.isEmailVerified) {
      throw new BadRequestException('User not verified');
    }

    if (await bcrypt.compare(data.password, user.password)) {
      return user;
    } else {
      throw new UnauthorizedException('Not authorised');
    }
  }

  async verifyEmail(data: VerifyEmailDto) {
    const user = await this.prisma.users.findFirst({
      where: { id: Number(data.userId), emailVerificationToken: data.token },
    });

    if (!user) throw new NotFoundException('No user found');

    const updatedUser = await this.prisma.users.update({
      where: { id: Number(data.userId) },
      data: {
        emailVerificationToken: '',
        isEmailVerified: true,
      },
    });

    return updatedUser;
  }

  recoverPassword(id: number) {
    return `This action returns a #${id} auth`;
  }

  updatePassword() {
    return 'update password';
  }
}
