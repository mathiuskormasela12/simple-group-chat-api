// ========== Auth Join Dto
// import all modules
import { ApiProperty } from '@nestjs/swagger';
import {
	IsAlphanumeric,
	IsEmail,
	IsNotEmpty,
	IsString,
	MinLength,
} from 'class-validator';

export default class AuthJoinDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MinLength(3)
	name: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@IsAlphanumeric()
	roomId: string;
}
