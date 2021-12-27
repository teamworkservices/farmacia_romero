import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Laboratorio } from "src/app/shared/models/laboratorio";

@Component({
	selector: "app-laboratorio",
	templateUrl: "./laboratorio.component.html",
	styleUrls: ["./laboratorio.component.css"],
})
export class LaboratorioComponent implements OnInit {
	laboratoriosData: Laboratorio[] = [];
	displayedColumns: string[] = ["id", "nombre", "codigo", "acciones"];

	dataSource!: MatTableDataSource<Laboratorio>;
	constructor() {}

	ngOnInit(): void {}
}
