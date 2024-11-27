import { LightningElement, track } from 'lwc';
import getAppointments from '@salesforce/apex/AppointmentController.getAppointments';
import saveAppointment from '@salesforce/apex/AppointmentController.saveAppointment';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AppointmentScheduler extends LightningElement {
    @track appointments = [];
    @track searchTerm = '';
    @track patientName = '';
    @track dentistName = '';
    @track appointmentDate = '';
    @track appointmentTime = '';

    connectedCallback() {
        this.fetchAppointments();
    }

    // Format Appointment Time before displaying
    get formattedAppointments() {
        return this.appointments.map(appointment => {
            return {
                ...appointment,
                Appointment_Time__c: this.formatTime(appointment.Appointment_Time__c) 
            };
        });
    }    

// Helper method to format time
formatTime(milliseconds) {
    if (!milliseconds) return '';
    const totalMinutes = milliseconds / 60000;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

    // Fetch Appointments
    fetchAppointments() {
        getAppointments({ searchTerm: this.searchTerm })
            .then(result => {
                this.appointments = result;
            })
            .catch(error => {
                console.error('Error fetching appointments:', error);
                this.showToast('Error', 'Failed to fetch appointments.', 'error');
            });
    }

    // Save Appointment
    handleSave() {
        if (!this.patientName || !this.dentistName || !this.appointmentDate || !this.appointmentTime) {
            this.showToast('Error', 'All fields are required.', 'error');
            return;
        }

        const appointment = {
            Patient_Name__c: this.patientName,
            Dentist_Name__c: this.dentistName,
            Appointment_Date__c: this.appointmentDate,
            Appointment_Time__c: this.appointmentTime
        };

        saveAppointment({ appointment })
            .then(() => {
                this.showToast('Success', 'Appointment was successfully created.', 'success');
                this.clearFields();
                this.fetchAppointments();
            })
            .catch(error => {
                console.error('Error saving appointment:', error);
                this.showToast('Error', 'Failed to save the appointment.', 'error');
            });
    }

    // Clear Input Fields
    handleCancel() {
        this.clearFields();
    }

    clearFields() {
        this.patientName = '';
        this.dentistName = '';
        this.appointmentDate = '';
        this.appointmentTime = '';
    }

    // Handle Input Changes
    handleInputChange(event) {
        const field = event.target.name;
        this[field] = event.target.value;
    }

    // Toast Messages
    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title,
            message,
            variant
        });
        this.dispatchEvent(evt);
    }

    // Handle Search
    handleSearch(event) {
        this.searchTerm = event.target.value;
        this.fetchAppointments();
    }
}
