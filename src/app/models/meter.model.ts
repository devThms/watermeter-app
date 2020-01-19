
export class Meter {

    constructor(
        // tslint:disable-next-line: variable-name
        public customer_id: number,
        public serialNumber: string,
        public address: string,
        // tslint:disable-next-line: variable-name
        public zone_id: number,
        public status?: string,
        public id?: number
    ) {}

 }
