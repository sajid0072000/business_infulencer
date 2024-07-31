import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../services/rest-api.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  emailError: string = '';
  passwordError: string = '';
  oldPassword: string = '';
  otp: string = '';
  newpassword: string = '';
  successOtp: boolean = false;
  confirmPassword: string = '';
  confirmPwdErr: boolean = false;
  constructor(private rest: RestApiService, private router: Router, private modalservice: NgbModal, private common: CommonService) { }

  ngOnInit(): void {
    const d: any = sessionStorage.getItem('user');
    if (d) {
      this.router.navigate(['/admin/app/dashboard']);
    }
  }
  login() {
    this.emailError = '';
    this.passwordError = '';
    if (this.email === '') {
      this.emailError = 'Email is required';
      return;
    }
    if (this.password === '') {
      this.passwordError = 'Password is required';
      return;
    }
    this.rest.login({
      email: this.email,
      password: this.password
    }).subscribe((res: any) => {
      if (res.success) {
        sessionStorage.setItem('user', JSON.stringify(res.response));
        if (res.response.type == 1) {
          this.router.navigate(['/admin/app/dashboard']);
        }
      }
    });
  }
  OpenOtpModal(modal: any) {
    this.modalservice.open(modal, { centered: true, size: 'md', backdrop: false });
  }

  generateOtp(modal: any) {
    const data = {
      email: this.email
    };
    this.common.loaderStart();
    this.rest.generateOtp(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        this.successOtp = true;
        this.common.toaster.success(res.message);
        this.modalservice.dismissAll();
        this.modalservice.open(modal, { centered: true, size: 'md', backdrop: false });
      } else {
        this.successOtp = false;
        this.common.toaster.error(res.message);
      };
    }, (err: any) => {
      this.common.toaster.error(err.message);

    })
  }
  verifyOtp(modal: any) {
    const data = {
      email: this.email,
      otp: this.otp
    };
    this.rest.verifyOtp(data).subscribe((res: any) => {
      if (res.success) {
        this.common.toaster.success(res.message);
        this.modalservice.dismissAll();
        this.modalservice.open(modal, { centered: true, size: 'md', backdrop: false });
      } else {
        this.common.toaster.error(res.message);
      }
    }, (err: any) => {
      this.common.toaster.error(err.message);
    });
  }



  resetPassword(): any {
    if (this.newpassword != this.confirmPassword) {
      this.confirmPwdErr = true;
      return false;
    } else {
         const data = {
        email: this.email,
        password: this.newpassword
        };
       this.common.loaderStart();
        this.rest.resetPassword(data).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          this.common.toaster.success(res.message);
          this.closeModal();
        } else {
          this.common.toaster.error(res.message);

        }
      }, (err: any) => {
        this.common.toaster.error(err.message);
      });
    }
  }

  resetpwdErr(){
    this.confirmPwdErr = false;
  }

  closeModal(): any {
    this.modalservice.dismissAll()
    this.resetForm()
  }
  resetForm() {
    this.otp = '';
    this.newpassword = '';
  }
}
