
import * as React from "react";
import { SelectLanguage } from './SelectLanguage';
import styles from './Scw.module.scss';


export interface ITitleProps {
    current: number;
    step: number;
		prefLang: string;
}

export default class Title extends React.Component<ITitleProps> {

	public strings = SelectLanguage(this.props.prefLang);

    constructor(props: ITitleProps) {
        super(props);
    }


    private pageTitle = ():string  => {
        const { current, step } = this.props;
        
        const titles: string[] = [ 
					`${this.strings.community_details}`, 
					`${this.strings.community_classification}`, 
					`${this.strings.terms}`,
					`${this.strings.invite_owners_members}`,
					`${this.strings.review_submit}`
				]
        
        let title:string = '';
        

        if ( step === 0) {
            title = null;
        }
        else if ( step === 1 && current === 0 ) {
            title = `${ titles[0] }`;
        }
        else if ( current === 1) {
            title = `${ titles[1] }`;
        }
        else if (current === 2 ) {
            title = `${ titles[2] }`;
        }
        else if (current === 3 ) {
            title=`${ titles[3] }`;
        } 
        else if (current === 4 ) {
                title= `${ titles[4] }`;
        }
        return title;
     }


    public render(): React.ReactElement<ITitleProps>  {

        return(
            <>
				{ this.props.step !== 0 && <h2 className={ styles.mainTitle }>{ this.strings.create_a_community }</h2> }
                <h2 style={{ marginTop: '0px' }}>{ this.pageTitle() }</h2>
            </>
        );

    }

}