import * as React from 'react';
import { Input } from 'antd';

export interface IFistStepProps {

}

export interface IFistStepState {

}

export default class FistStep extends React.Component<IFistStepProps, IFistStepState> {
    public constructor(props: IFistStepProps, state: IFistStepState) {
        super(props);
    }

    public render(): React.ReactElement<IFistStepProps> {
        return (
            <div>
                <Input placeholder="First Step" />
            </div>
        );
    }
}