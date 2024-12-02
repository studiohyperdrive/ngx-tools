import { NgxAccessibleDragAndDropMessageRecord } from '../../types';

export const NgxAccessibleDragAndDropMessageRecords: Record<
	string,
	NgxAccessibleDragAndDropMessageRecord
> = {
	nl: {
		selected: '{{#item}} geselecteerd.',
		deselected: '{{#item}} gedeselecteerd.',
		reordered: '{{#item}} werd verplaatst van positie {{#from}} naar {{#to}}.',
		moved: '{{#item}} werd verplaatst van {{#from}} naar {{#to}}.',
		cancelled: 'Het verplaatsen van {{#item}} werd geannuleerd.',
		item: 'item',
		container: 'lijst',
		description:
			'Om items in dit onderdeel te verplaatsen, navigeer naar een item via de Tab toets. Door de Enter of Space toets in te drukken selecteer je een item. Met de pijltjes toetsen verplaats je het item.',
	},
	en: {
		selected: '{{#item}} selected.',
		deselected: '{{#item}} deselected.',
		reordered: '{{#item}} was moved from position {{#from}} to {{#to}}.',
		moved: '{{#item}} was moved from {{#from}} to {{#to}}.',
		cancelled: 'Moving {{#item}} was cancelled.',
		item: 'item',
		container: 'list',
		description:
			'To move items in this container, navigate to the item using the Tab key. By pressing Enter or Space you can select the item, which you can then move by using the Arrow keys.',
	},
	fr: {
		selected: '{{#item}} sélectionné.',
		deselected: '{{#item}} désélectionné.',
		reordered: '{{#item}} a été déplacé de la position {{#from}} à {{#to}}.',
		moved: '{{#item}} a été déplacé de {{#from}} à {{#to}}.',
		cancelled: 'Le déplacement de {{#item}} a été annulé.',
		item: 'article',
		container: 'liste',
		description:
			"Pour déplacer des éléments dans cette section, naviguez vers un élément à l'aide de la touche Tab. Appuyez sur la touche Entrée ou Espace pour sélectionner un élément. Utilisez les touches fléchées pour déplacer l'élément.",
	},
	es: {
		selected: '{{#item}} elegido.',
		deselected: '{{#item}} rechazado.',
		reordered: '{{#item}} fue reorganizado de la posición {{#from}} a {{#to}}.',
		moved: '{{#item}} fue trasladado de {{#from}} a {{#to}}.',
		cancelled: 'El desplazamiento de {{#item}} estuvo anulado.',
		item: 'objeto',
		container: 'lista',
		description:
			'Para trasladar los objetos en esta sección, diríjase al objeto con la tecla Tab. Al tocar el botón Enter o el botón de Espacio puede seleccionar el objeto. Con las flechas puede trasladar el objeto.',
	},
	pt: {
		selected: '{{#item}} selecionado.',
		deselected: '{{#item}} desselecionado.',
		reordered: '{{#item}} foi movido da posição {{#from}} para {{#to}}.',
		moved: '{{#item}} foi movido de {{#from}} para {{#to}}.',
		cancelled: 'A movimentação de {{#item}} foi cancelada.',
		item: 'item',
		container: 'lista',
		description:
			'Para mover itens nesta seção, navegue até um item usando a tecla Tab. Pressione Enter ou Barra de Espaço para selecionar um item. Use as teclas de seta para mover o item.',
	},
	tr: {
		selected: '{{#item}} seçildi.',
		deselected: '{{#item}} seçimi kaldırıldı.',
		reordered: '{{#item}} {{#from}} konumundan {{#to}} konumuna taşındı.',
		moved: '{{#item}} {{#from}} konumundan {{#to}} konumuna taşındı.',
		cancelled: '{{#item}} taşınması iptal edildi.',
		item: 'öğe',
		container: 'liste',
		description:
			'Bu bölümdeki öğeleri taşımak için Tab tuşunu kullanarak bir öğeye gidin. Bir öğeyi seçmek için Enter veya Boşluk tuşuna basın. Öğeyi taşımak için ok tuşlarını kullanın.',
	},
	de: {
		selected: '{{#item}} ausgewählt.',
		deselected: '{{#item}} abgewählt.',
		reordered: '{{#item}} wurde von Position {{#from}} nach Position {{#to}} verschoben.',
		moved: '{{#item}} wurde von {{#from}} nach {{#to}} verschoben.',
		cancelled: 'Das Verschieben von {{#item}} wurde abgebrochen.',
		item: 'Eintrag',
		container: 'Liste',

		description:
			'Um Einträge in diesem Teil zu verschieben, navigiere mit der Tab-Taste zu einem Eintrag. Mit Drücken der Eingabe- oder Leerzeichentaste wählst du einen Eintrag aus. Mit den Pfeiltasten verschiebst du den Eintrag.',
	},
	ku: {
		selected: '{{#item}} hate hilbijartin.',
		deselected: '{{#item}} hate rakirin.',
		reordered: '{{#item}} ji cîhê {{#from}} ve ji cîhê {{#to}} ve kişandin.',
		moved: '{{#item}} hate veguhastin ji {{#from}} ve {{#to}}.',
		cancelled: 'Kişandina {{#item}} hate betal kirin.',
		item: 'hêman',
		container: 'lista',
		description:
			'Ji bo dikaribî hêmanên vê beşê bibî/bikşînî bibî devereka dî pêl tûşa TABê bike û here ser hêmanekî. Ji bo hêmanekî bineqînî pêl tûşa ENTER an jî tûşa SPACE yê bike. Ji bo hêmanekî bibî devereka dî tûşa OK bi kar bîne.',
	},
	// TODO: Iben: Get description translation
	// ru: {
	// 	selected: '{{#item}} выбрано.',
	// 	deselected: '{{#item}} снято выделение.',
	// 	reordered: '{{#item}} перенесен с позиции {{#from}} на {{#to}}.',
	// 	moved: '{{#item}} перенесен с {{#from}} на {{#to}}.',
	// 	cancelled: 'перемещение {{#item}} был отменен.',
	// 	item: 'элемент',
	// 	container: 'список',
	// 	description: 'TBD',
	// },
};
