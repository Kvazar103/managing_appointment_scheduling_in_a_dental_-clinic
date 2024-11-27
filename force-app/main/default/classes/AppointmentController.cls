public with sharing class AppointmentController {
    @AuraEnabled(cacheable=true)
    public static List<Calendar__c> getAppointments(String searchTerm) {
        try {
            String query = 'SELECT Id, Patient_Name__c, Dentist_Name__c, Appointment_Date__c, Appointment_Time__c FROM Calendar__c';
            if (!String.isEmpty(searchTerm)) {
                query += ' WHERE Patient_Name__c LIKE \'%' + String.escapeSingleQuotes(searchTerm) + '%\' OR Dentist_Name__c LIKE \'%' + String.escapeSingleQuotes(searchTerm) + '%\'';
            }
            return Database.query(query);
        } catch (Exception e) {
            throw new AuraHandledException('Failed to fetch appointments: ' + e.getMessage());
        }
    }

    @AuraEnabled
    public static void saveAppointment(Calendar__c appointment) {
        if (appointment == null || String.isEmpty(appointment.Patient_Name__c) || 
            String.isEmpty(appointment.Dentist_Name__c) || 
            appointment.Appointment_Date__c == null || 
            appointment.Appointment_Time__c == null) {
            throw new AuraHandledException('All fields are required.');
        }
        insert appointment;
    }
}
