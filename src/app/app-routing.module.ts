import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListVirtualMachineComponent } from './components/virtualMachine/list-virtual-machine/list-virtual-machine.component';
import { CreateUpdateVirtualMachineComponent } from './components/virtualMachine/create-update-virtual-machine/create-update-virtual-machine.component';
import { ListAppUpdaterConfigComponent } from './components/app-updater-config/list-app-updater-config/list-app-updater-config.component';
import { CreateUpdateAppUpdaterConfigComponent } from './components/app-updater-config/create-update-app-updater-config/create-update-app-updater-config.component';

const routes: Routes = [
  { path: 'virtualMachine/save', component: CreateUpdateVirtualMachineComponent },
  { path: 'virtualMachine/update/:name', component: CreateUpdateVirtualMachineComponent },
  { path: 'virtualMachine/delete', component: ListVirtualMachineComponent },
  { path: 'virtualMachine/list', component: ListVirtualMachineComponent },

  { path: 'app-updater-config/save', component: CreateUpdateAppUpdaterConfigComponent },
  { path: 'app-updater-config/update/:name', component: CreateUpdateAppUpdaterConfigComponent },
  { path: 'app-updater-config/delete', component: ListAppUpdaterConfigComponent },
  { path: 'app-updater-config/list', component: ListAppUpdaterConfigComponent },

  { path: '', component: ListAppUpdaterConfigComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
