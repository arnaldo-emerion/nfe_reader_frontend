import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { ThemePalette } from "@angular/material/core";
import { MatTableDataSource } from "@angular/material/table";
import { NotificationService } from "app/shared/notification/notification.service";
import { ConfUserService } from "./conf-user.service";
import { Observable } from "rxjs";
import { EmitenteService } from "app/services/loading-service.ts/emitente-service";
import { tap } from "rxjs/operators";

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: "app-conf-user",
  templateUrl: "./conf-user.component.html",
  styleUrls: ["./conf-user.component.css"],
})
export class ConfUserComponent implements OnInit {
  formulario: UntypedFormGroup;
  userConf;
  parametrosNatOperacao: any[];
  selectedNatOperacaoParam;
  editing = false;
  emitenteData$: Observable<any>;
  selectedCNPJ = null;

  confNatOperacaoDataSource;
  displayedColumns: string[] = ["name", "active", "actions"];

  task: Task = {
    name: "Naturezas de Operação à se considerar nas análises",
    completed: false,
    color: "primary",
    subtasks: [],
  };

  confName;
  isConfActive;

  allComplete: boolean = false;

  constructor(
    private location: Location,
    private confUserService: ConfUserService,
    private notificationService: NotificationService,
    private emitenteService: EmitenteService,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.emitenteData$ = this.emitenteService.getAll()
    this.confUserService.getUserConfiguration().subscribe((d) => {
      this.parametrosNatOperacao = d.parametroNatOperacaoList;

      this.parametrosNatOperacao.sort((obj1, obj2) => {
        if (obj1.name > obj2.name) {
          return 1;
        } else if (obj1.name < obj2.name) {
          return -1;
        } else {
          return 0;
        }
      });

      this.confNatOperacaoDataSource = new MatTableDataSource(
        d.parametroNatOperacaoList
      );

      this.userConf = d;

      this.loadActiveConf();
    });
  }

  loadActiveConf() {
    const activeConf = this.userConf.parametroNatOperacaoList.find(
      (c) => c.active == true
    );
    if (activeConf) {
      this.loadConfNatOperacao(activeConf.id, activeConf);
    } else {
      this.loadConfNatOperacao(0, {
        active: "",
        name: "",
        nfeProcessaveisList: [],
      });
      this.newConf();
    }
  }

  loadConfNatOperacao(index, config) {
    this.confUserService.getTipoNFeDisponiveisList().subscribe((data) => {
      const map = data.map((d) => {
        return {
          name: d,
          completed: config.nfeProcessaveisList.includes(d),
          color: "primary",
        };
      });
      this.isConfActive = config.active;
      this.confName = config.name;
      this.task.subtasks = map;
      this.selectedRowIndex = index;

      this.selectedNatOperacaoParam = config;

      this.updateAllComplete();
    });
  }

  saveConfig() {
    console.log("Selected CNPJ: " + this.selectedCNPJ)
    if (this.isConfActive) {
      this.parametrosNatOperacao.forEach((e) => {
        e.active = false;
      });
    }

    const nfeProcessaveis = this.task.subtasks
      .filter((i) => i.completed)
      .map((item) => item.name);

    const arrayToPersist = [
      {
        id: this.selectedNatOperacaoParam?.id,
        nfeProcessaveisList: nfeProcessaveis,
        name: this.confName,
        cpfCnpj: this.selectedCNPJ,
        active: this.isConfActive,
      },
    ];

    const confToPersist = this.parametrosNatOperacao
      .filter((i) => i.id != null)
      .map((obj) => arrayToPersist.find((o) => o.id === obj.id) || obj);

    if (!this.selectedNatOperacaoParam?.id) {
      confToPersist.push(...arrayToPersist);
    }

    const objToPersist = {
      id: this.userConf?.id,
      parametroNatOperacaoList: confToPersist,
    };

    this.confUserService
      .saveUserConfiguration(objToPersist)
      .subscribe((data) => {
        this.loadData();
        this.notificationService.showSucess("Configurações salvas com sucesso");
      });
  }

  voltar() {
    this.location.back();
  }

  updateAllComplete() {
    this.allComplete =
      this.task.subtasks != null &&
      this.task.subtasks.every((t) => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return (
      this.task.subtasks.filter((t) => t.completed).length > 0 &&
      !this.allComplete
    );
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach((t) => (t.completed = completed));
  }

  newConf() {
    this.selectedNatOperacaoParam = null;
    this.setAll(false);
    this.confName = "";
    this.isConfActive = false;
    this.editing = true;
  }

  cancelNewConf() {
    this.loadData();
  }

  selectedRowIndex;
  highlight(row) {
    let newIndex = row.id;
    if (newIndex == this.selectedRowIndex) {
      this.selectedRowIndex = -1;
    } else {
      this.selectedRowIndex = newIndex;
      this.loadConfNatOperacao(newIndex, row);
    }
  }

  ativar(item) {
    this.parametrosNatOperacao.forEach((e) => {
      e.active = false;
    });

    const arrayToPersist = [
      {
        id: item.id,
        nfeProcessaveisList: item.nfeProcessaveisList,
        name: item.name,
        active: true,
      },
    ];

    const confToPersist = this.parametrosNatOperacao
      .filter((i) => i.id != null)
      .map((obj) => arrayToPersist.find((o) => o.id === obj.id) || obj);

    const objToPersist = {
      id: this.userConf?.id,
      parametroNatOperacaoList: confToPersist,
    };

    this.confUserService
      .saveUserConfiguration(objToPersist)
      .subscribe((data) => {
        this.loadData();
        this.notificationService.showSucess("Configurações salvas com sucesso");
      });
  }

  remove(item) {
    const indexToRemove = this.parametrosNatOperacao.indexOf(item);
    this.parametrosNatOperacao.splice(indexToRemove, 1);

    const objToPersist = {
      id: this.userConf?.id,
      parametroNatOperacaoList: this.parametrosNatOperacao,
    };

    this.confUserService
      .saveUserConfiguration(objToPersist)
      .subscribe((data) => {
        this.loadData();
        this.notificationService.showSucess("Configurações salvas com sucesso");
      });
  }
}
