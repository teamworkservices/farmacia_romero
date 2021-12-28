import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Medicamento } from "src/app/shared/models/medicamento";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CrearMedicamentoComponent } from "./crear-medicamento/crear-medicamento.component";
import { MedicamentoService } from "../../services/medicamento.service";
import { EditarMedicamentoComponent } from "./editar-medicamento/editar-medicamento.component";
import Swal from "sweetalert2";

@Component({
	selector: "app-medicamento",
	templateUrl: "./medicamento.component.html",
	styleUrls: ["./medicamento.component.css"],
})
export class MedicamentoComponent implements OnInit {
	medicamentosData: Medicamento[] = [];
	displayedColumns: string[] = [
		"id",
		"codigoCompra",
		"codigoBarra",
		"nombre",
		"cantidad",
		"precio",
		"laboratorio",
		"dosificacion",
		"acciones",
	];

	dataSource!: MatTableDataSource<Medicamento>;

	constructor(
		public dialog: MatDialog,
		public medicamentoService: MedicamentoService
	) {}

	ngOnInit(): void {
		this.loadTableMedicamento();
	}

	openCreateDialog() {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.width = "50%";
		dialogConfig.panelClass = "dialog-custom";
		const dialogRef = this.dialog.open(
			CrearMedicamentoComponent,
			dialogConfig
		);
		dialogRef.afterClosed().subscribe((result) => {
			if (!!result) {
				this.loadMedicamento();
				this.loadTableMedicamento();
			}
		});
	}

	openEditDialog(medicamento: Medicamento) {
		const dialogRef = this.dialog.open(EditarMedicamentoComponent, {
			width: "50%",
			data: medicamento,
			panelClass: "dialog-custom",
		});
		dialogRef.afterClosed().subscribe((result) => {
			if (!!result) {
				this.loadMedicamento();
				this.loadTableMedicamento();
			}
		});
	}

	loadMedicamento() {
		return this.medicamentoService.getMedicamentos();
	}

	loadTableMedicamento() {
		this.dataSource = new MatTableDataSource<Medicamento>([]);
		this.dataSource.data = this.loadMedicamento();
	}

	eliminarMedicamento(medicamento: Medicamento) {
		Swal.fire({
			title: "¿Deseas eliminar el medicamento?",
			showCancelButton: true,
			confirmButtonText: "Eliminar",
		}).then((result) => {
			if (result.isConfirmed) {
				this.medicamentoService.eliminarMedicamento(medicamento.id);
				this.loadTableMedicamento();
				Swal.fire("Saved!", "", "success");
			}
		});
	}
}
