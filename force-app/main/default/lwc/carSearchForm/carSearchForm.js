import { LightningElement, wire } from 'lwc';
import giveAllCarTypes from '@salesforce/apex/CarSearchFormController.giveAllCarTypes';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class CarSearchForm extends NavigationMixin(LightningElement) {
    carTypes;

    @wire(giveAllCarTypes)
    wiredCarTypes({ data, error }) {
        if (data) {
            this.carTypes = [{ label: 'All Types', value: '' }];

            data.forEach(element => {
                this.carTypes.push({ label: element.Name, value: element.Id });
            });
        } else if (error) {
            this.showToast(error.body.message, 'ERROR', 'error');
        }
    }

    handleCarTypeChange(event) {
        const carTypeId = event.detail.value;

        const carTypeSelectionChangeEvent = new CustomEvent('cartypechange', { detail: carTypeId });
        this.dispatchEvent(carTypeSelectionChangeEvent);
    }

    handleCreateNewCarType() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Car_Type__c',
                actionName: 'new'
            }
        });
    }

    showToast(message, title, varient) {
        const toast = new ShowToastEvent({
            title: title,
            message: message,
            varient: varient,
        });

        this.dispatchEvent(toast);
    }
}