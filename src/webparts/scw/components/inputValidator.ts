/* eslint-disable @typescript-eslint/no-explicit-any */


export const fieldValidations = (inputValue: any[]): void => {

 console.log(inputValue);

 inputValue.forEach((value: any) => {
    console.log("VALUE",value);

    if (value.length  >=1 && value.length < 5 ) {
        return true
    }
 });



}