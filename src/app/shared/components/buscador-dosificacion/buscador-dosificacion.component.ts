import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatInput } from "@angular/material/input";
import { DosificacionService } from "src/app/modules/inventario/services/dosificacion.service";
import { Dosificacion } from "../../models/dosificacion";

@Component({
	selector: "app-buscador-dosificacion",
	templateUrl: "./buscador-dosificacion.component.html",
	styleUrls: ["./buscador-dosificacion.component.css"],
})
export class BuscadorDosificacionComponent implements OnInit {
	listDosificacionesEncontrados: Dosificacion[];
	dosificacionForm: FormGroup;
	@Input() placeholderTitulo: String;
	@Output() dosificacionSeleccionada;

	constructor(
		private fb: FormBuilder,
		public dosificacionService: DosificacionService
	) {
		this.listDosificacionesEncontrados = [];
		this.dosificacionSeleccionada = new EventEmitter<Dosificacion>();
		this.placeholderTitulo = "";

		this.dosificacionForm = this.fb.group({
			dosificacionCtrl: ["", [Validators.required]],
		});
	}

	ngOnInit(): void {}

	getDosificaciones(event: Event) {
		const searchParam = (event.target as HTMLInputElement).value;
		this.listDosificacionesEncontrados =
			this.dosificacionService.getDosificacionesFilter(searchParam);
	}

	setDosificacionSeleccionado(dosificacion: Dosificacion) {
		this.dosificacionSeleccionada.emit(dosificacion);
		this.dosificacionForm.controls["dosificacionCtrl"].setValue(
			dosificacion.codigo + " - " + dosificacion.nombre
		);
	}
}
