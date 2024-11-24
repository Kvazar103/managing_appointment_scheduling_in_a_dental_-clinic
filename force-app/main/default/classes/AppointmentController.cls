public with sharing class AppointmentController {
    @AuraEnabled(cacheable=true)
    public static List<Calendar__c> getAppointments(String dateFrom, String dateTo, String searchTerm) {
        return AppointmentHandler.fetchAppointments(dateFrom, dateTo, searchTerm);
    }

    @AuraEnabled
    public static String saveAppointment(Calendar__c appointment) {
        return AppointmentHandler.saveAppointment(appointment);
    }
}