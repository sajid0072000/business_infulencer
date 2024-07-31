import { Component, OnInit, ViewChild } from '@angular/core';
import { RestApiService } from '../../../services/rest-api.service';
import { CommonService } from '../../../services/common.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-event-master',
  templateUrl: './event-master.component.html',
  styleUrl: './event-master.component.css'
})
export class EventMasterComponent implements OnInit {
  @ViewChild('deleteModal') deleteModal: any;

  searchText: any = ''
  eventArr: Array<any> = []
  offset = 0;
  limit = 3;

  name: any = ''
  bannerimg: any = ''
  description: any = ''
  logo: any = ''
  startdate: any = ''
  starttime: any = ''
  eventnameErr: boolean = false
  descriptionErr: boolean = false
  bannerimgImageErr: boolean = false
  logoErr: boolean = false
  starttimeErr: boolean = false
  startdateErr: boolean = false
  showField: boolean = false;
  FILE_URL: any = ''
  eventId: any = ''
  addFlag: boolean = true
  isSelected: boolean = false
  selectedArr: any = [];
  selectAllItem: boolean = false;
  count: any = ''
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25, 30, 35, 40];
  showFirstLastButtons = true;
  deltItem:any
  sendFlag: boolean = false;

  constructor(private restApi: RestApiService, private common: CommonService, private router: Router, private modalService: NgbModal) {
    this.FILE_URL = this.restApi.FILE_URL
  }
  ngOnInit(): void {
    this.getEvents()
  }




  getEvents(flag = 0): any {
    if (flag === 1) {
      this.offset = 0;
      this.pageIndex = 1;
    }
    const data = {
      "offset": this.offset,
      "limit": this.limit,
      "name": this.searchText
    };
    this.common.loaderStart();
    this.restApi.getEvents(data).subscribe(
      (res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          if (res.response.data) {
            if (res.response.data.length > 0) {
              for (let item of res.response.data) {
                item.isSelected = false;
                item.url = window.location.origin + '/event/' + encodeURIComponent(this.common.encrypt(item.id + ''));
              }
              this.eventArr = res.response.data;
              if (this.offset === 0) {
                this.count = res.response.count;
              }
            }
          }
        } else {
          this.eventArr = [];
        }
      },
      (err: any) => {
        this.common.toaster.error(err.error.message)
      }
    );
  }


  search(): any {
    if (this.searchText.length >= 3) {
      this.getEvents();
    }
    if (this.searchText.length == 0) {
      this.getEvents();
    }
  }


  openAddeventModal(eventModal: any): any {
    this.addFlag = true
    this.resetForm()
    this.modalService.open(eventModal, { centered: true, size: "lg" });
  }


  closeModal(): any {
    this.modalService.dismissAll();
    this.resetForm()
  }

  addEvent(): any {
    this.eventnameErr = false
    this.descriptionErr = false
    this.bannerimgImageErr = false
    this.logoErr = false
    this.starttimeErr = false
    this.startdateErr = false

    let err = 0;
    if (
      this.name == "" ||
      this.name == null ||
      this.name == undefined
    ) {
      this.eventnameErr = true;
      err++;
    }
    if (
      this.description == "" ||
      this.description == null ||
      this.description == undefined
    ) {
      this.descriptionErr = true
      err++;
    }
    if (this.bannerimg == "") {
      this.bannerimgImageErr = true;
      err++;
    }
    if (
      this.starttime == "" ||
      this.starttime == null ||
      this.starttime == undefined
    ) {
      this.starttimeErr = true
      err++;
    }

    if (
      this.startdate == "" ||
      this.startdate == null ||
      this.startdate == undefined
    ) {

      this.startdateErr = true
      err++;
    }

    if (this.logo == "") {
      this.logoErr = true;
      err++;
    }
    if (err == 0) {
      const data = {
        "name": this.name,
        "bannerimg": this.bannerimg,
        "logo": this.logo,
        "description": this.description,
        "startdate": this.startdate,
        "starttime": this.starttime
      }
      this.common.loaderStart();
      this.restApi.createEvent(data).subscribe(
        (res: any) => {
          this.common.loaderEnd();
          if (res.success) {
            this.common.toaster.success(res.message)
            this.resetForm();
            this.closeModal()
          } else {
            this.common.toaster.error(res.message)
          }
        },
        (err: any) => {
          this.common.loaderEnd();
          this.common.toaster.error(err.error.message);
        }
      );
    }
  }


  edit(addEventModal: any, data: any): any {
    this.addFlag = false
    this.modalService.open(addEventModal, { centered: true, size: "lg" });
    this.eventId = data.id
    this.name = data.name
    this.description = data.description
    this.starttime = data.starttime
    this.logo = data.logo
    this.bannerimg = data.bannerimg
    this.startdate = this.common.formatDate(data.startdate);
    this.starttime = data.starttime
  }


  updateEvent() {
    const data = {
      "id": this.eventId,
      "name": this.name,
      "bannerimg": this.bannerimg,
      "logo": this.logo,
      "description": this.description,
      "startdate": this.startdate,
      "starttime": this.starttime,
    }
    this.common.loaderStart();
    this.restApi.updateEvent(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        this.common.toaster.success(res.message);
        this.getEvents(1);
        this.resetForm();
        this.closeModal()
      } else {
        this.common.toaster.error(res.message)
      }
    }, (err: any) => {
      this.common.toaster.error(err.error.message);
    });
  }




  openDeleteModal(item:any){
    this.deltItem=item
    this.modalService.open(this.deleteModal, { centered: true, size: "md" });
  }




  deleteEvent(): any {
    let ids: any = [];
    if (this.deltItem) {
      ids.push(this.deltItem.id);
    }
    if (this.deltItem == '') {
      for (let obj of this.eventArr) {
        if (obj.isSelected) {
          ids.push(obj.id);
        }
      }
    }
    const data = {
      "ids": ids
    }
    this.common.loaderStart();
    this.restApi.deleteEvent(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        this.common.toaster.success(res.message)
        this.closeModal();
        this.getEvents();
      } else {
        this.common.toaster.error(res.message)
      }
    }, (err: any) => {
      this.common.toaster.error(err.error.message);
    })
  }


  resetForm(): any {
    this.eventnameErr = false
    this.descriptionErr = false
    this.bannerimgImageErr = false
    this.logoErr = false
    this.starttimeErr = false
    this.startdateErr = false
    this.sendFlag = false
    this.name = ''
    this.description = ''
    this.logo = ''
    this.bannerimg = ''
    this.startdate = ''
    this.starttime = ''
  }

  uploadBtnImageUri1(): any {
    let elem = document.getElementById('file1')
    if (elem) {
      elem.click()
    }
  }

  uploadBtnImageUri2(): any {
    let elem = document.getElementById('file2')
    if (elem) {
      elem.click()
    }
  }

  onFileChangedImage1(event: any, flag: any) {
    if (event.target.files && event.target.files.length > 0) {
      if (flag == 1) {
        this.bannerimgImageErr = false;
      }
      if (flag == 2) {
        this.logoErr = false;
      }
      let file = event.target.files[0];
      const fd = new FormData();
      fd.append('file', file);
      this.common.loaderStart();
      this.restApi.uploadFile(fd).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          if (flag == 1) {
            this.bannerimg = res.response.fileName;
          } if (flag == 2) {
            this.logo = res.response.fileName;
          }
        }
      });
    }
  }




  selectItem(item: any, idx: any) {
    if (item.isSelected) {
      this.sendFlag = true
      this.selectedArr.push(item.id);
    } else {
      this.selectedArr.splice(idx, 1);
      this.sendFlag = false
    }
  }

  selectAll() {
    if (this.selectAllItem) {
      this.sendFlag = true
      for (let item of this.eventArr) {
        item.isSelected = true;
      }
    } else {
      this.sendFlag = false
      for (let item of this.eventArr) {
        item.isSelected = false;
      }
    }

  }

  handlePageEvent(event: any) {
    this.offset = this.limit * event.pageIndex;
    this.getEvents()
  }

  nameFun(): any {
    this.eventnameErr = false
  }

  descriptionFun(): any {
    this.descriptionErr = false
  }

  dateFun(): any {
    this.startdateErr = false
  }

  timeFun(): any {
    this.starttimeErr = false
  }

}
