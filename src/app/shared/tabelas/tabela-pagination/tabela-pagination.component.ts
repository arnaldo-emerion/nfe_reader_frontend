import { LiveAnnouncer } from "@angular/cdk/a11y";
import { SelectionModel } from "@angular/cdk/collections";
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { merge, of } from "rxjs";
import { catchError, map, startWith, switchMap } from "rxjs/operators";

@Component({
  selector: "app-tabela-pagination",
  templateUrl: "./tabela-pagination.component.html",
  styleUrls: ["./tabela-pagination.component.css"],
})
export class TabelaPaginationComponent
  implements OnInit, AfterContentInit, AfterViewInit, OnChanges
{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() headerTitle = "Listagem Generica.";
  @Input() displayedColumns = [];
  @Input() pageSizeOptions = [10, 20, 30, 50];
  @Input() dados;
  @Input() showHeader = true;
  @Input() marginTop = true;
  @Input() showSelect = false;
  @Input() service;
  @Input() marginTopClass = "";

  selection = new SelectionModel<any>(true, []);
  datasource;
  cols = [];
  selectedRowIndex = -1;

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dados) {
      if (this.datasource) {
        this.inicializarTabela(changes.dados.currentValue);
      }
    }
  }

  resultsLength = 0;

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.service
            .buscaPaginada(this.paginator.pageSize, this.paginator.pageIndex)
            .pipe(catchError(() => of(null)));
        }),
        map((data: any) => {
          if (data === null) {
            return [];
          }
          this.resultsLength = data.totalElements;
          return data.content;
        })
      )
      .subscribe((data) => {
        this.inicializarTabela(data);
      });
  }

  ngAfterContentInit(): void {
    this.inicializarTabela(this.dados);
  }

  inicializarTabela(data) {
    this.datasource = data;
    this.cols = this.displayedColumns.map((el) => el.el);
  }

  ngOnInit(): void {}

  applyFilter(event: Event) {}

  isAllSelected() {}

  masterToggle() {}

  checkboxLabel(row?: any) {}
}
