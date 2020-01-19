
export class Receipt {

    constructor(
        // tslint:disable-next-line: variable-name
        public order_id: number,
        // tslint:disable-next-line: variable-name
        public user_id: number,
        public description: string,
        public ammount: number,
        public status?: string,
        public id?: number
    ) {}

 }
