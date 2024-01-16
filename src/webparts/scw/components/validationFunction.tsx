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
        <Icon iconName="AlertSolid" className={styles.errorIcon} />
        <p className={styles.fieldInstruction}>
          {strings.minCharacters}
        </p>
      </Stack>
    );
  } else if (!trimmedValue.length) {

    console.log("I am blank")
    return (
      <Stack horizontal horizontalAlign="center">
      <Icon iconName="AlertSolid" className={styles.errorIcon} />
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
        <Icon iconName="AlertSolid" className={styles.errorIcon} />
        <p className={styles.fieldInstruction}>{strings.blankField}</p>
      </Stack>
    
  } else if (value.trim().length >= 1 && value.trim().length < 5) {
    if(charAllowed ) {
      return (
        <>
      <Stack horizontal style={{ paddingBottom: "5px" }}>
         <Icon iconName="AlertSolid" className={styles.errorIcon} />
         <p className={styles.fieldInstruction}>{strings.removeSpecialChar} {specialCharFound}</p>
      </Stack>
      
       <Stack horizontal>
       <Icon iconName="AlertSolid" className={styles.errorIcon} />
       <p className={styles.fieldInstruction}>{strings.minCharacters}</p>
       </Stack>
       </>
      )
    }  else {
      return (
        <Stack horizontal>
       <Icon iconName="AlertSolid" className={styles.errorIcon} />
       <p className={styles.fieldInstruction}>{strings.minCharacters}</p>
       </Stack>
      )
    }
  } else if ( value.trim().length >= 5) {
    if(charAllowed) {
      return (
        <Stack horizontal>
           <Icon iconName="AlertSolid" className={styles.errorIcon} />
           <p className={styles.fieldInstruction}>{strings.removeSpecialChar} {specialCharFound}</p>
        </Stack>
        )
    } else {
      return (null)
    }
  }

  if (charAllowed) {
    <Stack horizontal>
         <Icon iconName="AlertSolid" className={styles.errorIcon} />
         <p className={styles.fieldInstruction}>{strings.removeSpecialChar} {specialCharFound}</p>
    </Stack>
  }

}

export const validateOwnerField = (value: IPersonaProps[], strings: { blankfield: string, requestorUser: string}, requestor: string): string | Promise<string> => {
 
 
 console.log("requestor-FUNCTION", requestor);

 console.log("ValueOL", value);

  if (value.length === 0) {
    return (
      `${strings.blankfield}`
    )
  }



}