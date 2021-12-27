import { Injectable } from "@angular/core";
import { Laboratorio } from "src/app/shared/models/laboratorio";

@Injectable({
	providedIn: "root",
})
export class LaboratorioService {
	laboratorioData: Laboratorio[] = [
		{ id: 1, nombre: "GamaNuclear", codigo: "455" },
		{ id: 2, nombre: "Ciaepe", codigo: "651" },
		{ id: 3, nombre: "Optica", codigo: "648" },
	];

	constructor() {}

	//getLaboratorios(): Observable<Laboratorio[]> {
	getLaboratorios(): Laboratorio[] {
		//return this.http.get<Laboratorio[]>(environment.urlServer+'laboratorio/listar');
		return this.laboratorioData;
	}

	//agregarLaboratorio(laboratorio: Laboratorio):Observable<Laboratorio> {
	agregarLaboratorio(laboratorio: Laboratorio): Laboratorio {
		//return this.http.post<Laboratorio>(environment.urlServer+'laboratorio/agregar', laboratorio);
		laboratorio.id = this.laboratorioData.length + 1;
		this.laboratorioData.push(laboratorio);
		return laboratorio;
	}

	editarLaboratorio(laboratorio: Laboratorio): Laboratorio {
		let indexLaboratorio = this.laboratorioData.findIndex(
			(item) => item.id == laboratorio.id
		);
		Object.assign(this.laboratorioData[indexLaboratorio], laboratorio);
		return laboratorio;
	}

	eliminarLaboratorio(id: number) {
		this.laboratorioData = this.laboratorioData.filter(
			(item) => item.id != id
		);
	}
}
