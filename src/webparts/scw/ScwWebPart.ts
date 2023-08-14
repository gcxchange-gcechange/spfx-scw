/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-escape */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
    PropertyPaneDropdown,
    // PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart} from '@microsoft/sp-webpart-base';
import * as strings from 'ScwWebPartStrings';
import { IScwProps } from './components/IScwProps';
import AntDesignStep from './components/Scw';

export interface IScwWebPartProps {
    prefLang: string;
    url: any;
 
}

export default class ScwWebPart extends BaseClientSideWebPart<IScwWebPartProps> {

  private rootUrl:string = '';

  public render(): void {

    

    const element: React.ReactElement<IScwProps> = React.createElement(
      AntDesignStep,
      {
        context: this.context,
        prefLang: this.properties.prefLang,
        url: this.rootUrl,
        requestor: this.context.pageContext.user.email
        
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }



  
  public async onInit(): Promise<void> {
    await super.onInit();

    const pageContext  = this.context.pageContext;
    const absoluteWebUrl: string = `${pageContext.web.absoluteUrl}`;
    this.rootUrl = absoluteWebUrl.replace(pageContext.web.serverRelativeUrl, '');

  }


  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneDropdown('prefLang', {
                    label: 'Preferred Language',
                    options: [
                        { key: 'account', text: 'Account' },
                        { key: 'en-us', text: 'English' },
                        { key: 'fr-fr', text: 'Français' }
                    ]
                }),

              ]
            }
          ]
        }
      ]
    };
  }
}
