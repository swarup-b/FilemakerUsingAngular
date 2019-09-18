import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  headers = new HttpHeaders();
  header = this.headers.set('Authorization', localStorage.getItem('token'));

  constructor(private httpClient: HttpClient) { }
  // LoginUser
  loginUser(value, url): Observable<any> {
    return this.httpClient.post(url, value);
  }
  // Get all Contact
  getAllContacts(url): Observable<any> {
    return this.httpClient.get(url, { observe: 'response' });
  }


  // Delete Contact
  deleteRecordById(recordId, url): Observable<any> {
    const newUrl = url + '/' + recordId;
    return this.httpClient.delete(newUrl);
  }

  // Create New Contact
  saveContacts(value, url): Observable<any> {
    return this.httpClient.post(url, value);
  }

  // Update Contact
  updateContacts(value, url): Observable<any> {
    const newUrl = url + '/' + value.recordId;
    return this.httpClient.put(newUrl, value);
  }

  // Signup User

  signup(url, value): Observable<any> {
    return this.httpClient.post(url, value);
  }

}
