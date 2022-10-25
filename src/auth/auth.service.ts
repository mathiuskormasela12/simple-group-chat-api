// ========== Auth Service
// import all modules
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { IResponse } from 'src/types/response.types';
import AuthJoinDto from './dto/auth.join.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
	) {}

	public async joinRoom(dto: AuthJoinDto): Promise<IResponse> {
		try {
			const user = await this.userModel.findOne({ email: dto.email }).exec();

			if (!user) {
				await this.userModel.create({
					name: dto.name,
					email: dto.email,
					roomId: dto.roomId,
				});

				return {
					status: HttpStatus.CREATED,
					message: 'Register Successfully',
				};
			} else {
				return {
					status: HttpStatus.BAD_REQUEST,
					errors: ['You have an account already'],
				};
			}
		} catch (err) {
			return {
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				errors: [err],
			};
		}
	}
}
