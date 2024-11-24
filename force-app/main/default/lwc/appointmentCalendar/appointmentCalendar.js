import { LightningElement, track, wire } from 'lwc';
import getAppointments from '@salesforce/apex/AppointmentController.getAppointments';
import saveAppointment from '@salesforce/apex/AppointmentController.saveAppointment';

export default class AppointmentCalendar extends LightningElement {
    @track appointments = [];
    @track dateFrom = '';
    @track dateTo = '';
    @track searchTerm = '';

    connectedCallback() {
        this.fetchAppointments();
        setInterval(() => {
            this.fetchAppointments();
        }, 300000); 
    }

    handleDateChange(event) {
        const { label } = event.target.dataset;
        const value = event.target.value; 

        if (label === 'Date From') {
            this.dateFrom = value;
        } else if (label === 'Date To') {
            this.dateTo = value;
        }
        this.fetchAppointments();
    }
    
    handleSave(event) {
        const appointment = {
            Patient_Name__c: this.patientName,
            Dentist_Name__c: this.dentistName,
            Appointment_Time__c: this.appointmentTime
        };
    
        saveAppointment({ appointment })
            .then(result => {
                this.showSuccessToast(result);
            })
            .catch(error => {
                console.error('Error saving appointment:', error);
                this.showErrorToast('Failed to save the appointment.');
            });
    }    

    handleSearch(event) {
        this.searchTerm = event.target.value;
        this.fetchAppointments();
    }

    handleCancel() {
        window.location.href = '/lightning/o/Calendar__c/home';
    }    

    fetchAppointments() {
        getAppointments({ dateFrom: this.dateFrom, dateTo: this.dateTo, searchTerm: this.searchTerm })
            .then(result => {
                this.appointments = result;
            })
            .catch(error => {
                console.error('Error fetching appointments:', error);
            });
    }
}
