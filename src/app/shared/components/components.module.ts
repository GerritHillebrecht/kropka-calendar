import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageHeaderComponent } from './image-header/image-header.component';
import { AvatarComponent } from './avatar/avatar.component';
import { DialogDeleteComponent } from './dialogs/dialog-delete/dialog-delete.component';
import { MaterialDesignModule } from '@app/core/material-design';

@NgModule({
  declarations: [ImageHeaderComponent, AvatarComponent, DialogDeleteComponent],
  imports: [CommonModule, MaterialDesignModule],
  exports: [ImageHeaderComponent, AvatarComponent],
  entryComponents: [
    DialogDeleteComponent
  ]
})
export class ComponentsModule {}
