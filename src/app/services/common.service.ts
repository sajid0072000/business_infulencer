import { ToastrService } from 'ngx-toastr';
import {NgxSpinnerService} from "ngx-spinner";
import { Injectable, inject } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  saltKey = "encrypt!135790";
  toaster=inject(ToastrService)
  constructor(private spinner: NgxSpinnerService) { }


  //To encrypt input data
  encrypt(str: string): string {
    return CryptoJS.AES.encrypt(str, this.saltKey).toString();
  }

  //To decrypt input data
  decrypt(strToDecrypt: string) {
    return CryptoJS.AES.decrypt(strToDecrypt, this.saltKey).toString(CryptoJS.enc.Utf8);
  }



loaderStart(): void {
    this.spinner.show();
}

loaderEnd(): void {
    this.spinner.hide();
}

  formatTime(min: any): any {
    if (isNaN(min) || min < 0) {
        return '0';
    }
    if (min <= 60) {
        return ` ${min} Minutes`;
    }
    const hours = Math.floor(min / 60);
    const remainingMinutes = min % 60;
    let temp = '';
    if (hours > 0) {
        if (hours !== 1) {
            temp = `${hours} Hours`;
        } else {
            temp = `${hours} Hour`;
        }
    }

    if (remainingMinutes > 0) {
        temp += ` ${remainingMinutes} Minutes`;
    }

    return temp;
}


  formatDate(date: any, flag = 0, format = 'YYYY-MM-DD') {
    let d = flag === 0 ? new Date(date) : date, month = '' + (d.getMonth() + 1), day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (format === 'YYYY-MM-DD') {
        return [year, month, day].join('-');
    } else {
        return [day, month, year].join('-');
    }
}


convertrtTime (time:any) {
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
  if (time.length > 1) { 
    time = time.slice (1);  
    time[5] = +time[0] < 12 ? 'AM' : 'PM'; 
    time[0] = +time[0] % 12 || 12; 
  }
  time[3] = ' '
  return time.join (''); 
}


}
