export class ToDo extends EventTarget {

    titel: string;
    erledigt: boolean;

    constructor (titel: string, erledigt: boolean) {
        super();
        this.titel = titel;
        this.erledigt = erledigt;
    }

    element() {
        const listElement = document.createElement('li');
        const divElement = document.createElement('div');
        const checkBoxElement = document.createElement('input');
        const spanElement = document.createElement('span');
        const buttonElement = document.createElement('button');

        listElement.appendChild(divElement);

        divElement.appendChild(checkBoxElement);

        divElement.appendChild(spanElement);

        divElement.appendChild(buttonElement);

        checkBoxElement.setAttribute('type', 'checkbox');
        checkBoxElement.className = 'erledigt';

        buttonElement.className = 'loeschen';

        spanElement.innerText = this.titel;

        buttonElement.innerText = 'X';

        if (this.erledigt) {
            checkBoxElement.setAttribute('checked', 'checked');
            divElement.className = 'erledigt';
        }

        buttonElement.addEventListener('click', () => {
            this.dispatchEvent(new Event('loeschen'));
        });

        checkBoxElement.addEventListener('change', () => {
            this.erledigt = checkBoxElement.checked;

            divElement.className = this.erledigt ? 'erledigt' : '';
        })

        return listElement;

    }
}