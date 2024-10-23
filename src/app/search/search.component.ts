import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-search',
  standalone: true,
  template: `
    <input class="search-bar" (input)="onSearch($event)" placeholder="Search users..." />
  `,
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  constructor(private usersService: UsersService) {}

  ngOnInit() {}

  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.usersService.filterUsers(searchTerm);
  }
}
