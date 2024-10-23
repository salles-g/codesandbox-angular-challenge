import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';
import { User } from './user/user.model';
import { UserComponent } from './user/user.component';
import { SearchComponent } from '../search/search.component';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AsyncPipe, UserComponent, SearchComponent],
  template: `
    <app-search />
    <ul class="users">
      @for (user of filteredUsers$ | async; track user.id) {
      <app-user [user]="user" />
      }
    </ul>
  `,
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  filteredUsers$: Observable<User[]>;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.fetchUsers().subscribe();
    this.filteredUsers$ = this.usersService.getFilteredUsers();
  }
}
