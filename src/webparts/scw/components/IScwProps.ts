/* eslint-disable @typescript-eslint/no-explicit-any */
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IScwProps {
  context: WebPartContext;
  prefLang: string;
  url?: any;
  requestor?: any;
}
