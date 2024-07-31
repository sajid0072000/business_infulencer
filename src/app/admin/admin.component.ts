import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  constructor(private router: Router) {}
  ngOnInit() {
    const d: any = sessionStorage.getItem('user');
    if(!d) {
      this.router.navigate(['/admin']);
    }
  }

}
