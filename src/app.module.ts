import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config'
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), //kết nối databasw
    TasksModule, AuthModule
  ], //tự động đc import sau khi khởi tạo 1 forder mới (nest g module + tên)
})
export class AppModule { }
