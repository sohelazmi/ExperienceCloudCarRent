public with sharing class CarSearchFormController {
    @AuraEnabled(cacheable=true)
    public static List<Car_Type__c> giveAllCarTypes() {
        List<Car_Type__c> carTypeList = [SELECT Id, Name FROM Car_Type__c];
        return carTypeList;
    }
}