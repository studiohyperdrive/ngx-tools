# Observable types

A collection of interfaces that extend the default Observable.

## Interfaces

### ObservableBoolean

```typescript
type ObservableBoolean = Observable<boolean>;
```

### ObservableArray

```typescript
type ObservableArray<T> = Observable<T[]>;
```

### ObservableString

```typescript
type ObservableString = Observable<string>;
```

### ObservableNumber

```typescript
type ObservableNumber = Observable<number>;
```

### ObservableRecord

```typescript
type ObservableRecord<DataType, DataId extends string | symbol | number = string> = Observable<
	Record<DataId, DataType>
>;
```

### ObservableBooleanRecord

```typescript
type BooleanRecord = Record<string, boolean>;
type ObservableBooleanRecord = Observable<BooleanRecord>;
```

### ObservableBlob

```typescript
type ObservableBlob = Observable<{ fileType: string; blob: Blob }>;
```

### ObservableStringRecord

```typescript
type ObservableStringRecord<ValueType> = Observable<Record<string, ValueType>>;
```
