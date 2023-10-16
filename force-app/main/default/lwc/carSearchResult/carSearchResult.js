import { LightningElement, api, wire } from 'lwc';
import giveMatchingCars from '@salesforce/apex/CarSearchResultHandler.giveMatchingCars';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CarSearchResult extends LightningElement {
    @api carTypeId;
    matchedCarsArray;

    @wire(giveMatchingCars, { carTypeId: '$carTypeId' })
    wiredMatchingCarResults({ data, error }) {
        if (data) {
            this.matchedCarsArray = data;
        } else if (error) {
            this.showToast(error.body.message, 'ERROR', 'error');
        }
    }

    get isCarDetailAvailable() {
        if (this.matchedCarsArray) return true;
        return false;
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