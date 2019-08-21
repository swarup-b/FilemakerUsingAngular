import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  headers = new HttpHeaders();
  header = this.headers.set('Authorization', localStorage.getItem('key'));

  constructor(private httpClient: HttpClient) { }

  loginUser(value, url): Observable<any> {
    return this.httpClient.post(url, value);
  }

  getAllContacts(url) {
    let headerdata = { header: this.header }
    return this.httpClient.get(url, { headers: this.header });
  }
  deleteRecordById(recordId,url){
    let newUrl=url + "id="+recordId;
    return this.httpClient.get(newUrl);
  }
}
