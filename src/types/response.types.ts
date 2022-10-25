// ========== Response Types

export interface IResponse {
	status: number;
	errors?: string | string[];
	message?: string;
	results?: unknown;
}
