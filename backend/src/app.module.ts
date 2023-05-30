import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ConfigModule, ConfigService} from '@nestjs/config';
import * as Joi from '@hapi/joi';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {AppointmentModule} from './appointment/appointment.module';
import {AuthModule} from './auth/auth.module';
import {APP_FILTER} from "@nestjs/core";
import {ExceptionsLoggerFilter} from "./utils/exceptionsLogger.filter";

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                MONGO_USERNAME: Joi.string().required(),
                MONGO_PASSWORD: Joi.string().required(),
                MONGO_DATABASE: Joi.string().required(),
                MONGO_PATH: Joi.string().required(),
            }),
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                const username = configService.get('MONGO_USERNAME');
                const password = configService.get('MONGO_PASSWORD');
                const database = configService.get('MONGO_DATABASE');
                const host = configService.get('MONGO_HOST');

                return {
                    uri: `mongodb://${username}:${password}@${host}`,
                    dbName: database,
                };
            },
            inject: [ConfigService],
        }),
        UserModule,
        AppointmentModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: ExceptionsLoggerFilter,
        },
    ],
})
export class AppModule {
}
