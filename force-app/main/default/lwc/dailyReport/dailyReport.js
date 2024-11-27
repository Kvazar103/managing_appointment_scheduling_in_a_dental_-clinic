import { LightningElement,wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getReportByName from '@salesforce/apex/ReportController.getReportByName';

export default class DailyReport extends LightningElement {

    visualForcePageUrl='/apex/dailyReportPdf';
    reportId=''

    @wire(getReportByName,{reportName:'Daily Appointment Report'})
    wiredReportId({error,data}){
        if(data){
            this.reportId=data;
        }else if(error){
            this.dispatchEvent(new ShowToastEvent({
                title:'Error',
                message:'Error:'+error+'. Pls call your system administrator.',
                variant:'error'
            }))
        }
    }

    handleViewReport(){
        window.open('/lightning/r/Report/'+this.reportId+'/view','_blank');
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