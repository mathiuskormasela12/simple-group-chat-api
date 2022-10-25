// ========== Main
// import all modules
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import * as compression from 'compression';
import helmet from 'helmet';
import * as morgan from 'morgan';
import { AppModule } from './app.module';
import constants from './constants';

async function bootstrap() {
	const { PORT = 3000, API_URL } = process.env;

	const app = await NestFactory.create(AppModule);

	// Setup Some of Middlewares
	app.use(compression());
	app.use(helmet());
	app.use(morgan('dev'));

	// Setup Cors
	app.enableCors({
		origin: constants.CLIENTS,
	});

	// Setup For Validation
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
		}),
	);

	app.setGlobalPrefix('api/v1');

	// Setup Swagger UI
	const config = new DocumentBuilder()
		.setTitle('Group Chat')
		.setDescription('RESTful API of Group Chat')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);

	await app.listen(PORT);
	Logger.log(`The RESTful API is being run at ${API_URL}`);
}
bootstrap();
