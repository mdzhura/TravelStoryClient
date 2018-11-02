import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DashboardCrmComponent} from './dashboard-crm/dashboard-crm.component';
import {UserComponent} from '../user/user.component';
import {SettingsPageComponent} from '../user/settings-page/settings-page.component';
import {UserPageComponent} from '../user/user-page/user-page.component';
import {AdminComponent} from './admin.component';
import {AuthComponent} from './auth/auth.component';
import {FeatureTableComponent} from './table/feature-table/feature-table.component';
import {AboutComponent} from './pages/about/about.component';

const adminRoutes: Routes = [
  {
     path: 'admin',
     component: AdminComponent,
     children: [
      {path: '', redirectTo: 'admin/dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardCrmComponent},
      {path: 'auth', component: AuthComponent},
      {path: 'table', component: FeatureTableComponent},
      {path: 'about', component: AboutComponent}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes)

  ],
  declarations: []
})
export class AdminRoutingModule {
}
