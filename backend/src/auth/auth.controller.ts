import {Body, Controller, HttpCode, Post, Req, UseGuards, UseInterceptors} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {RegisterDto} from "./dto/register.dto";
import {LocalAuthenticationGuard} from "./localAuthentication.guard";
import RequestWithUser from "./requestWithUser.interface";
import {UserService} from "../user/user.service";
import {LogInWithCredentialsGuard} from "./logInWithCredentialsGuard";

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @Post('register')
    async register(@Body() registrationData: RegisterDto) {
        return this.authService.register(registrationData);
    }

    @HttpCode(200)
    @Post('login')
    @UseGuards(LogInWithCredentialsGuard)
    async logIn(@Req() request: RequestWithUser) {
        const {user} = request;
        const accessTokenCookie = await this.authService.getCookieWithJwtAccessToken(user._id);
        const {cookie, token} = await this.authService.getCookieWithJwtRefreshToken(user._id);
        await this.userService.setCurrentRefreshToken(token, user._id);
        request.res.setHeader('Set-Cookie', [accessTokenCookie, cookie]);
        return {
            user,
            "jwt": accessTokenCookie
        };
    }
}
