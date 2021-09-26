import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/Paginator';
import { MatSortModule } from '@angular/material/Sort';
import { MatInputModule } from '@angular/material/Input';
import { MatSelectModule } from '@angular/material/Select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule} from '@angular/material/chips'
import { MatAutocompleteModule} from '@angular/material/autocomplete'

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatDividerModule,
    MatTabsModule,
    MatChipsModule,
    MatAutocompleteModule
  ],
})
export class MaterialModule {}
