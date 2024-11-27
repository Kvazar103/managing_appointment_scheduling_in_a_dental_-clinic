public with sharing class PatientController {
    @AuraEnabled
    public static List<Patient__c> searchPatients(String name) {
        return [SELECT Id, Name, Last_Name__c, Dentist__c FROM Patient__c 
                WHERE Name LIKE :('%' + name + '%') 
                OR Last_Name__c LIKE :('%' + name + '%')];
    }
}