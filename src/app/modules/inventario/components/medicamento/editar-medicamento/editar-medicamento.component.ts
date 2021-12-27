import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Dosificacion } from "src/app/shared/models/dosificacion";
import { Laboratorio } from "src/app/shared/models/laboratorio";
import { Medicamento } from "src/app/shared/models/medicamento";
import Swal from "sweetalert2";
import { DosificacionService } from "../../../services/dosificacion.service";
import { LaboratorioService } from "../../../services/laboratorio.service";
import { MedicamentoService } from "../../../services/medicamento.service";

@Component({
	selector: "app-editar-medicamento",
	templateUrl: "./editar-medicamento.component.html",
	styleUrls: ["./editar-medicamento.component.css"],
})
export class EditarMedicamentoComponent implements OnInit {
	form: FormGroup;
	laboratorios: Laboratorio[] = [];
	dosificaciones: Dosificacion[] = [];

	constructor(
		private fb: FormBuilder,
		private medicamentoService: MedicamentoService,
		public laboratorioService: LaboratorioService,
		public dosificacionService: DosificacionService,
		public dialogRef: MatDialogRef<EditarMedicamentoComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Medicamento
	) {
		this.form = this.fb.group({
			nombreCtrl: [
				data.nombre,
				[Validators.required, Validators.maxLength(20)],
			],
			codigoCompraCtrl: [
				data.codigoCompra,
				[Validators.required, Validators.maxLength(4)],
			],
			codigoBarraCtrl: [
				data.codigoBarra,
				[Validators.required, Validators.maxLength(7)],
			],
			cantidadCtrl: [
				data.cantidad,
				[Validators.required, Validators.min(0), Validators.max(100)],
			],
			precioCtrl: [
				data.precio,
				[Validators.required, Validators.min(0), Validators.max(10000)],
			],
			laboratorioCtrl: ["", [Validators.required]],
			dosificacionCtrl: ["", [Validators.required]],
		});

		console.log(data);
	}

	ngOnInit(): void {
		this.loadOpcionesLaboratorio();
		this.loadOpcionesDosificacion();
	}

	loadOpcionesDosificacion() {
		this.laboratorios = this.laboratorioService.getLaboratorios();
	}

	loadOpcionesLaboratorio() {
		this.dosificaciones = this.dosificacionService.getDosificaciones();
	}

	editarMedicamento() {
		if (this.form.valid) {
			let medicamento = new Medicamento();
			medicamento.codigoCompra = this.form.value["codigoCompraCtrl"];
			medicamento.codigoBarra = this.form.value["codigoBarraCtrl"];
			medicamento.cantidad = this.form.value["cantidadCtrl"];
			medicamento.nombre = this.form.value["nombreCtrl"];
			medicamento.precio = this.form.value["precioCtrl"];
			medicamento.laboratorio = this.laboratorioService
				.getLaboratorios()
				.filter(
					(item) => item.id == this.form.value["laboratorioCtrl"]
				)[0];
			medicamento.dosificacion = this.dosificacionService
				.getDosificaciones()
				.filter(
					(item) => item.id == this.form.value["dosificacionCtrl"]
				)[0];

			Object.assign(
				medicamento,
				this.medicamentoService.editarMedicamento(medicamento)
			);
			this.dialogRef.close(medicamento);
		}
	}

	confirmModal() {
		Swal.fire({
			title: "Correcto",
			text: "Dosificación actualizada exitosamente!",
			icon: "success",
			showConfirmButton: false,
			timer: 2000,
		});
	}
}
