import { LightningElement, api } from 'lwc';

export default class Modal extends LightningElement {
    @api title;
    @api message;

    handleClose() {
        this.dispatchEvent(new CustomEvent('close'));
    }
}
