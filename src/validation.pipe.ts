// ========== Validation Pipe
// import all modules
import {
	PipeTransform,
	Injectable,
	ArgumentMetadata,
	HttpStatus,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ResponseService } from './response/response.service';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
	constructor(private responseService: ResponseService) {}

	async transform(value: unknown, { metatype }: ArgumentMetadata) {
		if (!metatype || !this.toValidate(metatype)) {
			return value;
		}
		const object = plainToInstance(metatype, value);
		const errors = await validate(object);
		if (errors.length > 0) {
			const customErrors = errors.map((err) => Object.values(err.constraints));
			const finalErrors = [];

			for (const err of customErrors) {
				finalErrors.push(...err);
			}

			return this.responseService.send({
				status: HttpStatus.BAD_REQUEST,
				errors: finalErrors as never,
			});
		}
		return value;
	}

	private toValidate(metatype: unknown): boolean {
		const types: unknown[] = [String, Boolean, Number, Array, Object];
		return !types.includes(metatype);
	}
}
