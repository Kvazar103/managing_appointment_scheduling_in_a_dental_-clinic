import { LightningElement,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent } from 'lightning/actions';
import { updateRecord } from 'lightning/uiRecordApi';
import APPOINTMENT_STATUS from '@salesforce/schema/Appointment__c.Status__c';

export default class CancelAppointment extends LightningElement {
    @api recordId;
    @api objectApiName;

    handleSuccess() {
        const fields={};
        fields['Id']=this.recordId;
        fields[APPOINTMENT_STATUS.fieldApiName]='Canceled';
        updateRecord({fields})
            .then(()=>{
                this.dispatchEvent(new CloseActionScreenEvent());
                this.dispatchEvent(new ShowToastEvent({
                    title:'Success',
                    message:'Appointment canceled successfully.',
                    variant:'success'
                }))
            })
            .catch(error=>{
                console.log('Error changing appointment status: '+error);
                this.dispatchEvent(new ShowToastEvent({
                    title:'Error',
                    message:'Error.',
                    variant:'error'
                }))
            })
            
    }

    handleCancel() {
        this.dispatchEvent(new CloseActionScreenEvent());
    }
}