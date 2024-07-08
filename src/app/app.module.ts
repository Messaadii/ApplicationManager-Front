import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListVirtualMachineComponent } from './components/virtualMachine/list-virtual-machine/list-virtual-machine.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CreateUpdateVirtualMachineComponent } from './components/virtualMachine/create-update-virtual-machine/create-update-virtual-machine.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgxNavbarModule, IgxIconModule } from 'igniteui-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListAppUpdaterConfigComponent } from './components/app-updater-config/list-app-updater-config/list-app-updater-config.component';
import { CreateUpdateAppUpdaterConfigComponent } from './components/app-updater-config/create-update-app-updater-config/create-update-app-updater-config.component';
import { ViewModalComponent } from './components/app-updater-config/view-modal/view-modal.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UpdateResultHistoryComponent } from './components/app-updater-config/update-result-history/update-result-history.component';


@NgModule({
  declarations: [
    AppComponent,
    ListVirtualMachineComponent,
    CreateUpdateVirtualMachineComponent,
    NavBarComponent,
    ListAppUpdaterConfigComponent,
    CreateUpdateAppUpdaterConfigComponent,
    ViewModalComponent,
    UpdateResultHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    IgxNavbarModule,
    IgxIconModule,
    FontAwesomeModule,
    MatProgressSpinnerModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
