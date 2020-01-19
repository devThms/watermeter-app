
export class Customer {

    constructor(
        public NIT: string,
        public firstName: string,
        public lastName: string,
        public address: string,
        public telephone: number,
        public status?: string,
        public id?: number
    ) {}

 }
