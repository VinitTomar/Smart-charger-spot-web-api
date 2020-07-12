import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


import { RootController } from './root/root.controller';
import { LoginModule } from './login/login.module';
import { UserModule } from './schema/user/user.module';
import { SignupModule } from './signup/signup.module';

@Module({
  imports: [
    LoginModule,
    MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION_URL, { useCreateIndex: true }),
    UserModule,
    SignupModule
  ],
  controllers: [RootController],
  providers: [],
})
export class AppModule { }
