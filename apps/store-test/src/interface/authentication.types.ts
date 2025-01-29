import { AuthenticationResponse, AuthenticatedUserSession } from '@studiohyperdrive/types-auth';

export interface User {
	name: string;
	id: string;
}

export interface Metadata {
	shouldUpdatePassword: boolean;
}

export interface SignInData {
	email: string;
	password: string;
}

export interface SignOutData {
	logOutEverywhere: boolean;
}

export type Features = 'A' | 'B';
export type Permissions = 'Admin' | 'User';

export type SignInResponse = AuthenticationResponse<
	User,
	AuthenticatedUserSession<Features, Permissions>,
	Metadata
>;
