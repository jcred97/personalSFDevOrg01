import { LightningElement, track } from 'lwc';

export default class DatatableWithButtons extends LightningElement {
    @track tableData = [
        { id: '1', name: 'John Doe', email: 'john@example.com' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
        { id: '3', name: 'Sam Wilson', email: 'sam@example.com' }
    ];

    @track isModalOpen = false;
    @track modalTitle = '';
    @track modalMessage = '';

    columns = [
        { 
            label: 'Name', 
            fieldName: 'name', 
            type: 'text' },
        { 
            label: 'Email', 
            fieldName: 'email', 
            type: 'email' 
        },
        {
            label: 'Actions',
            type: 'button',
            typeAttributes: {
                label: 'Edit',
                name: 'edit',
                title: 'Edit',
                variant: 'brand'
            },
            cellAttributes: { alignment: 'center' }
        },
        {
            label: '',
            type: 'button',
            typeAttributes: {
                label: 'Delete',
                name: 'delete',
                title: 'Delete',
                variant: 'destructive'
            }
        }
    ];

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;

        if (actionName === 'edit') {
            this.modalTitle = `Edit ${row.name}`;
            this.modalMessage = `Editing details for ${row.name} (${row.email})`;
            this.isModalOpen = true;
        } else if (actionName === 'delete') {
            this.tableData = this.tableData.filter(record => record.id !== row.id);
            alert(`Deleted ${row.name}`);
        }
    }

    closeModal() {
        this.isModalOpen = false;
    }
}
