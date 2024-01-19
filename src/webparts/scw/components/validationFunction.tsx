/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Stack, Icon, IPersonaProps } from 'office-ui-fabric-react';
import * as React from 'react';
import styles from './Scw.module.scss';



export const validateTextField = (value: string, strings: { minCharacters: string; blankField: string }): JSX.Element => {

    const trimmedValue = value.trim();
   
  console.log("Value", trimmedValue);

  if (trimmedValue.length >= 1 && trimmedValue.length < 5) {
    return (
      <Stack horizontal horizontalAlign="center">
        <Icon iconName="Error" className={styles.errorIcon} />
        <p className={styles.fieldInstruction}>
          {strings.minCharacters}
        </p>
      </Stack>
    );
  } else if (!trimmedValue.length) {


    return (
      <Stack horizontal horizontalAlign="center">
      <Icon iconName="Error" className={styles.errorIcon} />
      <p className={styles.fieldInstruction}>
        {strings.blankField}
      </p>
    </Stack>

    );
  } else {
    return null;
  }
  
}

export const validateSpecialCharFields = (value: string, strings: { minCharacters: string; blankField: string; removeSpecialChar: string }): JSX.Element => {

  const charAllowed = /[^a-zA-Z0-9ÀÁÂÃÄÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜàáâãäçèéêëìíîïòóôõöùúûüÆŒœæŸÿ'\s]/.test(value);

  let specialCharFound = "";

  value.replace(/[^a-zA-Z0-9ÀÁÂÃÄÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜàáâãäçèéêëìíîïòóôõöùúûü'\s]/g,(match) => {
      specialCharFound += match + " ";
      return "";
    }
  );
  console.log("Value Lenght", value.length);

  if (!value.trim().length) {
    console.log("Iam blank")
    
    return  <Stack horizontal>
        <Icon iconName="Error" className={styles.errorIcon} />
        <p className={styles.fieldInstruction}>{strings.blankField}</p>
      </Stack>
    
  } else if (value.trim().length >= 1 && value.trim().length < 5) {
    if(charAllowed ) {
      return (
        <>
      <Stack horizontal style={{ paddingBottom: "5px" }}>
         <Icon iconName="Error" className={styles.errorIcon} />
         <p className={styles.fieldInstruction}>{strings.removeSpecialChar} {specialCharFound}</p>
      </Stack>
      
       <Stack horizontal>
       <Icon iconName="Error" className={styles.errorIcon} />
       <p className={styles.fieldInstruction}>{strings.minCharacters}</p>
       </Stack>
       </>
      )
    }  else {
      return (
        <Stack horizontal>
       <Icon iconName="Error" className={styles.errorIcon} />
       <p className={styles.fieldInstruction}>{strings.minCharacters}</p>
       </Stack>
      )
    }
  } else if ( value.trim().length >= 5) {
    if(charAllowed) {
      return (
        <Stack horizontal>
           <Icon iconName="Error" className={styles.errorIcon} />
           <p className={styles.fieldInstruction}>{strings.removeSpecialChar} {specialCharFound}</p>
        </Stack>
        )
    } else {
      return (null)
    }
  }

  if (charAllowed) {
    <Stack horizontal>
         <Icon iconName="Error" className={styles.errorIcon} />
         <p className={styles.fieldInstruction}>{strings.removeSpecialChar} {specialCharFound}</p>
    </Stack>
  }

}

export const validateOwnerField = (values: IPersonaProps[], strings: { blankfield: string, requestorUser: string, invalidEmail: string}, requestor: string ): string | Promise<string> => {
 
 let requestorEmail: string = '';
 let invalidEmail: string = '';
 
  values.forEach((item)=> {
    console.log("Item",item)
    if (item.secondaryText === requestor) {
        requestorEmail = item.secondaryText
    } 

    if (item.id === undefined) {
        invalidEmail = item.secondaryText
    }

  })

 console.log("ValueOL", values);

  if (values.length === 0) {
    return (
      
      `${strings.blankfield}`
    )
  }

  if (requestorEmail) {
    return (
      `${strings.requestorUser}`
    )
  }

  if (invalidEmail) {
    return (
      `${strings.invalidEmail} ${invalidEmail}`
    )
  }


 

}



interface ValidationErrors {
  isLessThanMinLength: boolean;
  hasSpecialChar: boolean;
}


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



interface OwnerValidationErrors {
  // isBlankField: boolean;
  // userIsRequestor: boolean;
  // emailIsInvalid: boolean;
}


export const ownerFieldValidations = (values: Record<string, string> | string[], requestor: string, invalidEmail: string ): OwnerValidationErrors => {

  // let isrequestor = '';
  // let isInvalidEmail = '';
  const sideErrorLine = document.getElementById('sixth-line').classList.add(styles.errorBorder);
  console.log('sideErrorLine', sideErrorLine)

  console.log("VALUES",values, requestor, invalidEmail)

  

  return (

    'hello'
    // isBlankField 
    // userIsRequestor 
    // emailIsInvalid 
  
  )
}




