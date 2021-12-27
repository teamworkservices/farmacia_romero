import { Injectable } from "@angular/core";
import { Medicamento } from "src/app/shared/models/medicamento";

@Injectable({
	providedIn: "root",
})
export class MedicamentoService {
	medicamentoData: Medicamento[] = [
		{
			id: 1,
			codigoCompra: "3734",
			codigoBarra: "4rfdfgh",
			nombre: "Acetaminofen",
			cantidad: 60,
			precio: 2500,
			laboratorio: { id: 1, nombre: "GamaNuclear", codigo: "455" },
			dosificacion: {
				id: 1,
				nombre: "Hydrogen",
				descripcion: "Descripcion",
				codigo: "H",
			},
		},
		{
			id: 2,
			codigoCompra: "2347",
			codigoBarra: "jnterff",
			nombre: "Omeprazol",
			cantidad: 90,
			precio: 1800,
			laboratorio: { id: 2, nombre: "Ciaepe", codigo: "651" },
			dosificacion: {
				id: 1,
				nombre: "Hydrogen",
				descripcion: "Descripcion",
				codigo: "H",
			},
		},
		{
			id: 3,
			codigoCompra: "7987",
			codigoBarra: "45gfdtd",
			nombre: "Ranitidina",
			cantidad: 120,
			precio: 250,
			laboratorio: { id: 3, nombre: "Optica", codigo: "648" },
			dosificacion: {
				id: 3,
				nombre: "Hogen",
				descripcion: "kjksss",
				codigo: "H",
			},
		},
	];

	constructor() {}

	//getMedicamentos(): Observable<Medicamento[]> {
	getMedicamentos(): Medicamento[] {
		//return this.http.get<Medicamento[]>(environment.urlServer+'medicamento/listar');
		return this.medicamentoData;
	}

	//agregarMedicamento(medicamento: Medicamento):Observable<Medicamento> {
	agregarMedicamento(medicamento: Medicamento): Medicamento {
		//return this.http.post<Medicamento>(environment.urlServer+'medicamento/agregar', medicamento);
		medicamento.id = this.medicamentoData.length + 1;
		this.medicamentoData.push(medicamento);
		return medicamento;
	}

	editarMedicamento(medicamento: Medicamento): Medicamento {
		let indexMedicamento = this.medicamentoData.findIndex(
			(item) => item.id == medicamento.id
		);
		Object.assign(this.medicamentoData[indexMedicamento], medicamento);
		return medicamento;
	}

	eliminarMedicamento(id: number) {
		this.medicamentoData = this.medicamentoData.filter(
			(item) => item.id != id
		);
	}
}
