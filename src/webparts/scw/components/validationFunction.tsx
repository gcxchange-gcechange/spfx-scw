/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Stack, Icon } from 'office-ui-fabric-react';
import * as React from 'react';
 
import styles from './Scw.module.scss';



export const validateTextField = (value: string, strings: { minCharacters: string; blankField: string }): JSX.Element => {

    const trimmedValue = value.trim();
   


    if (trimmedValue.length >= 1 && trimmedValue.length < 5) {
      return (
        <Stack horizontal horizontalAlign="center">
          <Icon iconName="AlertSolid" className={styles.errorIcon} />
          <p className={styles.fieldInstruction}>
            {strings.minCharacters}
          </p>
        </Stack>
      );
    } else if (!value.trim().length) {
      return (
        <Stack horizontal horizontalAlign="center">
          <Icon iconName="AlertSolid" className={styles.errorIcon} />
          <p className={styles.fieldInstruction}>{strings.blankField}</p>
        </Stack>
      );
    } else {
      return null;
    }
}