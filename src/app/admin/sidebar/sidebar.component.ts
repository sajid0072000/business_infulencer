import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    document.querySelectorAll('li').forEach(item => {
      item.addEventListener('click', event => {
        document.querySelectorAll('li').forEach(i => {i.classList.remove('active')})
        item.classList.add('active')
      })
    })
  }

  goTo(path: string): void {
    this.router.navigate([path]);
  }

}
