export type TSocialAccount = 'Facebook' | 'Twitter';

export interface ILoginResponse {
  access_token: string;
  ekoUser?: any;
  expires_in?: number;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
  magento_access_token?: string;
}
