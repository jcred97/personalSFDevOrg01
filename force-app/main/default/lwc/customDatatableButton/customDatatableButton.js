import { LightningElement, api } from 'lwc';

export default class CustomDatatableButton extends LightningElement {
    @api rowId;

    handleClick(event) {
        const action = event.target.dataset.action;
        this.dispatchEvent(new CustomEvent('rowaction', {
            detail: { action, rowId: this.rowId }
        }));
    }
}
