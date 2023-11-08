import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';
import { LayoutModalComponent } from './components/layout-modal/layout-modal.component';



@NgModule({
  declarations: [
    LayoutComponent,
    FooterComponent,
    HeaderComponent,
    FilterPipe,
    LayoutModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    LayoutComponent,
    FooterComponent,
    HeaderComponent,
    FilterPipe,
    LayoutModalComponent
  ]
})
export class SharedModule { }
