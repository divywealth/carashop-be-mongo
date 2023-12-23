import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Req,
  Put,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { LoginUserDto } from './dto/login-user.dto';
import {
  ResetPasswordDto,
  SendPasswordResetCode,
  VerifyPasswordCodeDto,
} from './dto/reset-password.dto';
import { Request } from 'express';
import { UpdatePassworDto } from './dto/update-password.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Controller({
  version: '1'
})
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  @Post('user')
  @UsePipes(ValidationPipe)
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.authenticationService.create(createUserDto);
    } catch (error) {
      throw error.message;
    }
  }

  @Post('signin')
  @UsePipes(ValidationPipe)
  loginUser(@Body() loginUserDto: LoginUserDto) {
    try {
      return this.authenticationService.loginUser(loginUserDto);
    } catch (error) {
      throw error.message;
    }
  }

  @Post('forgetpassword')
  @UsePipes(ValidationPipe)
  sendResetPasswordCode(@Body() sendPasswordResetCode: SendPasswordResetCode) {
    try {
      return this.authenticationService.sendResetPassword(
        sendPasswordResetCode.email,
      );
    } catch (error) {
      throw error.message;
    }
  }

  @Post('verifypasscode')
  @UsePipes(ValidationPipe)
  verifyPasswordCode(@Body() verifyPasswordCodeDto: VerifyPasswordCodeDto) {
    try {
      return this.authenticationService.verifyResetPasswordCode(
        verifyPasswordCodeDto,
      );
    } catch (error) {
      throw error.message;
    }
  }

  @Put('reset-password')
  @UsePipes(ValidationPipe)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    try {
      return this.authenticationService.resetPassword(resetPasswordDto);
    } catch (error) {
      throw error.message;
    }
  }

  @Put('change-password')
  @UsePipes(ValidationPipe)
  async updatePassword(
    @Body() updatePasswordDto: UpdatePassworDto,
    @Req() request: Request,
  ) {
    try {
      const token = request.headers.authorization.replace('Bearer ', '');
      const decodedToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const userId = decodedToken.user._id;
      const existingUser = await this.userService.findOne(userId);
      return this.authenticationService.updatePassword(
        updatePasswordDto,
        existingUser,
      );
    } catch (error) {
      throw error.message;
    }
  }

  @Patch('user/:id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.authenticationService.update(id, updateUserDto);
  }

  @Delete('user/:id')
  remove(@Param('id') id: string) {
    return this.authenticationService.remove(id);
  }
}
