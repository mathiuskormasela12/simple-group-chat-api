// ========== Response Service
// import all modules
import { HttpException, Injectable } from '@nestjs/common';
import { IResponse } from 'src/types/response.types';

@Injectable()
export class ResponseService {
	public send(response: IResponse) {
		throw new HttpException(response, response.status);
	}
}
