import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


import { RootController } from './root/root.controller';
import { LoginModule } from './login/login.module';
import { UserModule } from './schema/user/user.module';
import { SignupModule } from './signup/signup.module';
import { AvailableModule } from './available/available.module';
import { ProfileModule } from './profile/profile.module';
import { PciModule } from './pci/pci.module';
import { PciChargerOptionModule } from './schema';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    LoginModule,
    MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION_URL, { useCreateIndex: true }),
    UserModule,
    SignupModule,
    AvailableModule,
    ProfileModule,
    PciModule,
    PciChargerOptionModule,
    BookingModule
  ],
  controllers: [RootController],
  providers: [],
})
export class AppModule { }
