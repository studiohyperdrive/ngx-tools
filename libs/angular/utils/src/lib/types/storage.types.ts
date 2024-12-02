import { BehaviorSubject, Observable } from 'rxjs';

export type NgxStorageRecord = Record<string, BehaviorSubject<any>>;

export type NgxStorageType = 'local' | 'session';

interface NgxStorageBaseEvent {
	type: 'set' | 'clear' | 'remove';
	storage: NgxStorageType;
}

export interface NgxStorageSetEvent<DataType = any> extends NgxStorageBaseEvent {
	type: 'set';
	key: string;
	oldValue: DataType;
	newValue: DataType;
}

export interface NgxStorageClearEvent extends NgxStorageBaseEvent {
	type: 'clear';
}

export interface NgxStorageRemoveEvent<DataType = any> extends NgxStorageBaseEvent {
	type: 'remove';
	key: string;
	oldValue: DataType;
}

export type NgxStorageEvent = NgxStorageClearEvent | NgxStorageSetEvent | NgxStorageRemoveEvent;

export interface NgxStorage {
	getItem: <DataType = any>(key: string) => DataType;
	getItemObservable: <DataType = any>(key: string) => Observable<DataType>;
	removeItem: (key: string) => NgxStorageRemoveEvent;
	setItem: <DataType = any>(key: string, item: DataType) => NgxStorageSetEvent;
	clear: () => NgxStorageClearEvent;
}
