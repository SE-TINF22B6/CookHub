import {LoginDataModel} from "../models/login-data-model";

export class UserClient {

  private readonly URL : string = 'http://localhost:5184/login';

  public sendLoginRequest(email : string, password : string) : Promise<string> {
    return new Promise((resolve, reject) =>  {
      const request = new XMLHttpRequest();
      const loginData = new LoginDataModel(email, password);
      const loginDataJson = JSON.stringify(loginData);

      request.open('POST', this.URL, true);

      request.onload = () => {
        resolve(request.response);
      }

      request.setRequestHeader('Accept', 'application/json');
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(loginDataJson);
    });
  }

  public async isLoggedIn() {
    try {
      const response = await fetch(`https://localhost:44328/Login/is-logged-in/`, {
        method: 'GET',
        credentials: 'include',
      });
      console.log(response);

      return response.ok;

    } catch (error) {
      console.error(error);
    }
  }

  public async logOut() {
    try {
      const response = await fetch(`https://localhost:44328/Login/log-out`, {
        method: 'GET',
        credentials: 'include',
      });
      console.log(response);

      return response;

    } catch (error) {
      console.error(error);
    }
  }

  public async userLogin(email: string, password: string) {
    try {
      const response = await fetch(`https://localhost:44328/Login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',


        },
        body: JSON.stringify({ 'email':email, 'password':password }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Response was not ok.');
      }
      console.log(response);
      let test = await this.isLoggedIn()
      console.log(test);

      return response.status;


    } catch (error) {
      console.error('Failed to log in:', error);

    }
  }




}