import * as React from 'react';
import { Modal } from '@fluentui/react';

export interface IErrorModalProps {

}

export interface IErrorModalState {

}

export default class ErrorModal extends React.Component<IErrorModalProps, IErrorModalState> {
    public constructor(props: IErrorModalProps, state: IErrorModalState) {
        super(props);
    }

    public render(): React.ReactElement<IErrorModalProps> {
        return (
            <div>
                <Modal/>
            </div>
        );
    }
}