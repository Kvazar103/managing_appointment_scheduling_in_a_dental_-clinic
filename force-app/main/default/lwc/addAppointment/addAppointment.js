import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent } from 'lightning/actions';

export default class AddAppointment extends LightningElement {
    
    handleSuccess() {
        this.dispatchEvent(new CloseActionScreenEvent());
        this.dispatchEvent(new ShowToastEvent({
            title:'Success',
            message:'Appointment created successfully.',
            variant:'success'
        }))
    }

    handleCancel() {
        this.dispatchEvent(new CloseActionScreenEvent());
    }
}