import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseModule } from './firebase';
import { ComponentsModule } from './components';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [FirebaseModule, ComponentsModule]
})
export class CoreModule {}
