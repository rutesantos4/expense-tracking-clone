export class Expense {
	date: string = '';
	cost: number = 0;
	category: string = '';
	description: string = '';

	constructor(
		date: string,
		cost: number,
		category: string,
		description: string
	) {
		this.date = date;
		this.cost = cost;
		this.category = category;
		this.description = description;
	}
}
