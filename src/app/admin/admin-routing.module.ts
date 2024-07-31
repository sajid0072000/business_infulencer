import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

import { ParticipantsComponent } from './participants/participants.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EventMasterComponent } from './eventMaster/event-master/event-master.component';
import { BulkUploadComponent } from './bulk-upload/bulk-upload.component';
import { EmailReminderComponent } from './email-reminder/email-reminder.component';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [{
    path: '',
    component: LoginComponent
  }, {
    path: 'app',
    component: SidebarComponent,
    children: [{
      path: 'dashboard',
      component: ParticipantsComponent,
    },
    {
      path: 'emailreminder',
      component: EmailReminderComponent,
    },
    {
      path:'eventmaster',component:EventMasterComponent
    }, {
      path: 'upload',
      component: BulkUploadComponent
    }
  ]
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
