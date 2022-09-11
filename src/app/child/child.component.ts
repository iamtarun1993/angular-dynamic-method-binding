import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User, UserWithDynamicMethod } from '../users.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent implements OnInit {
  @Input() users: User[];

  @Output() editUser: EventEmitter<string> = new EventEmitter();
  @Output() deleteUser: EventEmitter<string> = new EventEmitter();
  @Output() disableUser: EventEmitter<string> = new EventEmitter();

  @Input() usersWithDynamicMethod: UserWithDynamicMethod[];

  constructor() {}

  ngOnInit() {}

  edit(id: string) {
    this.editUser.emit(id);
  }

  delete(id: string) {
    this.deleteUser.emit(id);
  }

  disable(id: string) {
    this.disableUser.emit(id);
  }

  editMethod(id: string) {
    const userWithDynamicMethod = this.filterUserWithDynamicMethod(id);
    // Here try catch will make sure that no error thrown to console,
    // You can remove try catch and can check that edit method inside not called
    // for Super man(id: 345).
    try {
      userWithDynamicMethod.editMethod(userWithDynamicMethod?.id);
    } catch {
      console.log('Method not accessible');
    }
  }

  deleteMethod(id: string) {
    const userWithDynamicMethod = this.filterUserWithDynamicMethod(id);
    userWithDynamicMethod.deleteMethod(userWithDynamicMethod?.id);
  }

  commonMethod(actionType, id: string) {
    const userWithDynamicMethod = this.filterUserWithDynamicMethod(id);
    userWithDynamicMethod.commonMethod({
      actionType,
      id: userWithDynamicMethod?.id,
    });
  }

  filterUserWithDynamicMethod(id: string) {
    const userWithDynamicMethod = this.usersWithDynamicMethod.find((user) => {
      return user?.id === id;
    });

    return userWithDynamicMethod;
  }
}
