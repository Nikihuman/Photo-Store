export interface ILoginForm {
   email: string;
   password: string;
}

export interface ILoginResponse {
   message: string;
   access_token: string;
}
