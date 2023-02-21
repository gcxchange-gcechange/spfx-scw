import * as React from 'react';
import { Input, Form } from 'antd';



export interface IFirstStepProps {
   name: string;
   handleCallback?: (name: string) => void;
}

export interface IFirstStepState {
    name: string;
}



export default class FirstStep extends React.Component<IFirstStepProps, IFirstStepState> {
    // userData: any;

    public constructor(props: IFirstStepProps, state: IFirstStepState) {
        super(props);

        this.state = {
            name: ''
        };

        this.handleOnChangeNameEvent = this.handleOnChangeNameEvent.bind(this);
    }

    

    public render(): React.ReactElement<IFirstStepProps> {

        const {name} = this.state;

       
        return (
            <>
            <Form>
                <Form.Item name="name" label={'name'}  >
                    { localStorage.getItem('name') ? <Input  showCount maxLength={30} onChange={this.handleOnChangeNameEvent} defaultValue={localStorage.getItem('name')}/>
                    : <Input  showCount maxLength={20} onChange={this.handleOnChangeNameEvent} value={name}/>
                    }
                    
                </Form.Item>
            </Form>
            </>
        );
    }


    private  handleOnChangeNameEvent = (event: React.ChangeEvent<HTMLInputElement>) :void => { 
        const newName = event.target.value;
        // console.log("newName",newName);
        this.setState({name: newName});
        //send it to the parent
        this.props.handleCallback("ChildNameToParent " + newName)
       
    }
}


// const FirstStep: React.FC<IFirstStepProps> = (props)=> {

//     const handleOnChangeEvent = (event: any):void => {
//         const userName = event.target.value;
//         console.log(userName);
       
//     };



//     return (
//         <>
//                 <FormItem name='name' label='name'>
//                     <Input onChange={() => props.handleCallback}/>
//                 </FormItem>
//         </>
//     );

// }
// export default FirstStep;