import { Component, OnInit, ViewChild } from '@angular/core';
import { RestApiService } from '../../services/rest-api.service';
import { CommonService } from '../../services/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrl: './participants.component.css'
})
export class ParticipantsComponent implements OnInit {
  @ViewChild('deleteModal') deleteModal: any;
  // @viewChild('sendEmailModal') sendEmailmodal:any;


  searchText: any = ''
  participantsArr: Array<any> = []
  offset = 0;
  limit = 10;

  name: any = ''
  company: any = ''
  email: any = ''
  phone: any = ''
  landline: any = ''
  address: any = ''
  nameErr: boolean = false
  companynameErr: boolean = false
  emailErr: boolean = false
  validEmailErr: boolean = false
  phoneErr: boolean = false
  validMobileErr: boolean = false
  landlineErr: boolean = false
  validLinenumberErr: boolean = false
  addressErr: boolean = false
  participantId: any = ''
  isSelected: boolean = false
  selectedArr: any = [];
  selectAllItem: boolean = false;
  count: any = ''
  pageIndex = 1;
  pageSizeOptions = [10, 25, 50, 100, 150, 200, 250, 300, 350, 400];
  showFirstLastButtons = true;
  sendFlag: boolean = false;
  fileErr = false;
  loader: boolean = false;
  eventList: any = [];
  eventid: any = '';
  eventErr: boolean = false;
  deltItem: any



  postcode: any = ''
  country: any = ''
  region: any = ''
  countryErr: boolean = false
  countryCode: any = [];
  dial_code: any = ''
  dial_codeErr: boolean = false
  constructor(private restApi: RestApiService, private common: CommonService, private modalService: NgbModal) { }
  ngOnInit(): void {
    fetch("assets/json/countryCode.json").then(response => {
      return response.json();
    }).then(data => {
      this.countryCode = data;
    })
    this.getParticipants();
    this.getEvents();
  }

  downloadSample(): any {
    window.open(this.restApi.BASE_FILE_URL + 'format/sampleExcel.xlsx', '_blank');
  }

  getEvents(): any {
    this.restApi.getEventList({}).subscribe((res: any) => {
      if (res.success) {
        this.eventList = res.response;
      }
    }, (err: any) => { })
  }

  openparticipentModal(eventModal: any): any {
    this.resetForm()
    this.modalService.open(eventModal, { centered: true, size: "lg" });
  }

  getParticipants(flag = 0): any {
    if (flag === 1) {
      this.offset = 0;
      this.pageIndex = 1;
    }
    const data = {
      "limit": this.limit,
      "offset": this.offset,
      "name": this.searchText,
      "eventid": ""
    }
    this.common.loaderStart();
    this.restApi.getParticipants(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        if (res.response.data) {
          if (res.response.data.length > 0) {
            this.participantsArr = res.response.data;
            if (this.offset === 0) {
              this.count = res.response.count;
            }
          } else {
            this.participantsArr = [];
          }
        }
      }
    }, (err: any) => {
      this.common.toaster.error(err.error.message)
    })
  }

  edit(participantModal: any, data: any): any {
    this.modalService.open(participantModal, { centered: true, size: "lg" });
    this.participantId = data.id
    this.name = data.name
    this.company = data.company
    this.email = data.email
    this.phone = data.phone
    this.landline = data.landline
    this.address = data.address
    this.dial_code = data.countrycode
    this.country = data.country
    this.postcode = data.postcode
    this.region = data.region
  }

  updateParticipent() {
    this.nameErr = false
    this.companynameErr = false
    this.emailErr = false
    this.validEmailErr = false
    this.phoneErr = false
    this.validMobileErr = false
    this.landlineErr = false
    this.validLinenumberErr = false
    this.addressErr = false
    this.dial_codeErr = false
    let err = 0
    let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (this.name == "" || this.name == null || this.name == undefined) {
      this.nameErr = true
      err++
    }
    if (this.dial_code == "" || this.dial_code == null || this.dial_code == undefined) {
      this.dial_codeErr = true
      err++
    }
    if (this.country == "" || this.country == null || this.country == undefined) {
      this.countryErr = true
      err++
    }
    if (this.company == "" || this.company == null || this.company == undefined) {
      this.companynameErr = true
      err++
    }
    if (this.address == "" || this.address == null || this.address == undefined) {
      this.addressErr = true
      err++
    }
    if (this.email == "" || this.email == null || this.email == undefined) {
      this.emailErr = true
      err++
    }
    if (this.email) {
      if (!filter.test(this.email)) {
        this.validEmailErr = true;
        err++;
      }
    }

    if (
      this.phone === '' ||
      this.phone === null ||
      this.phone === undefined
    ) {
      this.phoneErr = true;
      err++;
    }
    if (this.phone) {
      if (
        this.phone.toString().length < 10 ||
        this.phone.toString().length > 15
      ) {
        this.validMobileErr = true;
        err++;
      }
    }
    if (
      this.landline === '' ||
      this.landline === null ||
      this.landline === undefined
    ) {
      this.landlineErr = true;
      err++;
    }
    if (this.landline) {
      if (
        this.landline.toString().length < 10 ||
        this.landline.toString().length > 15
      ) {
        this.validLinenumberErr = true;
        err++;
      }
    }
    if (err == 0) {
      const data = {
        "id": this.participantId,
        "name": this.name,
        "company": this.company,
        "email": this.email,
        "phone": this.phone,
        "landline": this.landline,
        "address": this.address,
        "countrycode": this.dial_code,
        "region": this.region,
        "postcode": this.postcode,
        "country": this.country

      }
      this.common.loaderStart();
      this.restApi.updateParticipant(data).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          this.common.toaster.success(res.message)
          this.resetForm();
          this.closeModal();
          this.getParticipants();
        } else {
          this.common.toaster.error(res.message)
        }
      }, (err: any) => {
        this.common.toaster.error(err.error.message)
      });
    }
  }

  resetForm(): any {
    this.name = ''
    this.dial_code = ''
    this.country = ''
    this.region = ''
    this.postcode = ''
    this.company = ''
    this.email = ''
    this.phone = ''
    this.landline = ''
    this.address = ''
    this.nameErr = false
    this.companynameErr = false
    this.emailErr = false
    this.validEmailErr = false
    this.phoneErr = false
    this.validMobileErr = false
    this.landlineErr = false
    this.sendFlag = false
    this.validLinenumberErr = false
    this.addressErr = false
    this.participantId = ''
    this.countryErr = false
    this.dial_codeErr = false
  }

  selectItem(item: any, idx: any) {
    if (item.isSelected) {
      this.sendFlag = true
      this.selectedArr.push(item.id);
    } else {
      this.selectedArr.splice(this.selectedArr.indexOf(item.id), 1);
      this.sendFlag = false
    }
  }

  selectAll() {
    this.selectedArr = [];
    if (this.selectAllItem) {
      this.sendFlag = true
      for (let item of this.participantsArr) {
        item.isSelected = true;
        this.selectedArr.push(item.id)
      }
    } else {
      this.sendFlag = false
      for (let item of this.participantsArr) {
        item.isSelected = false;
      }
    }

  }

  openDeleteModal(item: any) {
    this.deltItem = item
    this.modalService.open(this.deleteModal, { centered: true, size: "md" });
  }


  deltparticipants(): any {
    let ids: any = [];
    if (this.deltItem) {
      ids.push(this.deltItem.id);
    }
    if (this.deltItem == '') {
      for (let obj of this.participantsArr) {
        if (obj.isSelected) {
          ids.push(obj.id);
        }
      }
    }
    const data = {
      "ids": ids
    }
    this.common.loaderStart();
    this.restApi.deleteParticipant(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        this.common.toaster.success(res.message)
        this.getParticipants();
        this.closeModal();
      } else {
        this.common.toaster.error(res.message)
      }
    }, (err: any) => {
      this.common.toaster.error(err.error.message)
    })
  }



  search(): any {
    if (this.searchText.length >= 3) {
      this.getParticipants(1);
    } else if (this.searchText.length == 0) {
      this.getParticipants(1);
    }
  }

  nameFun(): any {
    this.nameErr = false
  }

  companyFun(): any {
    this.companynameErr = false
  }

  mobileFun(): any {
    this.phoneErr = false;
    if (this.phone) {
      if (
        this.phone.toString().length > 15 ||
        this.phone.toString().length < 10
      ) {
        this.validMobileErr = true
      } else {
        this.validMobileErr = false
      }
    }
  }
  regTestforMobile(string: any): boolean {
    var regex = /^[0-9]+$/;
    return regex.test(string);
  }
  onKeyPressMobile(event: any): any {
    this.phoneErr = false;
    if (this.phone) {
      if (
        this.phone.toString().length < 10 ||
        this.phone.toString().length > 15
      ) {
        this.validMobileErr = true;
      } else {
        this.validMobileErr = false;
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
    this.landlineErr = false;
    if (this.landline) {
      if (
        this.landline.toString().length > 15 ||
        this.landline.toString().length < 10
      ) {
        this.validLinenumberErr = true
      } else {
        this.validLinenumberErr = false
      }
    }
  }

  regTestforLandline(string: any): boolean {
    var regex = /^[0-9]+$/;
    return regex.test(string);
  }

  onKeyPressLandline(event: any): any {
    this.landlineErr = false;
    if (this.landline) {
      if (
        this.landline.toString().length < 10 ||
        this.landline.toString().length > 15
      ) {
        this.validLinenumberErr = true;
      } else {
        this.validLinenumberErr = false;
      }
    }
    let temp = event.key;
    if (!this.regTestforLandline(temp)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  emailFun(): any {
    let filter =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    this.emailErr = false;
    this.validEmailErr = false;
    if (this.email) {
      if (!filter.test(this.email)) {
        this.validEmailErr = true;
      }
    }
  }
  addressFun(): any {
    this.addressErr = false
  }
  closeModal(): any {
    this.modalService.dismissAll()
    this.resetForm()
  }

  handlePageEvent(event: any) {
    this.limit = event.pageSize;
    this.offset = this.limit * event.pageIndex;
    this.getParticipants()
  }


  openMailsendModal(sendEmailModal: any): any {
    this.modalService.open(sendEmailModal, { centered: true, size: "md" });
  }

  schuduleForMailSend(): any {
    let ids: any = [];
    for (let obj of this.participantsArr) {
      if (obj.isSelected) {
        ids.push(obj.id);
      }
    }
    const data = {
      "ids": ids
    }
    this.common.loaderStart();
    this.restApi.schuduleForMailSend(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        this.common.toaster.success(res.message)
        this.closeModal()
        this.getParticipants();
      } else {
        this.common.toaster.error(res.message)
      }
    }, (err: any) => {
      this.common.toaster.error(err.error.message);
    })
  }

  openUploadModal(uploadModal: any): any {
    this.eventid = '';
    this.loader = false;
    this.modalService.open(uploadModal, { centered: true, size: "md" });
  }

  uploadFile(): any {
    this.fileErr = false;
    this.eventErr = false;
    const elem: any = document.getElementById('blkfile');
    if (elem) {
      if (this.eventid === '') {
        this.eventErr = true;
        return;
      }
      if (elem.files.length === 0) {
        this.fileErr = true;
      } else {
        this.loader = true;
        const formData = new FormData();
        formData.append('file', elem.files[0]);
        this.restApi.uploadFile(formData).subscribe((res: any) => {
          if (res.success) {
            const fileName = res.response.fileName;
            this.bulkInsertParticipants(fileName, elem);
          }
        })
      }
    }
  }

  bulkInsertParticipants(fileName: string, elem: any) {
    this.restApi.bulkInsertParticipants({ fileName: fileName, eventid: this.eventid }).subscribe((res: any) => {
      if (res.success) {
        this.loader = false;
        this.common.toaster.success(res.message);
        this.getParticipants(1);
        elem.value = '';
        this.modalService.dismissAll()
      } else {
        this.loader = false;
        this.common.toaster.error(res.message);
      }
    }, (err: any) => {
      this.loader = false;
    })
  }


  // 
  countryFun(): any {
    this.countryErr = false
  }


}
