// ========== User Schema
// import all modules
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
	timestamps: true,
})
export class User {
	@Prop({
		required: true,
	})
	name: string;

	@Prop({
		required: true,
	})
	email: string;

	@Prop({
		required: true,
	})
	roomId: string;

	@Prop({
		default: Date.now(),
	})
	createdAt: number;

	@Prop({
		default: Date.now(),
	})
	updatedAt: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
