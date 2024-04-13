export interface Todo {
	id: number;
	title: string;
}
export interface Board {
	id: number;
	title: string;
	items: Todo[];
}

export const DATA: Board[] = [
	{
		id: 1,
		title: "Сделать",
		items: [
			{
				id: 1,
				title: "Пойти в магазин",
			},
			{
				id: 2,
				title: "Выкинуть мусор",
			},
			{
				id: 3,
				title: "Сходить в уник",
			},
		],
	},
	{
		id: 2,
		title: "Проверить",
		items: [
			{
				id: 4,
				title: "Код ревью",
			},
			{
				id: 5,
				title: "Задача на факториал",
			},
			{
				id: 6,
				title: "Ебучую аунтификацию",
			},
		],
	},
	{
		id: 3,
		title: "Сделано",
		items: [
			{
				id: 4,
				title: "Снять видео",
			},
			{
				id: 5,
				title: "Смонтировать",
			},
			{
				id: 6,
				title: "Подкинуть соседу на флешке",
			},
		],
	},
];
