import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { User } from './user/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  private filteredUsersSubject = new BehaviorSubject<User[]>([]);

  users$ = this.usersSubject.asObservable();
  filteredUsers$ = this.filteredUsersSubject.asObservable();

  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      tap((users) => {
        this.usersSubject.next(users);
        this.filteredUsersSubject.next(users); // Initialize filtered users with all users
      })
    );
  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  getFilteredUsers(): Observable<User[]> {
    return this.filteredUsers$;
  }

  filterUsers(searchTerm: string): void {
    const filteredUsers = this.usersSubject.value.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.filteredUsersSubject.next(filteredUsers);
  }
}
