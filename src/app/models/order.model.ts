
export class Order {

    constructor(
        // tslint:disable-next-line: variable-name
        public meter_id: number,
        // tslint:disable-next-line: variable-name
        public user_id: number,
        public initialMeasure: number,
        public finalMeasure: number,
        public ammount: number,
        public year: number,
        public month: number,
        public status?: string,
        public id?: number
    ) {}

 }
