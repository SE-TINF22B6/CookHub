import {LoginDataModel} from "../models/login-data-model";

export class LoginClient {

  private readonly URL : string = 'http://localhost:5184/login';

  public sendLoginRequest(email : string, password : string) {
    return new Promise((resolve, reject) =>  {
      const request = new XMLHttpRequest();
      const loginData = new LoginDataModel(email, password);
      const loginDataJson = JSON.stringify(loginData);

      console.log(loginDataJson);

      request.open('POST', this.URL, true);

      request.onload = () => {
        resolve(request.response);
      }

      request.setRequestHeader('Accept', 'application/json');
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(loginDataJson);
    });
  }
}