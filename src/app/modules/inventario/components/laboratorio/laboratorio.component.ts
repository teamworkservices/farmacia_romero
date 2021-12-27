import { AfterViewInit, Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Laboratorio } from "src/app/shared/models/laboratorio";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CrearLaboratorioComponent } from "./crear-laboratorio/crear-laboratorio.component";
import { LaboratorioService } from "../../services/laboratorio.service";
import { EditarLaboratorioComponent } from "./editar-laboratorio/editar-laboratorio.component";
import Swal from "sweetalert2";

@Component({
	selector: "app-laboratorio",
	templateUrl: "./laboratorio.component.html",
	styleUrls: ["./laboratorio.component.css"],
})
export class LaboratorioComponent implements OnInit {
	laboratoriosData: Laboratorio[] = [];
	displayedColumns: string[] = ["id", "nombre", "codigo", "acciones"];

	dataSource!: MatTableDataSource<Laboratorio>;

	constructor(
		public dialog: MatDialog,
		public laboratorioService: LaboratorioService
	) {}

	ngOnInit(): void {
		this.loadTableLaboratorio();
	}

	openCreateDialog() {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.width = "50%";
		dialogConfig.panelClass = "dialog-custom";
		const dialogRef = this.dialog.open(
			CrearLaboratorioComponent,
			dialogConfig
		);
		dialogRef.afterClosed().subscribe((result) => {
			if (!!result) {
				this.loadLaboratorio();
				this.loadTableLaboratorio();
			}
		});
	}

	openEditDialog(laboratorio: Laboratorio) {
		const dialogRef = this.dialog.open(EditarLaboratorioComponent, {
			width: "50%",
			data: laboratorio,
			panelClass: "dialog-custom",
		});
		dialogRef.afterClosed().subscribe((result) => {
			if (!!result) {
				this.loadLaboratorio();
				this.loadTableLaboratorio();
			}
		});
	}

	loadLaboratorio() {
		return this.laboratorioService.getLaboratorios();
	}

	loadTableLaboratorio() {
		this.dataSource = new MatTableDataSource<Laboratorio>([]);
		this.dataSource.data = this.loadLaboratorio();
	}

	eliminarLaboratorio(laboratorio: Laboratorio) {
		Swal.fire({
			title: "¿Deseas eliminar el laboratorio?",
			showCancelButton: true,
			confirmButtonText: "Eliminar",
		}).then((result) => {
			if (result.isConfirmed) {
				this.laboratorioService.eliminarLaboratorio(laboratorio.id);
				this.loadTableLaboratorio();
				Swal.fire("Saved!", "", "success");
			}
		});
	}
}
