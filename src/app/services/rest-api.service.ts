import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: {
    'Content-Type': 'application/json',
  }
};

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  BASE_URL = environment.BASE_URL;
  FILE_URL = environment.FILE_URL;
  BASE_FILE_URL = environment.BASE_FILE_URL;
  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post(this.BASE_URL + 'v1/users/login', data, httpOptions);
  }


  getEventDetails(data: any) {
    return this.http.post(this.BASE_URL + 'v1/event/getEventById', data, httpOptions);
  }


  getEvents(data: any) {
    return this.http.post(this.BASE_URL + 'v1/event/getEvents', data, httpOptions);
  }


  createEvent(data: any) {
    return this.http.post(this.BASE_URL + 'v1/event/createEvent', data, httpOptions);
  }

  updateEvent(data: any) {
    return this.http.post(this.BASE_URL + 'v1/event/updateEvent', data, httpOptions);
  }


  deleteEvent(data: any) {
    return this.http.post(this.BASE_URL + 'v1/event/deleteEvent', data, httpOptions);
  }


  getEventList(data: any) {
    return this.http.post(this.BASE_URL + 'v1/event/getEventList', data, httpOptions);
  }

  uploadFile(data: any) {
    return this.http.post(this.BASE_URL + 'v1/fileUpload/uploadFile', data);
  }

  createParticipant(data: any) {
    return this.http.post(this.BASE_URL + 'v1/participant/createParticipant', data);
  }

  getParticipants(data: any) {
    return this.http.post(this.BASE_URL + 'v1/participant/getParticipants', data);
  }


  updateParticipant(data: any) {
    return this.http.post(this.BASE_URL + 'v1/participant/updateParticipant', data);
  }


  deleteParticipant(data: any) {
    return this.http.post(this.BASE_URL + 'v1/participant/deleteParticipant', data);
  }

  schuduleForMailSend(data: any) {
    return this.http.post(this.BASE_URL + 'v1/participant/schuduleForMailSend', data);
  }

  bulkInsertParticipants(data: any) {
    return this.http.post(this.BASE_URL + 'v1/participant/bulkInsertParticipants', data, httpOptions);
  }


  // 15 may 2024
  addMailDetail(data: any) {
    return this.http.post(this.BASE_URL + 'v1/mailschedule/addMailDetail', data, httpOptions);
  }

  getMailDetail(data: any) {
    return this.http.post(this.BASE_URL + 'v1/mailschedule/getMailDetail', data, httpOptions);
  }

  updateMailDetail(data: any) {
    return this.http.post(this.BASE_URL + 'v1/mailschedule/updateMailDetail', data, httpOptions);
  }


  deleteMailDetail(data: any) {
    return this.http.post(this.BASE_URL + 'v1/mailschedule/deleteMailDetail', data, httpOptions);
  }

  generateOtp(data: any) {
    return this.http.post(this.BASE_URL + 'v1/users/generateOtp', data, httpOptions);
  }

  verifyOtp(data: any) {
    return this.http.post(this.BASE_URL + 'v1/users/verifyOtp', data, httpOptions);
  }
  resetPassword(data: any) {
    return this.http.post(this.BASE_URL + 'v1/users/resetPassword', data, httpOptions);
  }






















}
