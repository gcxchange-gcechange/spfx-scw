import * as React from "react";
import { Modal, PrimaryButton } from "@fluentui/react";
import { IconButton } from "@fluentui/react/lib/Button";
import styles from "./Scw.module.scss";
import { Stack } from "office-ui-fabric-react/lib/Stack";

export interface IErrorModalProps {
    showModal: boolean;
    openModal?: () => void;
    onClose?: () => void;
    engName: string;
    frCommName: string;
    commPurpose: string;
    shEngDesc: string;
    shFrDesc: string;
    selectedChoice: string;
    checkedValues: boolean[];
    ownerList: string[];
}

export interface IErrorModalState {

}

export default class ErrorModal extends React.Component<IErrorModalProps,IErrorModalState> {


  public constructor(props: IErrorModalProps, state: IErrorModalState) {
    super(props);

 
  }



  private modalStyle = {
   
    main: {
        display: 'flex',
        borderRadius: '5px',
        minWidth: '500px',
        maxWidth: '500px'
    },
    header: {
        backgroundColor: '#106EBE',
        color: 'white',
        padding: '10px',
        display: 'flex',
        alignItems:'center',
        justifyContent: 'space-between'
    },
    footer: {
        padding: '10px',
        marginLeft: '20px',
        marginRight: '20px'
    }   
  }

  public errorMessage = () : string =>  {
      const { commPurpose, engName, frCommName, shEngDesc, shFrDesc, selectedChoice, checkedValues, ownerList } = this.props;

      interface PropValues {
        name: string;
        value: string | boolean |number;
      }

      const values: PropValues[] = [
        {name: 'Community purpose',   value: `${commPurpose}`},
        {name: 'English community name', value: `${engName}`},
        {name: 'French community name', value: `${frCommName}`},
        {name: 'Short English description', value: `${shEngDesc}`},
        {name: 'community classification', value: `${selectedChoice}`},
        {name: 'all terms of use', value: `${checkedValues}`},
        {name: 'add at least one more owner', value: `${ownerList}`},
      ]


     const missingValues = values.filter(obj => obj.value === '')
        
      console.log("MissingVal", values);

      console.log("null", missingValues);

      for (const item of missingValues) {
        let errorMessage = '';

        if (!item.value) {
          errorMessage += item.name
        }

       console.log("Message", errorMessage)
      }



      const fieldNames: string[] = ["Community Purpose", "English community name", "French community name", "Short English description", "Short French description", "community classification", " all terms of use", "add at least one more owner" ];
      let message = '';

  
      if(!commPurpose.length && !engName.length && !frCommName.length && !shEngDesc.length && !shFrDesc.length) {
        message = `${fieldNames[0]},  ${fieldNames[1]} , ${fieldNames[2]},  ${fieldNames[3]}, ${fieldNames[4]}`
      }
      else if (!commPurpose.length) {
        message = `${fieldNames[0]}`
      }
      else if ( !engName.length) {
        message = `${fieldNames[1]}`
      }
      else if ( !frCommName.length ) {
          message = ` ${fieldNames[2]}`
      }
      else if ( !shEngDesc.length) {
        message = `${fieldNames[3]}`
      }
      else if ( !shFrDesc.length) {
        message = `${fieldNames[4]}`
      }
      else if (!selectedChoice.length) {
        message = `${fieldNames[5]}`
      } 
      else if (checkedValues.length < 7) {
        message = `${fieldNames[6]}`
      } 
      else if ( ownerList.length < 2 ) {
        message = `${fieldNames[7]}`
      }

       return message
    }



  public render(): React.ReactElement<IErrorModalProps> {



    return (
      <>
        <div>
          <Modal
            isOpen={ this.props.showModal }
            onDismiss={ this.props.onClose }
            isBlocking={ true }
            styles={{
                main: this.modalStyle.main
            }}
          >
            <div style={this.modalStyle.header}>
              <h2>Did you forget something?</h2>
                <IconButton 
                    className={ styles.cancelIcon }
                    iconProps={{ iconName: 'Cancel' }}  
                    onClick={ this.props.onClose }/>
            </div>
            <div style={this.modalStyle.footer}>
                <Stack >
                    <Stack.Item align="center"><p>You must provide <strong>{this.errorMessage()}</strong> before proceeding</p></Stack.Item>
                    <Stack.Item><hr className={ styles.horizontalLine }/></Stack.Item>
                    <Stack.Item align="center"><PrimaryButton onClick={this.props.onClose } className={ styles.close }>CLOSE</PrimaryButton></Stack.Item>
              </Stack>
            </div>
          </Modal>
        </div>
      </>
    );
  }
}
