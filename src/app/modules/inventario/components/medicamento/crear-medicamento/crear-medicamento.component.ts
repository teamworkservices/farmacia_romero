import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Dosificacion } from "src/app/shared/models/dosificacion";
import { Laboratorio } from "src/app/shared/models/laboratorio";
import { Medicamento } from "src/app/shared/models/medicamento";
import Swal from "sweetalert2";
import { DosificacionService } from "../../../services/dosificacion.service";
import { MedicamentoService } from "../../../services/medicamento.service";
import { LaboratorioService } from "../../../services/laboratorio.service";

@Component({
	selector: "app-crear-medicamento",
	templateUrl: "./crear-medicamento.component.html",
	styleUrls: ["./crear-medicamento.component.css"],
})
export class CrearMedicamentoComponent implements OnInit {
	form: FormGroup;
	laboratorios: Laboratorio[] = [];
	dosificaciones: Dosificacion[] = [];

	constructor(
		private fb: FormBuilder,
		private medicamentoService: MedicamentoService,
		public laboratorioService: LaboratorioService,
		public dosificacionService: DosificacionService,
		public dialogRef: MatDialogRef<CrearMedicamentoComponent>
	) {
		this.form = this.fb.group({
			nombreCtrl: ["", [Validators.required, Validators.maxLength(20)]],
			codigoCompraCtrl: [
				"",
				[Validators.required, Validators.maxLength(4)],
			],
			codigoBarraCtrl: [
				"",
				[Validators.required, Validators.maxLength(7)],
			],
			cantidadCtrl: [
				"",
				[Validators.required, Validators.min(0), Validators.max(100)],
			],
			precioCtrl: [
				"",
				[Validators.required, Validators.min(0), Validators.max(10000)],
			],
			laboratorioCtrl: ["", [Validators.required]],
			dosificacionCtrl: ["", [Validators.required]],
		});
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

	agregarMedicamento() {
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
			medicamento.dosificacion = medicamento.dosificacion =
				this.dosificacionService
					.getDosificaciones()
					.filter(
						(item) => item.id == this.form.value["dosificacionCtrl"]
					)[0];

			medicamento =
				this.medicamentoService.agregarMedicamento(medicamento);
			this.dialogRef.close(medicamento);
		}
	}

	confirmModal() {
		Swal.fire({
			title: "Correcto",
			text: "Medicamento agregado exitosamente!",
			icon: "success",
			showConfirmButton: false,
			timer: 2000,
		});
	}
}
