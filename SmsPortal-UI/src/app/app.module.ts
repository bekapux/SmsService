import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor } from './interceptors/jwt.interceptor.ts.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { SmsTemplateResolver } from './resolvers/sms-template-resolver.service';
import { SmsTemplateTextPipe } from './pipes/sms-template-text.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DatePipe } from '@angular/common'
//resolvers
import { AccountsTableResolver } from './resolvers/accounts-table-resolver.service';
import { AccountDetailsResolver } from './resolvers/account-details-resolver.service';
import { SentSmsDetailsResolver } from './resolvers/sent-sms-details-resolver.service';
import { SentSmsListResolver } from './resolvers/sent-sms-list-resolver.service';
// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { FooterComponent } from './components/footer/footer.component';
import { BlockedComponent } from './components/blocked/blocked.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { UsersTableComponent } from './components/admin-panel/users-table/users-table.component';
import { AddSmsTemplatesComponent } from './components/admin-panel/add-sms-templates/add-sms-templates.component';
import { MultipleRecipientsComponent } from './components/sms/multiple-recipients/multiple-recipients.component';
import { AddUserFormComponent } from './components/admin-panel/users-table/add-user-form/add-user-form.component';
import { AddTemplateFormComponent } from './components/admin-panel/add-sms-templates/add-template-form/add-template-form.component';
import { SidebarComponent } from './components/homepage/sidebar/sidebar.component';
import { SentSmsListComponent } from './components/sms/sent-sms-list/sent-sms-list.component';
import { SmsDetailsComponent } from './components/sms/sent-sms-list/sms-details/sms-details.component';
import { SmsTemplateDetailsComponent } from './components/admin-panel/add-sms-templates/sms-template-details/sms-template-details.component';
import { UserDetailsComponent } from './components/admin-panel/users-table/user-details/user-details.component';
import { AdminsidebarComponent } from './components/admin-panel/adminsidebar/adminsidebar.component';
import { RecipientManagerComponent } from './components/recipient-manager/recipient-manager.component';
import { RecipientsComponent } from './components/recipient-manager/recipients/recipients.component';
import { GroupsEditComponent } from './components/recipient-manager/groups-edit/groups-edit.component';
import { CategoriesEditComponent } from './components/recipient-manager/categories-edit/categories-edit.component';
import { MaterialModule } from './material/material.module';
import { SmsTabsComponent } from './components/sms/sms-tabs/sms-tabs.component';
import { GroupRecipientsComponent } from './components/sms/group-recipients/group-recipients.component';
const appRouter: Routes = [
  { path: '', component: LoginPageComponent, pathMatch: 'full' },
  {
    path: 'homepage',
    component: HomepageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: SmsTabsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'sentsms',
        component: SentSmsListComponent,
        canActivate: [AuthGuard],
        resolve: { data: SentSmsListResolver },
      },
      {
        path: 'sentsms/:id',
        component: SmsDetailsComponent,
        canActivate: [AuthGuard],
        resolve: { data: SentSmsDetailsResolver },
      },
      {
        path: 'recipientmanager',
        component: RecipientManagerComponent,
      },
    ],
  },
  { path: 'blocked', component: BlockedComponent },
  {
    path: 'adminPanel',
    component: AdminPanelComponent,
    children: [
      {
        path: '',
        component: UsersTableComponent,
        canActivate: [AuthGuard],
        resolve: { data: AccountsTableResolver },
      },
      {
        path: 'user/:id',
        component: UserDetailsComponent,
        canActivate: [AuthGuard],
        resolve: { data: AccountDetailsResolver },
      },
      {
        path: 'smstemplates',
        component: AddSmsTemplatesComponent,
      },
      {
        path: 'smstemplates/:id',
        component: SmsTemplateDetailsComponent,
        resolve: { data: SmsTemplateResolver },
      },
      { path: '**', component: BlockedComponent },
    ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginPageComponent,
    HomepageComponent,
    FooterComponent,
    BlockedComponent,
    AdminPanelComponent,
    UsersTableComponent,
    AddSmsTemplatesComponent,
    MultipleRecipientsComponent,
    AddUserFormComponent,
    AddTemplateFormComponent,
    SidebarComponent,
    SentSmsListComponent,
    SmsDetailsComponent,
    SmsTemplateDetailsComponent,
    SmsTemplateTextPipe,
    UserDetailsComponent,
    AdminsidebarComponent,
    RecipientManagerComponent,
    RecipientsComponent,
    GroupsEditComponent,
    CategoriesEditComponent,
    SmsTabsComponent,
    GroupRecipientsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRouter),
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    MaterialModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AccountsTableResolver,
    DatePipe,
    AccountDetailsResolver,
    SentSmsDetailsResolver,
    SmsTemplateResolver,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
