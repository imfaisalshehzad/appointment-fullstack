import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectConnection, InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./entities/user.entity";
import mongoose, {Model} from "mongoose";
import {AppointmentService} from "../appointment/appointment.service";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly appointmentsService: AppointmentService,
        @InjectConnection() private readonly connection: mongoose.Connection,
    ) {
    }

    async create(createUserDto: CreateUserDto) {
        const createdPost = new this.userModel(createUserDto);
        return createdPost.save();
    }

    async findAll() {
        return this.userModel.find().sort({"createdAt": "desc"});
    }

    async findOne(id: string) {
        const data = await this.userModel.findById(id);
        if (!data) {
            throw new NotFoundException();
        }
        return data;
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const data = await this.userModel
            .findByIdAndUpdate(id, updateUserDto)
            .setOptions({overwrite: true, new: true});
        if (!data) {
            throw new NotFoundException();
        }
        return data;
    }

    async remove(id: string) {

        const result = await this.userModel.findByIdAndDelete(id);
        if (!result) {
            throw new NotFoundException();
        }
    }


    async getByEmail(email: string) {
        const user = await this.userModel.findOne({email});
        if (user) {
            return user;
        }
        throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
    }

    async getById(userId: any) {
        const user = await this.userModel.findOne({userId});
        if (user) {
            return user;
        }
        throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
    }

    async setCurrentRefreshToken(token: any, _id: string) {
        
    }
}
