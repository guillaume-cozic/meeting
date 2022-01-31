import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MeetingModule } from './meeting/meeting.module';
import { DateTimeGatewayProvider } from './shared/provider/datetime.gateway.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forRoot(), MeetingModule, ConfigModule.forRoot({
    isGlobal: true,
  })],
  controllers: [AppController],
  providers: [DateTimeGatewayProvider],
})
export class AppModule {}
