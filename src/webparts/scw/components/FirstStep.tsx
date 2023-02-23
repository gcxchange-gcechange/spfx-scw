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
           
            <h2>Community purpose</h2>
            <p>The GCX Support Team needs to know the purpose of the new community to determine whether it can be <strong>approved.</strong></p>
            <Form layout='vertical'>
                <Form.Item name="commPurpose" label={'Community purpose'} extra="This will not show up on your site. Write in the official language of your choice. Max. 500 characters." >
                    { this.props.name !== '' ? <Input  showCount maxLength={30} onChange={this.handleOnChangeNameEvent} defaultValue={this.props.name}/>
                    : <Input  showCount maxLength={20} onChange={this.handleOnChangeNameEvent} value={name}/>
                    }
                </Form.Item>
            </Form>
                <h2>Community name</h2>
                <p>The communitys name is the title of your community. Create a short descriptive name. A bilingual name complies with the Official Langauges Act and makes it easier for others to find your community in the GCXchange Catalogue.</p>
                <Form layout='vertical'>
                    <Form.Item name="name" label={'name'}  >
                        { this.props.name !== '' ? <Input  showCount maxLength={30} onChange={this.handleOnChangeNameEvent} defaultValue={this.props.name}/>
                        : <Input  showCount maxLength={20} onChange={this.handleOnChangeNameEvent} value={name}/>
                        }
                    </Form.Item>
                    <Form.Item name="FrCommName" label={'French community name'} extra="Use keywords, ">
                        { this.props.name !== '' ? <Input  showCount maxLength={30} onChange={this.handleOnChangeNameEvent} defaultValue={this.props.name}/>
                        : <Input  showCount maxLength={20} onChange={this.handleOnChangeNameEvent} value={name}/>
                        }
                    </Form.Item>
                </Form>
                <h2>Community description</h2>
                <p>The community descrip[tion will be visible to users when they use the {`"All communities"`} page and when they search for it.</p>
                <Form layout='vertical'>
                    <Form.Item name="shEngDesc" label={'Short English description'} extra="Max.33 characters." >
                        { this.props.name !== '' ? <Input  showCount maxLength={30} onChange={this.handleOnChangeNameEvent} defaultValue={this.props.name}/>
                        : <Input  showCount maxLength={20} onChange={this.handleOnChangeNameEvent} value={name}/>
                        }
                    </Form.Item>
                    <Form.Item name="shFrDesc" label={'Short French description'} extra="Max.33 characters." >
                        { this.props.name !== '' ? <Input  showCount maxLength={30} onChange={this.handleOnChangeNameEvent} defaultValue={this.props.name}/>
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
        this.props.handleCallback("cTP " + newName)
       
    }
}
