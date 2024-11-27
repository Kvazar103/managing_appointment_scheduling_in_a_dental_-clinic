import { LightningElement, track } from 'lwc';
import searchPatients from '@salesforce/apex/PatientController.searchPatients';

export default class PatientSearch extends LightningElement {
    @track patients = [];
    @track hasResults = true;

    handleSearch(event) {
        const query = event.target.value;
        if (query.length >= 3) {
            searchPatients({ name: query })
                .then((result) => {
                    this.patients = result;
                    this.hasResults = result.length > 0;
                })
                .catch(() => {
                    this.patients = [];
                    this.hasResults = false;
                });
        }
    }
}