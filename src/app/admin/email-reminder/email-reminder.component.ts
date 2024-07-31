import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../services/common.service';
import { RestApiService } from '../../services/rest-api.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-email-reminder',
  templateUrl: './email-reminder.component.html',
  styleUrl: './email-reminder.component.css'
})
export class EmailReminderComponent implements OnInit {
  @ViewChild('deleteModal') deleteModal: any;
  public Editor = ClassicEditor;

  getEmailArr: Array<any> = []
  eventList: any = []
  eventid: any = '';
  mailbody: any = ''
  eventErr: boolean = false
  mailBodyErr: boolean = false
  addFlag: boolean = true
  offset = 0;
  limit = 3;
  searchText: any = ''
  count: any = ''
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25, 30, 35, 40];
  showFirstLastButtons = true;
  emailId: any = ''
  emaildetailsId: any = ''
  subject: any = ''
  subjectErr: boolean = false
  constructor(private modalService: NgbModal, private common: CommonService, private restApi: RestApiService) { }
  ngOnInit(): void {
    this.getEvents()
    this.getMailDetail()
  }

  getEvents(): any {
    this.restApi.getEventList({}).subscribe((res: any) => {
      if (res.success) {
        this.eventList = res.response;
      }
    }, (err: any) => { })
  }


  addMailDetail(): any {
    this.addFlag = true
    this.eventErr = false
    this.subjectErr = false
    this.mailBodyErr = false

    let err = 0;
    if (
      this.eventid == ""
    ) {
      this.eventErr = true;
      err++;
    }
    if (
      this.subject == "" ||
      this.subject == null ||
      this.subject == undefined
    ) {
      this.subjectErr = true
      err++;
    }
    if (
      this.mailbody == "" ||
      this.mailbody == null ||
      this.mailbody == undefined
    ) {
      this.mailBodyErr = true
      err++;
    }
    if (err == 0) {
      const data = {
        "eventid": this.eventid,
        "subject": this.subject,
        "mailbody": this.mailbody
      }
      this.common.loaderStart()
      this.restApi.addMailDetail(data).subscribe((res: any) => {
        this.common.loaderEnd()
        if (res.success) {
          this.common.toaster.success(res.message)
          this.resetForm();
          this.closeModal();
          this.getMailDetail();
        } else {
          this.common.toaster.error(res.message)
        }
      }, (err: any) => {
        this.common.toaster.error(err.error.message)
      })
    }
  }


  getMailDetail(flag = 0): any {
    if (flag === 1) {
      this.offset = 0;
      this.pageIndex = 1;
    }
    const data = {
      "limit": this.limit,
      "offset": this.offset,
      "search": this.searchText,
    }
    this.common.loaderStart()
    this.restApi.getMailDetail(data).subscribe(
      (res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          if (res.response.data) {
            if (res.response.data.length > 0) {
              this.getEmailArr = res.response.data;
              if (this.offset === 0) {
                this.count = res.response.count;
              }
            }
          }
        } else {
          this.getEmailArr = [];
        }
      },
      (err: any) => {
        this.common.toaster.error(err.error.message)
      }
    );
  }

  editemailDetails(addemailModal: any, data: any): any {
    this.addFlag = false
    this.eventid = data.eventid,
      this.emaildetailsId = data.id
    this.mailbody = data.mailbody
    this.subject = data.subject
    this.modalService.open(addemailModal, { centered: true, size: "lg" });
  }

  updateEmailDetails(): any {
    this.eventErr = false
    this.mailBodyErr = false
    let err = 0;
    if (
      this.eventid == ""
    ) {
      this.eventErr = true;
      err++;
    }
    if (
      this.mailbody == "" ||
      this.mailbody == null ||
      this.mailbody == undefined
    ) {
      this.mailBodyErr = true
      err++;
    }
    if (err == 0) {
      const data = {
        "id": this.emaildetailsId,
        "mailbody": this.mailbody,
        "subject": this.subject
      }
      this.common.loaderStart();
      this.restApi.updateMailDetail(data).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          this.common.toaster.success(res.message)
          this.resetForm();
          this.closeModal();
          this.getMailDetail();
        } else {
          this.common.toaster.error(res.message)
        }
      }, (err: any) => {
        this.common.toaster.error(err.error.message)
      });
    }
  }


  search(): any {
    if (this.searchText.length >= 3) {
      this.getMailDetail();
    } else if (this.searchText.length == 0) {
      this.getMailDetail();
    }
  }
  openDelteModal(item: any): any {
    this.emailId = item.id
    this.modalService.open(this.deleteModal, { centered: true, size: "md" });
  }

  deleteMailDetails(): any {
    const data = {
      "id": this.emailId
    }
    this.common.loaderStart();
    this.restApi.deleteMailDetail(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        this.common.toaster.success(res.message)
        this.getMailDetail();
        this.closeModal();
      } else {
        this.common.toaster.error(res.message)
      }
    }, (err: any) => {
      this.common.toaster.error(err.error.message)
    })
  }


  openEmailModal(addemailModal: any): any {
    this.addFlag = true
    this.resetForm()
    this.modalService.open(addemailModal, { centered: true, size: "lg" });
  }

  closeModal(): any {
    this.modalService.dismissAll()
    this.resetForm()
  }

  resetForm(): any {
    this.eventErr = false
    this.subjectErr = false
    this.mailBodyErr = false
    this.eventid = ''
    this.mailbody = ''
    this.subject = ''
    this.addFlag = true
  }



  handlePageEvent(event: any) {
    this.offset = this.limit * event.pageIndex;
    this.getMailDetail()
  }


  chnageMailbodyFun(): any {
    this.mailBodyErr = false
  }

  chngesubjectFun() {
    this.subjectErr = false
  }
}
