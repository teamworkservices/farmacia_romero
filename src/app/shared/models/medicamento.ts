import { Dosificacion } from "./dosificacion";
import { Laboratorio } from "./laboratorio";

export class Medicamento {
	id!: number;
	codigoCompra!: string;
	codigoBarra!: string;
	nombre!: string;
	cantidad!: number;
	precio!: number;
	laboratorio!: Laboratorio;
	dosificacion!: Dosificacion;

	public constructor(partial?: Partial<Medicamento>) {
		Object.assign(this, partial);
	}
}
