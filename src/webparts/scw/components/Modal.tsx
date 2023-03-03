import * as React from "react";
import { Modal, PrimaryButton } from "@fluentui/react";
import { IconButton } from "@fluentui/react/lib/Button";
import styles from "./Scw.module.scss";
import { Stack } from "office-ui-fabric-react/lib/Stack";

export interface IErrorModalProps {
    showModal: boolean;
    handleShowModal?:(value: boolean) => void  ;
}

export interface IErrorModalState {

}

export default class ErrorModal extends React.Component<IErrorModalProps,IErrorModalState> {


  public constructor(props: IErrorModalProps, state: IErrorModalState) {
    super(props);

 
  }

//   private showModal = (): void => {
//     this.setState({ showModal: true });
//   };

  private hideModal = (): void => {
    this.setState({ showModal: false });
    this.props.handleShowModal(false);
  };


  private modalStyle = {
    main: {
        display: 'flex',
        borderRadius: '5px',
        minWidth: '500px'
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

  public render(): React.ReactElement<IErrorModalProps> {

    console.log("ModalProps",this.props);

    return (
      <>
        <div>
          {/* <PrimaryButton onClick={this.showModal}>Open</PrimaryButton> */}
          <Modal
            isOpen={this.props.showModal}
            onDismiss={this.hideModal}
            isBlocking={true}
            styles={{
                main: this.modalStyle.main
            }}
          >
            <div style={this.modalStyle.header}>
              <h2>Did you forget something?</h2>
                <IconButton 
                    className={styles.cancelIcon}
                    iconProps={{iconName: 'Cancel'}}  
                    onClick={this.hideModal}/>
            </div>
            <div style={this.modalStyle.footer}>
                <Stack >
                    <Stack.Item align="center"><p>You must provide in order to proceed.</p></Stack.Item>
                    <Stack.Item><hr className={styles.horizontalLine}/></Stack.Item>
                    <Stack.Item align="center"><PrimaryButton onClick={this.hideModal} className={styles.close}>CLOSE</PrimaryButton></Stack.Item>
              </Stack>
            </div>
          </Modal>
        </div>
      </>
    );
  }
}
