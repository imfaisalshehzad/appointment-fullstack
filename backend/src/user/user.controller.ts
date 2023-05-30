import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import ParamsWithId from '../utils/paramsWithId';
import JwtAuthenticationGuard from "../auth/jwt-authentication.guard";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    /* @todo @UseGuards(JwtAuthenticationGuard) */
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    async findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Param() {id}: ParamsWithId) {
        return this.userService.findOne(id);
    }

    @Patch(':id')
    async update(@Param() {id}: ParamsWithId, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    async remove(@Param() {id}: ParamsWithId) {
        return this.userService.remove(id);
    }
}
