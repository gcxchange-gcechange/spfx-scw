
import * as React from "react";


export interface ITitleProps {
    current: number;
    step: number;
}

export default class Title extends React.Component<ITitleProps> {

    constructor(props: ITitleProps) {
        super(props);
    }


    private pageTitle = ():string  => {
        const { current, step } = this.props;
        
        const titles: string[] = [ "Community details", "Community classification", "Protected community terms of use", "Invite owners and members", "Review and Submit"]
        
        let title:string = '';
        
      console.log("page", current)
      console.log("step", step)


        if ( step === 0) {
            title = null
        }
        else if ( step === 1 && current === 0 ) {
            title = `${ titles[0] }`
        }
        else if ( current === 1) {
            title = `${ titles[1] }`
        }
        else if (current === 2 ) {
            title = `${ titles[2] }`
        }
        else if (current === 3 ) {
            title=`${ titles[3] }`
        } 
        else if (current === 4 ) {
                title= `${ titles[4] }`
        }
        return title
     }


    public render(): React.ReactElement<ITitleProps>  {

        return(
            <>
            <h2>{this.pageTitle()}</h2>
            </>
        );

    }

}