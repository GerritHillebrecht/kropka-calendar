import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserByRolePipe } from './users/user-by-role.pipe';
import { TrunkPipe } from './text/trunk.pipe';

@NgModule({
  declarations: [UserByRolePipe, TrunkPipe],
  imports: [CommonModule],
  exports: [UserByRolePipe, TrunkPipe]
})
export class PipesModule {}
