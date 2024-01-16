/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */


interface ValidationErrors {
    isLessThanMinLength: boolean;
    hasSpecialChar: boolean;
  }

// interface OwnerValidationErrors {
//   isBlankField: boolean;
//   userIsRequestor: boolean;
//   emailIsInvalid: boolean;
// }
  

export const fieldValidations = (values: Record<string, string> | string[]): ValidationErrors => {



        const validateStringLength = (value: string, minLength: number): boolean => value.length >= minLength;
        
        const isLessThanMinLength = Object.values(values).some((value) => !validateStringLength(value, 5));
        const hasSpecialChar = Object.entries(values).some(
            ([key, value]) => (key === 'engName' || key === 'frCommName') && /[^a-zA-Z0-9ÀÁÂÃÄÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜàáâãäçèéêëìíîïòóôõöùúûü'\s]/.test(value)
          );

        console.log("lessThan 5",isLessThanMinLength);
        console.log("specialChar", hasSpecialChar);

       
    

    return {
        isLessThanMinLength,
        hasSpecialChar
    }
   
}

 


