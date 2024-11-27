public with sharing class AppointmentHandler {
    public static List<Calendar__c> fetchAppointments(String searchTerm) {
        String query = 'SELECT Id, Patient_Name__c, Dentist_Name__c, Appointment_Time__c FROM Calendar__c';
        if (!String.isBlank(searchTerm)) {
            query += ' WHERE Patient_Name__c LIKE :searchTerm OR Dentist_Name__c LIKE :searchTerm';
        }
        return Database.query(query);
    }

    public static void saveAppointment(Calendar__c appointment) {
        if (appointment.Patient_Name__c == null || appointment.Dentist_Name__c == null || appointment.Appointment_Time__c == null) {
            throw new AuraHandledException('All fields are required.');
        }
        upsert appointment;
    }
}