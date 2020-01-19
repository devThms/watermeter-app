 export class Usuario {

    constructor(
        public name: string,
        public email: string,
        public password: string,
        // tslint:disable-next-line: variable-name
        public role_id?: number,
        public id?: number
    ) {}

 }
