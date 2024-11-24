public with sharing class AppointmentHandler {
    public static List<Calendar__c> fetchAppointments(String dateFrom, String dateTo, String searchTerm) {
        List<Calendar__c> appointments = new List<Calendar__c>();
        List<String> conditions = new List<String>();
    
        if (!String.isEmpty(dateFrom)) {
            conditions.add('Appointment_Time__c >= :dateFrom');
        }
        if (!String.isEmpty(dateTo)) {
            conditions.add('Appointment_Time__c <= :dateTo');
        }
        if (!String.isEmpty(searchTerm)) {
            conditions.add('(Patient_Name__c LIKE :searchTerm OR Dentist_Name__c LIKE :searchTerm)');
        }
    
        String query = 'SELECT Id, Patient_Name__c, Dentist_Name__c, Appointment_Time__c FROM Calendar__c';
        if (!conditions.isEmpty()) {
            query += ' WHERE ' + String.join(conditions, ' AND ');
        }
    
        try {
            appointments = Database.query(query);
        } catch (Exception e) {
            System.debug('Error in SOQL Query: ' + e.getMessage());
        }
    
        return appointments;
    }    
    
    public static String saveAppointment(Calendar__c appointment) {
        if (appointment == null) {
            throw new CustomException('Appointment cannot be null');
        }
        if (String.isBlank(appointment.Patient_Name__c) || String.isBlank(appointment.Dentist_Name__c) || appointment.Appointment_Time__c == null) {
            throw new CustomException('Missing required fields');
        }

        upsert appointment; 
        return 'Appointment was made successfully';
    }
    
    public class CustomException extends Exception {}
}