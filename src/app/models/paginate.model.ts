
export class Paginate {

    constructor(
        public hasPrevious: boolean,
        public hasNext: boolean,
        public previous: string,
        public next: string,
    ) { }

    public getPrevious() {

        if (this.previous != null && this.previous !== '') {

            const values = this.previous.split('?');

            this.hasPrevious = false;
            console.log(null);
            return values[1];
        }

        this.hasPrevious = true;
        return this.previous;
    }

    public getNext() {

        if (this.next != null && this.next !== '') {

            const values = this.next.split('?');

            this.hasNext = false;
            console.log(this.next);
            return values[1];
        }

        this.hasNext = true;
        return this.previous;

    }

    public inicializar() {
        this.getPrevious();
        this.getNext();
        console.log('activado');
    }

}