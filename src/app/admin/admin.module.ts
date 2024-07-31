import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ParticipantsComponent } from './participants/participants.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EventMasterComponent } from './eventMaster/event-master/event-master.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BulkUploadComponent } from './bulk-upload/bulk-upload.component';
import { EmailReminderComponent } from './email-reminder/email-reminder.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';




@NgModule({
  declarations: [
    AdminComponent,
    ParticipantsComponent,
    LoginComponent,
    SidebarComponent,
    EventMasterComponent,
    BulkUploadComponent,
    EmailReminderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    MatPaginatorModule,
    CKEditorModule
  ]
})
export class AdminModule { }
