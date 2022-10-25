// ========== Auth Controller
// import all modules
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseService } from 'src/response/response.service';
import { IResponse } from 'src/types/response.types';
import { AuthService } from './auth.service';
import AuthJoinDto from './dto/auth.join.dto';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private responseService: ResponseService,
	) {}

	@Post('/join')
	public async joinRoom(@Body() dto: AuthJoinDto) {
		const response: IResponse = await this.authService.joinRoom(dto);
		return this.responseService.send(response);
	}
}
