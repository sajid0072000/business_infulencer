import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'business-influencer';
  constructor(private router : Router, private common: CommonService) {  
  }

  ngOnInit(): void {
    if(this.router.url === '/'){
      // this.router.navigate(['/event/' + this.common.encrypt('1')]);
    }
  }
}
