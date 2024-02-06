/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Stack, Icon, IStackTokens} from 'office-ui-fabric-react';
import * as React from 'react';
import styles from './Scw.module.scss'

export const validateisError = (strings: {  blankField: string }): JSX.Element => {

    return (
      <Stack horizontal style={{marginTop: '-18px'}}>
        <Icon iconName="AlertSolid"className={styles.errorIcon} />
        <p className={styles.fieldInstruction}>
          {strings.blankField}
        </p>
      </Stack>

    );
  
}

export const validateTextField = (value: string, strings: { minCharacters: string; blankField: string }): JSX.Element => {

 
  const trimmedValue = value.trim();

  if (trimmedValue.length >= 1 && trimmedValue.length < 5) {
    return (
      <Stack horizontal horizontalAlign="center">
        <Icon iconName="AlertSolid"className={styles.errorIcon} />
        <p className={styles.fieldInstruction}>
          {strings.minCharacters}
        </p>
      </Stack>
    );
  } 
  else if (!value.trim().length) {

    return (
      <Stack horizontal horizontalAlign="center" >
        <Icon iconName="AlertSolid"className={styles.errorIcon} />
        <p className={styles.fieldInstruction}>
          {strings.blankField}
        </p>
      </Stack>

    );
  }  
  else {
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

  if (!value.trim().length) {
    return  (
      <Stack horizontal>
        <Icon iconName="AlertSolid"className={styles.errorIcon} />
        <p className={styles.fieldInstruction}>{strings.blankField}</p>
      </Stack>
    )
    
  } 
  else 
  if (value.trim().length >= 1 && value.trim().length < 5) {
    if (charAllowed ) {
      return (
        <>
      <Stack horizontal style={{ paddingBottom: "5px" }}>
         <Icon iconName="AlertSolid"className={styles.errorIcon} />
         <p className={styles.fieldInstruction}>{strings.removeSpecialChar} <span aria-Label={`${specialCharFound}`}>{specialCharFound}</span></p>
      </Stack>
      
        <Stack horizontal>
          <Icon iconName="AlertSolid"className={styles.errorIcon} />
          <p className={styles.fieldInstruction}>{strings.minCharacters}</p>
        </Stack>
       </>
      )
    }  else {
      return (
        <Stack horizontal>
          <Icon iconName="AlertSolid"className={styles.errorIcon} />
          <p className={styles.fieldInstruction}>{strings.minCharacters}</p>
        </Stack>
      )
    }
  } else if ( value.trim().length >= 5) {
    if(charAllowed) {
      return (
        <Stack horizontal>
           <Icon iconName="AlertSolid"className={styles.errorIcon} />
           <p className={styles.fieldInstruction}>{strings.removeSpecialChar} <span aria-Label={`${specialCharFound}`}>{specialCharFound}</span></p>
        </Stack>
        )
    } else {
      return (null)
    }
  }

  if (charAllowed) {
    <Stack horizontal>
         <Icon iconName="AlertSolid"className={styles.errorIcon} />
         <p className={styles.fieldInstruction}>{strings.removeSpecialChar} <span aria-Label={`${specialCharFound}`}>{specialCharFound}</span></p>
    </Stack>
  }
}

export const validateOwnerField = (ownerList: string [], requestingUser: string, invalidEmail: string,  strings: { blankfield: string, requestorUser: string, invalidEmail: string} ): JSX.Element | string => {
 
  const sectionStackTokens: IStackTokens = {childrenGap: 5}

  if (ownerList.length === 0) {
    return (
      <Stack horizontal>
        <Icon iconName="AlertSolid"className={styles.errorIcon} />
        <p className={styles.fieldInstruction}>{strings.blankfield}</p>
      </Stack>
    )
  }

  if (requestingUser && invalidEmail) {
    return (
      <Stack tokens={sectionStackTokens}>
        <Stack horizontal>
          <Icon iconName="AlertSolid"className={styles.errorIcon} />
          <p className={styles.fieldInstruction}>{strings.requestorUser}</p>
        </Stack>
        <Stack horizontal>
          <Icon iconName="AlertSolid"className={styles.errorIcon} />
          <p className={styles.fieldInstruction}>{strings.invalidEmail} {invalidEmail}</p>
        </Stack>
      </Stack>
    )
  }

  if (requestingUser) {
    return (
      <Stack horizontal>
        <Icon iconName="AlertSolid"className={styles.errorIcon} />
        <p className={styles.fieldInstruction}>{strings.requestorUser}</p>
      </Stack>
    )
  }

  if (invalidEmail) {
    return (
      <Stack horizontal>
        <Icon iconName="AlertSolid"className={styles.errorIcon} />
        <p className={styles.fieldInstruction}>{strings.invalidEmail} {invalidEmail}</p>
      </Stack>
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

  return {
    isLessThanMinLength,
    hasSpecialChar,
  }
}




