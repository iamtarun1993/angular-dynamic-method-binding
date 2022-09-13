import { Component, OnInit } from '@angular/core';
import { User, UsersService, UserWithDynamicMethod } from '../users.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent implements OnInit {
  users: User[];
  usersWithDynamicMethod: UserWithDynamicMethod[];

  constructor(public usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getAllUsers().subscribe((res) => {
      this.users = res;

      this.usersWithDynamicMethod = res.map((user) => {
        return {
          ...user,
          ...(user?.canEdit && {
            editMethod: (data) => this.editUser(data),
          }), // conditional method binding, passing editMethod() when only canEdit is true
          deleteMethod: (data) => this.deleteUser(data?.id),
          commonMethod: (data) =>
            this.commonMethod({ actionType: data?.actionType, id: data?.id }),
        };
      });
    });
  }

  editUser(id: string) {
    console.log('Edit user: ', id);
    // Api call for edit
  }

  deleteUser(id: string) {
    console.log('Delete user: ', id);
    // Api call for delete
  }

  disableUser(id: string) {
    console.log('Disable user: ', id);
    // Api call for disable
  }

  viewUser(id: string) {
    console.log('View user: ', id);
    // Api call for view more details
  }

  commonMethod(data: { actionType: any; id: string }) {
    console.log(data);
    if (data?.actionType === 'DISABLE') {
      // You can also put here one extra condition to check if this action is possible or not
      // using canDisabel
      this.disableUser(data?.id);
    } else if (data?.actionType === 'VIEW') {
      this.viewUser(data?.id);
    }
    // Here you can add more method when ever needed.
  }
}
