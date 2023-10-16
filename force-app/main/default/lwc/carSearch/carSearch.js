import { LightningElement } from 'lwc';

export default class CarSearch extends LightningElement {
    selectedCarTypeId;

    carTypeSelectHandler(event) {
        this.selectedCarTypeId = event.detail;
    }
}