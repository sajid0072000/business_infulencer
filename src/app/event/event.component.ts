import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../services/rest-api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent {
  eventDetails = {
    name: '',
    bannerimg: '',
    logo: '',
    description: '',
    startdate: '',
    starttime: ''
  };
  eventId = '';
  FILE_URL = this.restApi.FILE_URL;
  userName = '';
  userEmail = '';
  userPhone = '';
  companyName = '';
  userLandline = '';
  userAddress = '';
  sponsorList: string[] = ['partner-icon1.png', 'partner-icon2.png', 'partner-icon3.png', 'partner-icon4.png', 'partner-icon5.png', 'partner-icon6.png', 'partner-icon7.png', 'partner-icon8.png', 'partner-icon9.png', 'partner-icon10.png', 'partner-icon11.png', 'partner-icon12.png', 'partner-icon13.png', 'partner-icon14.png', 'partner-icon15.png', 'partner-icon16.png', 'partner-icon17.png', 'partner-icon18.png', 'partner-icon19.png' , 'partner-icon20.png'];

  userNameErr: boolean = false
  userEmailErr: boolean = false
  userValidEmailErr: boolean = false
  userPhoneErr: boolean = false
  userValidPhoneErr: boolean = false
  companyNameErr: boolean = false
  userLandlineErr: boolean = false
  validUserLandlineErr: boolean = false
  addressErr: boolean = false
  countryCode:any = [];
  dial_code:any=''
  region:any=''
  country:any=''
  postcode:any=''
  countryErr:boolean=false
  dial_codeErr:boolean=false
  startTime:any='';
  nameTitle = '';

  constructor(private restApi: RestApiService, private route: ActivatedRoute,
    private common: CommonService
  ) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.params['id'];
    if (this.eventId) {
      this.eventId = this.common.decrypt(decodeURIComponent(this.eventId));
    }
    fetch("assets/json/countryCode.json").then(response =>{
      return response.json();
    }).then(data =>{
      this.countryCode = data;
    })
    this.getEventDetails();
  }

  onCountrySelected(country: any) {
    console.log(country);
  }


  getEventDetails(): void {
    this.restApi.getEventDetails({ id: this.eventId }).subscribe((res: any) => {
      if (res.success) {
        this.eventDetails = res.response;
        this.startTime = this.common.convertrtTime(this.eventDetails.starttime)
      }
    }, (error) => {
      console.log(error);
    });
  }

  getParticipantDetails(): void {

  }


  createParticipants(): any {
    this.userNameErr = false
    this.userEmailErr = false
    this.userValidEmailErr = false
    this.userPhoneErr = false
    this.userValidPhoneErr = false
    this.companyNameErr = false
    this.userLandlineErr = false
    this.validUserLandlineErr = false
    this.addressErr = false
    this.dial_codeErr=false
    let err = 0
    let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (this.userName == "" || this.userName == null || this.userName == undefined) {
      this.userNameErr = true
      err++
    }
    /* if (this.dial_code == "" || this.dial_code == null || this.dial_code == undefined) {
      this.dial_codeErr = true
      err++
    }
    if (this.country == "" || this.country == null || this.country == undefined) {
      this.countryErr = true
      err++
    }

    if (this.companyName == "" || this.companyName == null || this.companyName == undefined) {
      this.companyNameErr = true
      err++
    }
    if (this.userAddress == "" || this.userAddress == null || this.userAddress == undefined) {
      this.addressErr = true
      err++
    } */
    if (this.userEmail == "" || this.userEmail == null || this.userEmail == undefined) {
      this.userEmailErr = true
      err++
    }
    if (this.userEmail) {
      if (!filter.test(this.userEmail)) {
        this.userValidEmailErr = true;
        err++;
      }
    }
    /* if (
      this.userPhone === '' ||
      this.userPhone === null ||
      this.userPhone === undefined
    ) {
      this.userPhoneErr = true;
      err++;
    }
    if (this.userPhone) {
      if (
        this.userPhone.toString().length < 10 ||
        this.userPhone.toString().length > 15
      ) {
        this.userValidPhoneErr = true;
        err++;
      }
    } */
    /* if (
      this.userLandline === '' ||
      this.userLandline === null ||
      this.userLandline === undefined
    ) {
      this.userLandlineErr = true;
      err++;
    } */
    // if (this.userLandline || this.userLandline != '') {
    //   if (
    //     this.userLandline.toString().length < 10 ||
    //     this.userLandline.toString().length > 15
    //   ) {
    //     this.validUserLandlineErr = true;
    //     err++;
    //   }
    // }
    if (err == 0) {
      const data = {
        "eventid": this.eventId,
        "name": this.nameTitle.trim() + ' ' + this.userName.trim(),
        "company": this.companyName,
        "email": this.userEmail,
        "phone": this.userPhone,
        "landline": this.userLandline,
        "address": this.userAddress,
        "countrycode":this.dial_code,
        "country":this.country,
        "postcode":this.postcode,
        "region":this.region
      }
      data.name = data.name.trim()
      this.common.loaderStart();
      this.restApi.createParticipant(data).subscribe(
        (res: any) => {
          this.common.loaderEnd();
          if (res.success) {
            this.common.toaster.success(res.message)
            this.resetParticipants();
          } else {
            this.common.toaster.error(res.message);
          }
        },
        (err: any) => {
          this.common.loaderEnd();
          this.common.toaster.error(err.error.message);
        }
      );
    }
  }

  resetParticipants(): any {
    this.userName = '';
    this.userEmail = '';
    this.userPhone = '';
    this.companyName = '';
    this.userLandline = '';
    this.userAddress = '';
    this.dial_code=''
    this.postcode=''
    this.region=''
    this.country=''
    this.userNameErr = false
    this.userEmailErr = false
    this.userValidEmailErr = false
    this.userPhoneErr = false
    this.userValidPhoneErr = false
    this.companyNameErr = false
    this.userLandlineErr = false
    this.validUserLandlineErr = false
    this.addressErr = false
    this.dial_codeErr=false
    this.countryErr=false
  }


  nameFun(): any {
    this.userNameErr = false
  }

  companyFun(): any {
    this.companyNameErr = false
  }


  emailFun(): any {
    let filter =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    this.userEmailErr = false;
    this.userValidEmailErr = false;
    if (this.userEmail) {
      if (!filter.test(this.userEmail)) {
        this.userValidEmailErr = true;
      }
    }
  }



  mobileFun(): any {
    this.userPhoneErr = false;
    if (this.userPhone) {
      if (
        this.userPhone.toString().length > 15 ||
        this.userPhone.toString().length < 10
      ) {
        this.userValidPhoneErr = true
      } else {
        this.userValidPhoneErr = false
      }
    }
  }
  regTestforMobile(string: any): boolean {
    var regex = /^[0-9]+$/;
    return regex.test(string);
  }
  onKeyPressMobile(event: any): any {
    this.userPhoneErr = false;
    if (this.userPhone) {
      if (
        this.userPhone.toString().length < 10 ||
        this.userPhone.toString().length > 15
      ) {
        this.userValidPhoneErr = true;
      } else {
        this.userValidPhoneErr = false;
      }
    }
    let temp = event.key;
    if (!this.regTestforMobile(temp)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  landlineFun(): any {
    this.userLandlineErr = false;
    if (this.userLandline) {
      if (
        this.userLandline.toString().length > 15 ||
        this.userLandline.toString().length < 10
      ) {
        this.validUserLandlineErr = true
      } else {
        this.validUserLandlineErr = false
      }
    }
  }

  regTestforLandline(string: any): boolean {
    var regex = /^[0-9]+$/;
    return regex.test(string);
  }

  onKeyPressLandline(event: any): any {
    this.userLandlineErr = false;
    if (this.userLandline) {
      if (
        this.userLandline.toString().length < 10 ||
        this.userLandline.toString().length > 15
      ) {
        this.validUserLandlineErr = true;
      } else {
        this.validUserLandlineErr = false;
      }
    }
    let temp = event.key;
    if (!this.regTestforLandline(temp)) {
      event.preventDefault();
      return false;
    }
    return true;
  }


  addressFun(): any {
    this.addressErr = false
  }

  countryFun():any{
    this.countryErr=false
  }


  callingCodeFun():any{
    this.dial_codeErr=false
  }

}
