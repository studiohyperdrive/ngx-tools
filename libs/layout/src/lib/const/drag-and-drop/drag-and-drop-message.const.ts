import { NgxAccessibleDragAndDropMessageRecord } from '../../types';

export const NgxAccessibleDragAndDropMessageRecords: Record<
	string,
	NgxAccessibleDragAndDropMessageRecord
> = {
	nl: {
		grabbed: '{{#item}} geselecteerd.',
		dropped: '{{#item}} geplaatst.',
		reordered: '{{#item}} werd verplaatst van positie {{#from}} naar {{#to}}.',
		moved: '{{#item}} werd verplaatst van onderdeel {{#from}} naar {{#to}}.',
		cancelled: 'Het verplaatsen van {{#item}} werd geannuleerd.',
		item: 'Item',
		list: 'Lijst',
	},
};
