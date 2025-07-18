import { LightningElement } from 'lwc';
import { countryCodeList } from 'c/countryCodeList';
import currencyConverterAssets from '@salesforce/resourceUrl/currencyConverterAssets';

export default class CurrencyConverter extends LightningElement {
    currencyImage = currencyConverterAssets + '/currencyConverterAssets/currency.svg'
    countryList = countryCodeList;
    countryFrom = "USD";
    countryTo = "AUD";
    amount ='';
    result;
    error;

    handleChange(event){
        const {name, value} = event.target;
        console.log("name", name);
        console.log("value", value);
        this[name] = value;
        this.result = '';
        this.error = '';
    }

    submitHandler(event){
        event.preventDefault();
        this.convert();
    }

    async convert(){
        const ACCESS_KEY = 'b87a01e2cb9ab7ef253d12c5';
        const API_URL = 'https://v6.exchangerate-api.com/v6/'+ ACCESS_KEY +'/pair/'+ this.countryFrom + '/' + this.countryTo;
        try {
            const data = await fetch(API_URL);
            const jsonData = await data.json();
            this.result = (Number(this.amount) * jsonData.conversion_rate).toFixed(2);
            console.log(this.result);
        } catch(error) {
            console.log(error);
            this.error = 'An error occured. Please try again';
        }
        
    }
}