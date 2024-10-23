export interface NgxAccessibleDragAndDropMessageRecord {
	grabbed: `${string}{{#item}}${string}`;
	dropped: `${string}{{#item}}${string}`;
	reordered: `${string}{{#item}}${string}{{#from}}${string}{{#to}}${string}`;
	moved: `${string}{{#item}}${string}{{#from}}${string}{{#to}}${string}`;
	cancelled: `${string}{{#item}}${string}`;
	item: string;
	list: string;
}

interface NgxAccessibleDragAndDropBaseMessage<
	KeyType extends keyof NgxAccessibleDragAndDropMessageRecord,
	DataType
> {
	type: KeyType;
	data: DataType;
}

export type NgxAccessibleDragAndDropMessage =
	| NgxAccessibleDragAndDropBaseMessage<'grabbed' | 'dropped' | 'cancelled', string>
	| NgxAccessibleDragAndDropBaseMessage<
			'reordered' | 'moved',
			{ item: string; from: string; to: string }
	  >;

export interface NgxAccessibleDragAndDropMoveEvent {
	previousIndex: number;
	newIndex: number;
	previousContainer: number;
	newContainer: number;
}
