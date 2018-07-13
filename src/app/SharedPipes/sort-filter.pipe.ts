import { Pipe, PipeTransform } from '@angular/core';
import { UserModel } from '../Model/User';

@Pipe({
  name: 'sortFilter'
})
export class SortFilterPipe implements PipeTransform {

  transform(users: UserModel[], path: string, order: number): UserModel[] {
     // Check if is not null
     if (!users || !path || !order) { return users; }

     return users.sort((a: UserModel, b: UserModel) => {
      // We go for each property followed by path
      a = a[path];
      b = b[path];

      // Order * (-1): We change our order
      return a > b ? order : order * (- 1);
  });

}
}
