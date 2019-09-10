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
// LoginUser
  loginUser(value, url): Observable<any> {
    return this.httpClient.post(url, value);
  }
 // Get all Contact
  getAllContacts(url): Observable<any> {
    return this.httpClient.get(url, { headers: this.header });
  }

  // Delete Contact
  deleteRecordById(recordId, url): Observable<any> {
    const newUrl = url + '/' + recordId;
    return this.httpClient.delete(newUrl, { headers: this.header });
  }

  // Create New Contact
  saveContacts(value, url): Observable<any> {
    return this.httpClient.post(url, value, { headers: this.header });
  }

  // Update Contact
  updateContacts(value, url): Observable<any> {
    const newUrl = url + '/' + value.recordId;
    return this.httpClient.put(newUrl, value, { headers: this.header });
  }

  // Signup User

  signup(url, value): Observable<any> {
    return this.httpClient.post(url, value);
  }
  getRecordNo(url): Observable<any> {
    return this.httpClient.get(url, { headers: this.header });
  }
}
