import { Signal, WritableSignal } from '@angular/core';

export type WritableBooleanSignal = WritableSignal<boolean>;
export type BooleanSignal = Signal<boolean>;
export type WritableStringSignal = WritableSignal<string>;
export type StringSignal = Signal<string>;
export type WritableNumberSignal = WritableSignal<number>;
export type NumberSignal = Signal<number>;
export type WritableArraySignal<DataType> = WritableSignal<DataType[]>;
export type ArraySignal<DataType> = Signal<DataType[]>;
