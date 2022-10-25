// ========== App Module
// import all modules
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ResponseModule } from './response/response.module';

const { DB_URI } = process.env;

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		MongooseModule.forRoot(DB_URI),
		AuthModule,
		ResponseModule,
	],
})
export class AppModule {}
