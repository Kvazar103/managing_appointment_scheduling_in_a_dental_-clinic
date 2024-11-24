import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DailyReport extends LightningElement {

    visualForcePageUrl='/apex/dailyReportPdf';
    reportUrl='/lightning/r/Report/00Od2000002YjXqEAK/view';

    handleViewReport(){
        window.open(this.reportUrl,'_blank');
    }

    handleDownloadReport(){
        this.dispatchEvent(new ShowToastEvent({
            title:'Success',
            message:'Appointment created successfully.',
            variant:'success'
        }))
       window.open(this.visualForcePageUrl,'_blank');
       
    }
    
}