/**
 * @description       : 
 * @author            : Nazar Voinarovych
 * @group             : 
 * @last modified on  : 11-27-2024
 * @last modified by  : Nazar Voinarovych
**/
public with sharing class ReportController {

    public List<Appointment__c> todayAppointments {get;set;}

    public ReportController(){
        getAppointmentsWithTodayDate();
    }

    @AuraEnabled(cacheable=true)
    public static Id getReportByName(String reportName){
        Report report= [SELECT Id,Name FROM Report WHERE Name=:reportName];
        return report.Id;
    }

    @AuraEnabled(cacheable=true)
    public void getAppointmentsWithTodayDate(){
        todayAppointments= [
            SELECT Id,
            Appointment_Time__c,
            Appointment_Date__c,
            Dentist__r.Name,
            Patient_Name__c,
            Status__c
            FROM Appointment__c
            WHERE Appointment_Date__c=:Date.today()
            WITH SECURITY_ENFORCED
            ORDER BY Appointment_Time__c
            ];   
    }
}