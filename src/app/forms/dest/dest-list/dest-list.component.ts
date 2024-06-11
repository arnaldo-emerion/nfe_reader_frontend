import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSelect } from "@angular/material/select";
import { Router } from "@angular/router";
import { ESTADOS_ARRAY } from "app/arrays/estados.arrays";
import { of } from "rxjs";
import { tap } from "rxjs/operators";
import { DestService } from "../dest.service";

@Component({
  selector: "app-dest-list",
  templateUrl: "./dest-list.component.html",
  styleUrls: ["./dest-list.component.scss"],
})
export class DestListComponent implements OnInit {
  @ViewChild("estado") estado: MatSelect;
  @ViewChild("municipio") municipio: MatSelect;

  data$;
  itemSelecionado;
  municipioList;
  allData;

  estados = ESTADOS_ARRAY;

  displayedColumns = [
    { head: "Nome", el: "nome" },
    { head: "CNPJ", el: "cnpj", format: { tipo: "PIPE", pipe: "CNPJ" } },
    { head: "UF", el: "uf" },
    { head: "Município", el: "municipio" },
    {
      head: "Telefone",
      el: "telefone",
      format: { tipo: "TELEFONE" },
    },
  ];

  constructor(private router: Router, private service: DestService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.data$ = this.service.getCabecalho().pipe(
      tap((d) => {
        this.allData = d;
        this.fulfillMunicipioComboBox(d);
      })
    );
  }

  onRowSelect($event) {
    if (!$event) {
      return;
    }

    this.router.navigate(["destinatario/" + $event.id]);
  }

  executarAcao(acaoPropagate) {
    this.itemSelecionado = acaoPropagate.item;
    switch (acaoPropagate.acao) {
      case "add-new":
        this.router.navigate(["atividades/atividade/0"]);
        break;
    }
  }

  filtrarEstado(estado) {
    let filteredData: [];
    if (estado != "TODOS") {
      filteredData = this.allData.filter((item) => item.uf == estado);
    } else {
      filteredData = this.allData;
      this.municipio.value = "TODOS";
    }

    this.fulfillMunicipioComboBox(filteredData);
    this.data$ = of(filteredData);
  }

  filtrarMunicipio(municipio) {
    let filteredData: [];
    if (municipio != "TODOS") {
      filteredData = this.allData.filter((item) => item.municipio == municipio);
      this.data$ = of(filteredData);
    } else {
      this.filtrarEstado(this.estado.value);
    }
  }

  fulfillMunicipioComboBox(data: any[]) {
    let allMunicipios = data.map((i) => i.municipio);
    const mList = allMunicipios.filter((el, i, a) => i === a.indexOf(el));
    mList.sort();

    this.municipioList = mList;
  }
}
