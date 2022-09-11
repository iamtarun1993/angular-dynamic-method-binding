import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export interface User {
  id: string;
  name: string;
  studio: string;
  canEdit?: boolean;
  canDelete?: boolean;
  caDisable?: boolean;
}

export interface UserWithDynamicMethod extends User{
  editMethod?: (data: any) => void;
  deleteMethod?: (data: any) => void;
  disableMethod?: (data: any) => void;
  commonMethod?: (data: any) => void;
}

export class UsersService {
  constructor() {}

  getAllUsers(): Observable<User[]> {

    const users = [
      { id: '123', name: 'Iron man', studio: 'marvel', canEdit: true, canDisable: true },
      { id: '234', name: 'Spider man', studio: 'marvel', canEdit: true, canDelete: true },
      { id: '345', name: 'Super man', studio: 'DC', canDisable: true, canDelete: true },
    ];
    
    return of(users);
  }
}
