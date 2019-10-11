import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  res;
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
  updateContacts(value, url, recordId): Observable<any> {
    const newUrl = url + '/' + recordId;
    return this.httpClient.put(newUrl, value);
  }

  // Signup User

  signup(url, value): Observable<any> {
    return this.httpClient.post(url, value);
  }

  // Get Activity
  activities(url): Observable<any> {
    return this.httpClient.get(url);
  }
  // Create Activity

  createActivity(url, value): Observable<any> {
    return this.httpClient.post(url, value);
  }
  getRecordOnTableName(url): Observable<any> {
    return this.httpClient.get(url);
  }
  allContacts(url): Promise<any> {
    return this.httpClient.get(url, { observe: 'response' }).toPromise()
      .then(res => res)
      .catch(err => {
        return Promise.reject(err.json().error || 'Server error');
      });
  }
  uploadImage(url, File): Observable<any> {
    return this.httpClient.post(url , File, { reportProgress: true, observe: 'events' });
  }

}
