export interface IRegisterForm {
	email: string;
	name: string;
	password: string;
}

export interface IRegisterResponse {
	message: string,
	email: string,
	access_token: string
}