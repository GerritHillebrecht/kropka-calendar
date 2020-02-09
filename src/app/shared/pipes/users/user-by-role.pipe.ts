import { Pipe, PipeTransform } from '@angular/core';
import { UserProfile } from '@app/core/models';

@Pipe({
  name: 'userByRole'
})
export class UserByRolePipe implements PipeTransform {
  transform(users: UserProfile[], role: string): UserProfile[] {
    return users ? users.filter(user => user.role.title === role) : users;
  }
}
