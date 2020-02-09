import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from './components';
import { PipesModule } from './pipes';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [FormsModule, ReactiveFormsModule, ComponentsModule, PipesModule]
})
export class SharedModule {}
