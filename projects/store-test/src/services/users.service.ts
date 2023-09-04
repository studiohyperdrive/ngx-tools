import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { User } from '../interface/user.interface';

@Injectable()
export class UserService {
	public fetchUsers(): Observable<User[]> {
		return of([
			{ name: 'Iben', id: 'iben' },
			{ name: 'Denis', id: 'denis' },
		]).pipe(delay(500));
	}

	public addUser(id: string): Observable<User[]> {
		return of([{ name: 'Serguey', id }]).pipe(delay(500));
	}
}
