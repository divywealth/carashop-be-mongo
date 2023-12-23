import { NotificationService } from './../Util/NotificationService';
import { Injectable } from '@nestjs/common';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { LoginUserDto } from './dto/login-user.dto';
import {
  ResetPasswordDto,
  VerifyPasswordCodeDto,
} from './dto/reset-password.dto';
import { UpdatePassworDto } from './dto/update-password.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schema/user.entity';
import * as mongoose from 'mongoose';
import { BadRequest } from 'src/Util/BadRequestResponse';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { VerificationService } from 'src/verification/verification.service';
import { randomNumber } from 'src/Util/randomNumber';
import { Verification } from 'src/verification/entities/verification.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: mongoose.Model<User>,
    @InjectModel(Verification.name)
    private readonly verificationModel: mongoose.Model<Verification>,
    private readonly verificationService: VerificationService,
    private readonly notificationService: NotificationService,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.userModel.findOne({
        email: createUserDto.email,
      });
      if (existingUser) {
        return BadRequest('user already exists');
      }
      const saltRounds: number = 10;
      const hashedPassword: string = await bcrypt.hash(
        createUserDto.password,
        saltRounds,
      );
      const information2Save = {
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        phoneNo: createUserDto.phoneNo,
        password: hashedPassword,
      };
      const createdUserOne = new this.userModel(information2Save);
      const createdUserTwo = await createdUserOne.save();
      return {
        user: createdUserTwo,
        access_token: await this.jwtService.signAsync({ user: createdUserTwo }),
      };
    } catch (error) {
      throw error;
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    try {
      if (!loginUserDto.phoneNo || !loginUserDto.password) {
        throw BadRequest('email and password required');
      }
      const existingUser = await this.userModel.findOne({
        phoneNo: loginUserDto.phoneNo,
      });
      if (!existingUser) {
        throw BadRequest(
          "PhoneNo dosen't have an account try creating an account instead",
        );
      } else if (
        !(await bcrypt.compare(loginUserDto.password, existingUser.password))
      ) {
        return BadRequest('Incorrect Password');
      } else {
        return {
          user: existingUser,
          access_token: this.jwtService.sign({ user: existingUser }),
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async sendResetPassword(email: string) {
    const existingUser = await this.userModel.findOne({
      email: email,
    });
    if (!existingUser) {
      return BadRequest('No account with this email');
    }
    const clearUserOldVerificationCode =
      await this.verificationService.removeUserVerification(existingUser._id);
    const verificationCode = randomNumber(6);
    const verification = await this.verificationService.create(
      existingUser._id,
      verificationCode,
    );
    const emailPayload = {
      to: email,
      subject: 'Cara-shop Reset Password',
      from: 'christianonuora1@gmail.com',
      text: 'Hello World from NestJS Sendgrid',
      html: `<h1>Hello ${existingUser.firstName} your verification code is ${verificationCode}</h1>`,
    };
    await this.notificationService.emailNotificationService(emailPayload);
    return `passcode has been sent to ${email}`;
  }

  async verifyResetPasswordCode(verifyPasswordCode: VerifyPasswordCodeDto) {
    try {
      const verify = await this.verificationModel.findOne({
        'user.email': verifyPasswordCode.email,
        verificationCode: verifyPasswordCode.verificationCode,
      });
      console.log(verify);
      if (!verify) {
        return BadRequest('invalid verification code');
      }
      return 'successful';
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    try {
      if (!resetPasswordDto.password) {
        return BadRequest('Password is required');
      }
      if (resetPasswordDto.password.length < 5) {
        return BadRequest(
          'Password is too short. Atleast 6 characters required',
        );
      }
      const existingUser = await this.userModel.findOne({
        email: resetPasswordDto.email,
      });
      if (!existingUser) {
        return BadRequest('user not found');
      }
      const saltOrRounds = 10;
      const password = await bcrypt.hash(
        resetPasswordDto.password,
        saltOrRounds,
      );
      return await this.userModel.findOneAndUpdate(
        { email: resetPasswordDto.email },
        { password: password },
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePassword(updatePasswordDto: UpdatePassworDto, user: User) {
    try {
      if (
        !(await bcrypt.compare(
          updatePasswordDto.currentpassword,
          user.password,
        ))
      ) {
        return BadRequest('Current password not correct');
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(
        updatePasswordDto.newpassword,
        saltRounds,
      );
      return this.userModel.findOneAndUpdate(
        { email: user.email },
        { password: hashedPassword },
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.userModel.findByIdAndUpdate(
        { _id: id },
        updateUserDto,
        { new: true, runValidators: true },
      );
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.userModel.findOneAndDelete({ _id: id });
    } catch (error) {
      throw error;
    }
  }
}
