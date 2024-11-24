/**
 * @description       : 
 * @author            : Nazar Voinarovych
 * @group             : 
 * @last modified on  : 11-24-2024
 * @last modified by  : Nazar Voinarovych
**/

public with sharing class AppointmentController {

    public List<Appointment__c> todayAppointments {get;set;}

    public AppointmentController(){
        getAppointmentsWithTodayDate();
    }

    private void getAppointmentsWithTodayDate(){
         todayAppointments=[
            SELECT Id,
            Appointment_Time__c,
            Appointment_Date__c,
            Dentist_Name__c,
            Patient_Name__c,
            Status__c
            FROM Appointment__c
            WHERE Appointment_Date__c=:Date.today()
            WITH SECURITY_ENFORCED
            ];
        
    }
    
}