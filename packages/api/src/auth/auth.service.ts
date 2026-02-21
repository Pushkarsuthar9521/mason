import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async register(dto: RegisterDto) {
    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [{ username: dto.username }, { email: dto.email }],
      },
    });

    if (user) {
      throw new ConflictException('Username or email already taken');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = await this.prismaService.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        password: hashedPassword,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = newUser;
    return result;
  }

  async login(dto: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        username: dto.username,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid Username');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Password');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
