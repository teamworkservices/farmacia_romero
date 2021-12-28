import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		MatGridListModule,
		MatIconModule,
		MatTabsModule,
		MatToolbarModule,
		MatTableModule,
		MatDialogModule,
		FormsModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatInputModule,
		MatSelectModule,
	],
	exports: [
		MatGridListModule,
		MatIconModule,
		MatTabsModule,
		MatToolbarModule,
		MatTableModule,
		MatDialogModule,
		FormsModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatInputModule,
		MatSelectModule,
	],
})
export class SharedModule {}
