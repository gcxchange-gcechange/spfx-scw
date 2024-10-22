/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/no-floating-promises */

/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import styles from "./Scw.module.scss";
import { Steps, Button } from "antd";
import { IScwProps } from "./IScwProps";
import { Initial } from "./InitialPage/Initial";
import { FocusTrapZone, ISpinnerStyles, PrimaryButton, Stack } from "office-ui-fabric-react";
import { IButtonStyles } from "office-ui-fabric-react";
import ErrorModal from "./Modal";
import FirstStep from "./FirstStep";
import FourthStep from "./FourthStep";
import SecondStep from "./SecondStep";
import { SelectLanguage } from "./SelectLanguage";
import {
  AadHttpClient,
  HttpClientResponse,
  IHttpClientOptions,
} from "@microsoft/sp-http";
import Title from "./Title";
import Complete from "./Complete";
import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";
import Callouts from "./Callouts";
import Failed from "./Failed";
import ReviewFields from "./ReviewFields";
import { fieldValidations } from "./validationFunction";
import ThirdStep from "./ThirdStep";


export interface IScwState {
  current: number;
  step: number;
  engName: string;
  ownerList: string[];
  commPurpose: string;
  frCommName: string;
  shEngDesc: string;
  shFrDesc: string;
  selectedChoice: string;
  errorMessage: string;
  showModal: boolean;
  checkedValues: string[];
  isLoading: boolean;
  validationStatus: number;
  showCallout: boolean;
  targetId: string;
  invalidEmail: string;
  requestingUser: string;
  isError: string[];
}

export default class AntDesignStep extends React.Component<
  IScwProps,
  IScwState
> {
  public strings = SelectLanguage(this.props.prefLang);

  public constructor(props: IScwProps, state: IScwState) {
    super(props);
    this.state = {
      current: 0,
      step: 0,
      engName: "",
      ownerList: [],
      commPurpose: "",
      frCommName: "",
      shEngDesc: "",
      shFrDesc: "",
      selectedChoice: "1",
      errorMessage: "",
      showModal: false,
      checkedValues: [],
      isLoading: false,
      validationStatus: 0,
      showCallout: false,
      targetId: "",
      invalidEmail: "",
      requestingUser: "",
      isError: [],
    };
  }

  private next = (): void => {
    const nextPage = this.state.current + 1;
    const {
      commPurpose,
      engName,
      frCommName,
      shEngDesc,
      shFrDesc,
      ownerList,
      current,
      invalidEmail,
      requestingUser,
      checkedValues,
      selectedChoice
    } = this.state;
    const values = { commPurpose, engName, frCommName, shEngDesc, shFrDesc };
    const { isLessThanMinLength, hasSpecialChar } = fieldValidations(values);
    const blankInputFields:any [] = [];

    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        const value = values[key as keyof typeof values];
    
        // Check for empty values
        if (value === '') {
          blankInputFields.push(key);
        }
    
        // Handle side line error validation
        this.handleSideLineErrorValidation(key, value);
      }
    }


    //Obj Array to use for validating if user goes to next page without changing field inputs.
    // const stateValues = [
    //   {
    //     commPurpose: commPurpose,
    //     engName: engName,
    //     frCommName: frCommName,
    //     shEngDesc: shEngDesc,
    //     shFrDesc: shFrDesc,
    //   },
    // ];
    // const keys = Object.keys(stateValues[0]);
    // const arrayVal = Object.values(stateValues[0]);

    // for (let i = 0; i < keys.length; i++) {
    //   const key = keys[i];
    //   const value = arrayVal[i];

    //   //get all empty values
    //   if ( value === '') {
    //     blankInputFields.push(key)
    //   }

    //   this.handleSideLineErrorValidation(key, value);
    // }

    //Check if the textField validation exists

    const inputFieldAriaValidArray:any[] = [];
  
    blankInputFields.forEach((field) => {
      const getInputFieldId = document.getElementById(field);
      if (getInputFieldId) {
        inputFieldAriaValidArray.push({[field]: getInputFieldId.getAttribute('aria-invalid')})
      }
    })
   
    this.blankFieldValidation(inputFieldAriaValidArray);

    const isMissingClassification =  current === 1 && (selectedChoice === "");
    const isMissingCheckedValues = current === 2 && (selectedChoice === "2" && checkedValues.length < 8);

    const showModal =
      isLessThanMinLength ||
      hasSpecialChar ||
      isMissingClassification ||
      isMissingCheckedValues ||
      (current === 3 &&
        (ownerList.length === 0 || requestingUser || invalidEmail));

    if (!showModal) {
      this.setState({
        current: nextPage,
      });
    } else {
      this.setState({
        showModal: true,
      });
    }
  };

  public blankFieldValidation = (values: any): void => {

    const errorFields: string[] = [];

    for (const obj of values) {
      for (const [key, value] of Object.entries(obj)) {
        if (value === 'false') {
          errorFields.push(key);
          this.setState({
            ...this.state,
            isError: errorFields
          });
        }
      }
    }
  };

  public closeModal = (): void => {
    this.setState({
      showModal: false,
    });
  };

  // private prev = (): void => {
  //   debugger;
  //   const prevPage = this.state.current - 1;

  //   const {
  //     current,
  //     engName,
  //     frCommName,
  //     shEngDesc,
  //     shFrDesc,
  //     commPurpose,
  //     ownerList,
  //     invalidEmail,
  //     requestingUser,
  //     selectedChoice
  //   } = this.state;
  //   const values = { engName, frCommName, shEngDesc, shFrDesc, commPurpose };
  //   const { isLessThanMinLength, hasSpecialChar } = fieldValidations(values);

  //   console.log("CUrrentPage",current);
  //   console.log("SElection", selectedChoice)

  //   const showOwnerModal = current === 3 && (ownerList.length === 0 || requestingUser || invalidEmail);
  //   const showReviewModal = (current === 4 && isLessThanMinLength) || hasSpecialChar || ownerList.length === 0 || requestingUser || invalidEmail; 


  //   const showModal =
  //     showOwnerModal ||
  //     showReviewModal
  //     //(current === 4 && isLessThanMinLength) || hasSpecialChar || ownerList.length === 0 || requestingUser || invalidEmail;    

  //   if (current === 0 && (isLessThanMinLength || hasSpecialChar) ) {
  //     console.log("error page `1")
  //   } else if (!showModal) {
  //     console.log("not show modal");
  //     this.setState({
  //       current: prevPage
  //     })
  //   }

    
  // };

  private clearState = ():void => {
    this.setState({
      selectedChoice: "1"
    })
  }

  private prev = (): void => {
    const prevPage = this.state.current - 1;

    const {
      current,
      engName,
      frCommName,
      shEngDesc,
      shFrDesc,
      commPurpose,
      ownerList,
      invalidEmail,
      requestingUser,
      selectedChoice
    } = this.state;
    const values = { engName, frCommName, shEngDesc, shFrDesc, commPurpose };
    const { isLessThanMinLength, hasSpecialChar } = fieldValidations(values);

    console.log("SelectedChoice", selectedChoice);

    // const showModal =
    //   (current === 3 && (ownerList.length === 0 || requestingUser || invalidEmail)) ||
    //   (current === 4 && isLessThanMinLength) || hasSpecialChar || ownerList.length === 0 || requestingUser || invalidEmail;
    if (current === 1) {
      this.setState({
        showModal: false,
        current: prevPage
      });
    } else if (current === 2 && selectedChoice === "2") {
      this.clearState();
    } 
    else if (current === 2 && selectedChoice ==="1"){
      this.setState({
        showModal: false,
        current: prevPage
      })
    }
    else if( current === 3 && (ownerList.length === 0 || requestingUser || invalidEmail)) {
      this.setState({
        showModal: true
      })
    } else if((current === 4 && isLessThanMinLength) || hasSpecialChar || ownerList.length === 0 || requestingUser || invalidEmail) {
      this.setState({
        showModal: true
      })
    }  else {
      this.setState({
        current: prevPage
      })
    }
  }; 
 

  public handleClickEvent = (): void => {
    const step = this.state.step + 1;
    this.setState({
      step,
    });
  };

  public goToInitalPage = (): void => {
    const step = this.state.step - 1;
    this.setState({
      step,
    });
  };

  public buttonStyle: IButtonStyles = {
    root: {
      fontSize: "18px",
      backgroundColor: "#004DB8",
    },
  };

  public escapeQuotes = (str: any) => {
    return str.replace(/"/g, '\\"');
  };

  public successMessage = (): void => {

    const {
      current,
      engName,
      frCommName,
      shEngDesc,
      shFrDesc,
      commPurpose,
      ownerList,
      invalidEmail,
      requestingUser
    } = this.state;
    const values = { engName, frCommName, shEngDesc, shFrDesc, commPurpose };
    const { isLessThanMinLength, hasSpecialChar } = fieldValidations(values);

    

    const showModal =
      ownerList.length === 0 ||
      requestingUser ||
      invalidEmail ||
      isLessThanMinLength ||
      hasSpecialChar;

    if (showModal) {
      this.setState({ showModal: true });
    } else {
      const functionUrl = "";
      const requestHeaders: Headers = new Headers();
      requestHeaders.append("Content-type", "application/json");
      requestHeaders.append("Cache-Control", "no-cache");

      const owner1 = [...ownerList, this.props.requestor].join(",");

      
      const postOptions: IHttpClientOptions = {
        headers: requestHeaders,
        body: `
					{
						"SpaceName": "${engName}",
						"SpaceNameFR": "${frCommName}",
						"Owner1": "${owner1}",
						"SpaceDescription": "${this.escapeQuotes(shEngDesc)}",
						"SpaceDescriptionFR": "${this.escapeQuotes(shFrDesc)}",
						"BusinessJustification":"${this.escapeQuotes(commPurpose)}",
						"TeamPurpose":"${this.escapeQuotes(commPurpose)}",
						"TemplateTitle": "Generic",
						"RequesterName": "${this.props.context.pageContext.user.displayName}",
						"RequesterEmail": "${this.props.requestor}",
						"SecurityCategory": "${this.state.selectedChoice === '1' ? 'unclassified' : this.state.selectedChoice === '2' ? 'prob' : this.state.selectedChoice}",
						"Status": "Submitted",
					}`,
      };

      console.log("BODY", postOptions.body);

      let responseText: string = "";

      // use aad authentication
      this.setState({ isLoading: true }, () => {
        document.getElementById("prev").style.display = "none";
        document.getElementById("submit").style.display = "none";

        this.props.context.aadHttpClientFactory
          .getClient('')
          .then((client: AadHttpClient) => {
            client
              .post(functionUrl, AadHttpClient.configurations.v1, postOptions)
              .then((response: HttpClientResponse) => {
                console.log(`Status code: ${response}`);

                if (response.status) {
                  this.setState({
                    current: current + 1,
                    isLoading: false,
                    validationStatus: response.status,
                  });
                }

                response
                  .json()
                  .then((responseJSON: JSON) => {
                    responseText = JSON.stringify(responseJSON);
                    console.log("respond is ", responseText);
                    if (response.ok) {
                      console.log("response OK");
                    } else {
                      console.log("Response error");
                    }
                  })
                  .catch((response: any) => {
                    const errMsg: string = `WARNING - error when calling URL ${functionUrl}. Error = ${response.message}`;
                    console.log("err is ", errMsg);
                  });
              });
          });
      });
    }
  };

  public handleOnChange = (event: any, value: string): void => {
    const eventName = event;
    const values = value;

    this.handleSideLineErrorValidation(event, value);

    this.setState({
      ...this.state,
      [eventName]: values,
    });

  };

  public handleSideLineErrorValidation = (eventName: string, value: string) => {
    const charAllowed = /[^a-zA-Z0-9ÀÁÂÃÄÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜàáâãäçèéêëìíîïòóôõöùúûüÆŒœæŸÿ'\s]/.test(value);

    const addErrorBorder = (lineId: string) => {
      const getlineId = document.getElementById(lineId);
      if (getlineId) {
        getlineId.classList.add(styles.errorBorder);
      }
    };

    const removeErrorBorder = (lineId: string) => {
      const getlineId = document.getElementById(lineId);
      if (getlineId) {
        getlineId.classList.remove(styles.errorBorder);
      }
    };

        const addErrorCharCount = (charCountId: string) => {
            const getCharCountId = document.getElementById(charCountId);
            if (getCharCountId) {
                getCharCountId.classList.add(styles.charCountError);
            }
 
          };
        
          const removeErrorCharCount = (charCountId: string) => {
            const getCharCountId = document.getElementById(charCountId);
            if (getCharCountId) {
                getCharCountId.classList.remove(styles.charCountError);
            }
           
          };
      
      
        switch (eventName) {
          case "commPurpose":
            if (value.length < 5) {
              addErrorBorder("first-line");
              addErrorCharCount("commPurposeCharCount");
                 
            } else {
              removeErrorBorder("first-line");    
              removeErrorCharCount("commPurposeCharCount")
            }
            break;
      
          case "engName":
            if (value.length < 5 || charAllowed) {
              addErrorBorder("second-line");   
              addErrorCharCount("engNameCharCount");          
            } else {
              removeErrorBorder("second-line");  
              removeErrorCharCount("engNameCharCount");         
            }
            break;
      
          case "frCommName":
            if (value.length < 5 || charAllowed) {
              addErrorBorder("third-line");
              addErrorCharCount("frCommNameCharCount");
            } else {
              removeErrorBorder("third-line");
              removeErrorCharCount("frCommNameCharCount")
            }
            break;
      
          case "shEngDesc":
            if (value.length < 5) {
              addErrorBorder("fourth-line");
              addErrorCharCount("shEngDescCharCount")
            } else {
              removeErrorBorder("fourth-line");
              removeErrorCharCount("shEngDescCharCount");
            }
            break;
      
          case "shFrDesc":
            if (value.length < 5) {
              addErrorBorder("fifth-line");
              addErrorCharCount("shFrDescCharCount");
            } else {
              removeErrorBorder("fifth-line");  
              removeErrorCharCount("shFrDescCharCount");
            }
            break;
      
          default:
            break;
        }
      };
      
      

    public commPurposeCallback = ( commPurpose: string ): void =>   { 
      const savePurpose = commPurpose.trim();

      this.setState({
        commPurpose: savePurpose,
      });

      this.handleSideLineErrorValidation("commPurpose", savePurpose);
    };

  public handleEngNameCallback = (engNameValue: string): void => {
    const saveEngName = engNameValue.trim();
    this.setState({
      engName: saveEngName,
    });
    this.handleSideLineErrorValidation("engName", saveEngName);
  };

  public frNameCallback = (FrNameValue: string): void => {
    const saveFrName = FrNameValue.trim();
    this.setState({
      frCommName: saveFrName,
    });
    this.handleSideLineErrorValidation("frCommName", saveFrName);
  };

  public engDescCallback = (EngDescValue: string): void => {
    const saveEngDesc = EngDescValue.trim();
    this.setState({
      shEngDesc: saveEngDesc,
    });
    this.handleSideLineErrorValidation("shEngDesc", EngDescValue);
  };

  public frDescCallback = (FrDescValue: string): void => {
    const saveFrDesc = FrDescValue.trim();
    this.setState({
      shFrDesc: saveFrDesc,
    });

    this.handleSideLineErrorValidation("shFrDesc", FrDescValue);
  };

  public handleOwnerCallback = (items: []): void => {
    const OwnerArr: any[] = [];
    let isRequestor: string = "";
    let isInvalidEmail: string = "";

    items.forEach((user) => {
      OwnerArr.push(user["secondaryText"]);

      if (user["secondaryText"] === this.props.requestor) {
        isRequestor = user["secondaryText"];
      }

      if (user["id"] === undefined) {
        isInvalidEmail = user["secondaryText"];
      }
    });

    const getLineId = document.getElementById("owners");

    if (this.state.current === 2 && getLineId) {
      if (OwnerArr.length === 0 || isRequestor || isInvalidEmail) {
        getLineId.classList.add(styles.errorBorder);
      } else {
        getLineId.classList.remove(styles.errorBorder);
      }
    }

    this.setState({
      ownerList: OwnerArr,
      requestingUser: isRequestor,
      invalidEmail: isInvalidEmail,
    });
  };

  public isCalloutVisible = (): void => {
    console.log("STATE", this.state.showCallout);
    this.setState((prevState) => ({
      showCallout: !prevState.showCallout,
    }));
  };

  public getElementId = (id: string): void => {
    console.log("targetID", id)
    this.setState({
      targetId: id,
    });
  };

  componentDidUpdate(prevProps: Readonly<IScwProps>, prevState: Readonly<IScwState>): void {
    if (this.state.current !== prevState.current) {
      const getCheckMark = document.getElementsByClassName(
        "anticon anticon-check ant-steps-finish-icon"
      );

      for (let i = 0; i < getCheckMark.length; i++) {
        const element = getCheckMark[i];
        element.setAttribute("aria-Label", "complete");
      }
    }
    
    if(this.state.step === 0 && this.state.step !== prevState.step) {
      this.setState({
        isError: [],
      });
    } 


    if (this.state.commPurpose !== prevState.commPurpose) {
      const index = this.state.isError.indexOf("commPurpose");
      if (index > -1) {
        const updateIsError = [...this.state.isError];
        updateIsError.splice(index, 1);

        this.setState({
          isError: updateIsError,
        });
      }
    }
    if (this.state.engName !== prevState.engName) {
      const index = this.state.isError.indexOf("engName");
      if (index > -1) {
        const updateIsError = [...this.state.isError];
        updateIsError.splice(index, 1);

        this.setState({
          isError: updateIsError,
        });
      }
    }
    if (this.state.frCommName !== prevState.frCommName) {
      const index = this.state.isError.indexOf("frCommName");
      if (index > -1) {
        const updateIsError = [...this.state.isError];
        updateIsError.splice(index, 1);

        this.setState({
          isError: updateIsError,
        });
      }
    }
    if (this.state.shEngDesc !== prevState.shEngDesc) {
      const index = this.state.isError.indexOf("shEngDesc");
      if (index > -1) {
        const updateIsError = [...this.state.isError];
        updateIsError.splice(index, 1);

        this.setState({
          isError: updateIsError,
        });
      }
    }
    if (this.state.shFrDesc !== prevState.shFrDesc) {
      const index = this.state.isError.indexOf("shFrDesc");
      if (index > -1) {
        const updateIsError = [...this.state.isError];
        updateIsError.splice(index, 1);

        this.setState({
          isError: updateIsError,
        });
      }
    }
  }

  public selectedChoiceCallback = ( selectedChoice: string ): void =>  { 
    console.log("SC",selectedChoice)
    const saveSelectedChoice = selectedChoice;

    this.setState( { 
        selectedChoice: saveSelectedChoice
    })
  } 

  public checkedTerms = ( event: any, isChecked:boolean ):void => {
    const id = event;

    if ( isChecked === true ) {
        this.setState(prevState => ({
            checkedValues: [...prevState.checkedValues, id]
        }));
    } 
    else {
        const newArray = this.state.checkedValues.filter((item) => item !== id)
        this.setState({
            checkedValues: newArray
        })
    }
  }

  public render(): React.ReactElement<IScwProps> {
    const {
      current,
      step,
      commPurpose,
      engName,
      frCommName,
      shEngDesc,
      shFrDesc,
      selectedChoice,
      ownerList,
      errorMessage,
      showModal,
      checkedValues,
      showCallout,
      targetId,
      requestingUser,
      invalidEmail,
      isError,
    } = this.state;

    const steps = [
      {
        step: "1",
        title: this.strings.title_details,
        content: (
          <FirstStep
            prefLang={this.props.prefLang}
            showModal={showModal}
            engName={engName}
            commPurpose={commPurpose}
            frCommName={frCommName}
            shEngDesc={shEngDesc}
            shFrDesc={shFrDesc}
            errorMessage={errorMessage}
            handleOnChange={this.handleOnChange}
            isError={isError}
          />
        ),
      },
      {
        step: "2",
        title: this.strings.classification,
        content: (
          <SecondStep
            prefLang={this.props.prefLang}
            selectedChoice= { selectedChoice }
            handleSelectedChoice= { this.selectedChoiceCallback}
          />
        ),
      },
      {
        step: "3",
        title: this.strings.term_of_use,
        content: (
          <ThirdStep
            prefLang={this.props.prefLang}
            checkedValues= { checkedValues } 
            checkedTerms = { this.checkedTerms }
            selectedChoice = { selectedChoice }
            
          />
        ),
      },
      {
        step: "4",
        title: this.strings.owners,
        content: (
          <FourthStep
            prefLang={this.props.prefLang}
            context={this.props.context}
            ownerList={ownerList}
            requestor={requestingUser}
            invalidEmail={invalidEmail}
            getOwnersCallback={this.handleOwnerCallback}
          />
        ),
      },
      {
        step: "5",
        title: this.strings.review_submit,
        content: (
          <ReviewFields
            current={current}
            prefLang={this.props.prefLang}
            engName={engName}
            commPurpose={commPurpose}
            frCommName={frCommName}
            selectedChoice={selectedChoice}
            shEngDesc={shEngDesc}
            shFrDesc={shFrDesc}
            ownerList={ownerList}
            context={this.props.context}
            showCallout={showCallout}
            targetId={targetId}
            commPurposeCallback={this.commPurposeCallback}
            handleEngNameCallback={this.handleEngNameCallback}
            frNameCallBack={this.frNameCallback}
            getOwnersCallback={this.handleOwnerCallback}
            handleFrDescCallback={this.frDescCallback}
            handleEngDescCallback={this.engDescCallback}
            isCalloutVisible={this.isCalloutVisible}
            getElementId={this.getElementId}
            requestor={requestingUser}
            invalidEmail={invalidEmail}

          />
        ),
      },
      {
        step: "6",
        title: this.strings.title_complete,
        content:
          this.state.validationStatus === 200 ? (
            <Complete prefLang={this.props.prefLang} url={this.props.url} />
          ) : (
            <Failed
              prefLang={this.props.prefLang}
              engName={engName}
              frCommName={frCommName}
              ownerList={ownerList}
              commPurpose={commPurpose}
              shEngDesc={shEngDesc}
              shFrDesc={shFrDesc}
              validationStatus={this.state.validationStatus}
              selectedChoice={selectedChoice}
            />
          ),
      },
    ];

    const items = steps.map((item) => item.step !== "6" ? { key: item.step, title: item.title } : null );

    const labelSpinnerStyles: Partial<ISpinnerStyles> = {
      root: { padding: 20 },
    };


    return (
      <>
        <div className={styles.scw}>
          <Title
            current={current}
            step={step}
            prefLang={this.props.prefLang}
            status={this.state.validationStatus}
            selectedChoice={this.state.selectedChoice}
          />
          {step === 0 ? (
            <>
              <Initial
                context={this.props.context}
                prefLang={this.props.prefLang}
              />
              <PrimaryButton
                styles={this.buttonStyle}
                text={this.strings.Lets_go}
                aria-Label={this.strings.Lets_go}
                onClick={() => {
                  this.handleClickEvent();
                }}
                className={styles.centerButton}
              />
            </>
          ) : (
            <div className={styles.container}>
              <div className={styles.row}>
                <div role="progressbar" 
                  aria-valuemax={4} 
                  aria-valuemin={0} 
                  aria-valuenow={Math.floor(parseFloat(steps[this.state.current].step))}  
                  aria-valuetext={`Step ${this.state.current + 1} out of 5`} 
                >
                <Stack horizontalAlign="center" >
                  <Steps
                    current={this.state.current}
                    labelPlacement="vertical"
                    items={items}
                  />
                </Stack>
                </div>
                {showCallout && (
                  <Callouts
                    prefLang={this.props.prefLang}
                    showCallout={showCallout}
                    targetId={targetId}
                    openCallout={this.isCalloutVisible}
                  />
                )}
                {this.state.showModal === true && (
                  <FocusTrapZone>
                    <ErrorModal
                      requestor={requestingUser}
                      invalidUser={invalidEmail}
                      prefLang={this.props.prefLang}
                      current={current}
                      engName={engName}
                      commPurpose={commPurpose}
                      frCommName={frCommName}
                      shEngDesc={shEngDesc}
                      shFrDesc={shFrDesc}
                      checkedValues={checkedValues}
                      ownerList={ownerList}
                      showModal={showModal}
                      openModal={this.next}
                      onClose={this.closeModal}
                      selectedChoice={selectedChoice}
                    />
                  </FocusTrapZone>
                )}

                <div className="steps-content">
                  {this.state.isLoading ? (
                    <Spinner
                      label={this.strings.submitting_your_information}
                      labelPosition="right"
                      size={SpinnerSize.large}
                      styles={labelSpinnerStyles}
                    />
                  ) : (
                    steps[this.state.current].content
                  )}
                </div>

                <div className="steps-action">
                  <Stack horizontal horizontalAlign="space-between">
                    {this.state.current === 0 && (
                      <Button
                        className={styles.previousbtn}
                        onClick={() => this.goToInitalPage()}
                      >
                        {this.strings.prev_btn}
                      </Button>
                    )}
                    {this.state.current > 0 && ((this.state.current !== 4 && steps[this.state.current].step !== "3") || steps[this.state.current].step !== "4") && 
                    (
                        <Button
                          id="prev"
                          className={styles.previousbtn}
                          style={{
                            display: "inline-block",
                            overflow: "visible",
                            whiteSpace: "break-spaces",
                            height: "auto",
                          }}
                          onClick={() => this.prev()}
                        >
                           { this.state.current === 2 && selectedChoice === "2" ? `${ this.strings.unclassified_button }` : `${ this.strings.prev_btn }` }
                        </Button>
                      )}

                      {this.state.current < steps.length - 2 && (
                        <>
                          {this.state.current === 2 && selectedChoice === "2" ? (
                            <Button
                              className={styles.largebtn}
                              style={{ height: '54px' }}
                              type="primary"
                              onClick={this.next}
                            >
                              {this.strings.next_btn}
                            </Button>
                          ) : (
                            <Button
                              id="next"
                              className={styles.largebtn}
                              type="primary"
                              onClick={this.next}
                            >
                              {this.strings.next_btn}
                            </Button>
                          )}
                        </>
                      )}

                    {this.state.current === steps.length - 2 && (
                      <Button
                        id="submit"
                        className={styles.largebtn}
                        type="primary"
                        onClick={this.successMessage}
                      >
                        {this.strings.submit_btn}
                      </Button>
                    )}
                  </Stack>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}
