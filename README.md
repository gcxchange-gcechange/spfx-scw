# Space Creation Wizard 

## Summary
- The web part comprises a three-step multi-form that users will submit to initiate a sharepoint teams site request.
- Able to change the language (English/French) in the property pane.


## Prerequisites
This web part connects to this [this function app](https://github.com/gcxchange-gcechange/appsvc-fnc-dev-scw-list).


## Version 
![SPFX](https://img.shields.io/badge/SPFX-1.22.2-green.svg)
![Node.js](https://img.shields.io/badge/Node.js-v22+-green.svg)

## Applies to
- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Version history

Version|Date|Comments
-------|----|--------
1.0|Jan 31, 2023 |Initial release
1.1|Jan 31, 2024 | Layout Modifications
2.0|Sep 10, 2025 | Upgrade SPFX 1.21.1
2.1|May 30, 2026 | Upgrade SPFX 1.22.2


## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - `npm install -g @rushstack/heft`
  - `npm install`
  - `heft start`

> Include any additional steps as needed.

Other build commands can be listed using `heft --help`.


## Minimal Path to Awesome
- Clone this repository
- Ensure that you are at the solution folder
- To install the dependencies, in the command-line run:
  - `npm install -g @rushstack/heft`
  - `npm install`
- To debug in the front end:
  - go to the `serve.json` file and update `initialPage` to `https://your-domain-name.sharepoint.com/_layouts/15/workbench.aspx`
  - In the command-line run:
    - `heft start`
    - You will need to add your client id and azure function to the clientId and url classs members in the SCW.tsx file.
- To deploy:
  - In the command-line run:
    - `heft build --production`
    - `heft package-solution --production`
  - Add the webpart to your tenant app store
- Approve the web API permissions
- Add the Webpart to a page
- Modify the property pane according to your requirements
 


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**
