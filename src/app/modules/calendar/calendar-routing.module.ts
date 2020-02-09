import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageCalendarComponent } from './pages/page-calendar/page-calendar.component';
import { CalendarLayoutComponent } from './layout/calendar-layout/calendar-layout.component';

const routes: Routes = [
  {
    path: '',
    component: CalendarLayoutComponent,
    children: [{ path: '', component: PageCalendarComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule {}
