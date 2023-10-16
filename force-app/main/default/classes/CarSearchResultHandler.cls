public with sharing class CarSearchResultHandler {
    @AuraEnabled(cacheable=true)
    public static List<Car__c> giveMatchingCars(String carTypeId){
        String databaseQueryString = 'SELECT Id, Name, Picture__c, Build_Year__c, Contact__r.Name, Geolocation__latitude__s, Geolocation__longitude__s, Mileage__c FROM Car__c WHERE Available_For_Rent__c = True';
        if(String.isNotEmpty(carTypeId)) {
            databaseQueryString += ' AND Car_Type__c = :carTypeId';
        }
        return Database.query(databaseQueryString);
    }
}