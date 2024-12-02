import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

export const getQueryParams = <ParamType>(): Observable<ParamType> => {
	return inject(ActivatedRoute).queryParams as Observable<ParamType>;
};
