import { LiveAnnouncer } from "@angular/cdk/a11y";
import { SelectionModel } from "@angular/cdk/collections";
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import * as XLSX from "xlsx";

@Component({
  selector: "app-tabela",
  templateUrl: "./tabela.component.html",
  styleUrls: ["./tabela.component.css"],
})
export class TabelaComponent
  implements OnInit, AfterContentInit, AfterViewInit, OnChanges
{
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() headerTitle = "Listagem Generica.";
  @Input() displayedColumns = [];
  @Input() pageSizeOptions = [10, 20, 30, 50];
  @Input() dados;
  @Input() showHeader = true;
  @Input() showAddButtom = false;
  @Input() showFilter = true;
  @Input() marginTop = true;
  @Input() showSelect = false;
  @Input() marginTopClass = "";
  @Output() exportToExcelFunc = new EventEmitter();

  @Output() selectedRow = new EventEmitter();
  @Output() acaoSelecionada = new EventEmitter();
  @Output() filteredResults = new EventEmitter();

  @Output() selection = new SelectionModel<any>(true, []);
  datasource;
  cols = [];
  selectedRowIndex = -1;

  constructor(private _liveAnnouncer: LiveAnnouncer) {
    this.datasource = new MatTableDataSource<any>([]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dados) {
      if (this.datasource) {
        this.inicializarTabela(changes.dados.currentValue);
      }
    }
  }
  ngAfterViewInit(): void {
    this.datasource.sort = this.sort;
  }

  ngAfterContentInit(): void {
    this.inicializarTabela(this.dados);
  }

  inicializarTabela(data) {
    this.datasource.data = data;
    this.datasource.paginator = this.paginator;

    this.cols = this.displayedColumns.map((el) => el.el);

    this.cols.unshift("select");
  }

  ngOnInit(): void {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();

    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
    this.selectedRowIndex = -1;
    this.selectedRow.emit(null);
    this.filteredResults.emit(this.datasource.filteredData);
  }

  highlight(row) {
    let newIndex = row[this.displayedColumns[0].el];
    if (newIndex == this.selectedRowIndex) {
      this.selectedRowIndex = -1;
    } else {
      this.selectedRowIndex = newIndex;
    }

    this.selectedRow.emit(row);
  }

  propagate(acao, item) {
    this.selectedRowIndex = -1;
    event.stopImmediatePropagation();
    this.acaoSelecionada.emit({ acao, item });
  }

  evaluateExpression(element, expression) {
    if (!expression) {
      return true;
    }
    return eval(expression);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.datasource.filteredData.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.datasource.filteredData);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? "deselect" : "select"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.position + 1
    }`;
  }

  exportArrayToExcel() {
    if (this.exportToExcelFunc && this.exportToExcelFunc?.observers.length > 0) {
      this.exportToExcelFunc.emit(this.selection.selected);
      return;
    }
    let { sheetName, fileName } = this.getFileName(name);
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(this.selection.selected);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  exportArrayToExcelWithArray(fileName: string) {
    var export1 = XLSX.utils.json_to_sheet([]);
    var wb = XLSX.utils.book_new(); // make Workbook of Excel
    // add Worksheet to Workbook
    XLSX.utils.book_append_sheet(wb, export1, "sheet1"); // sheet1 is name of Worksheet

    let index = 3;
    this.selection.selected.forEach((item) => {
      XLSX.utils.sheet_add_json(wb.Sheets.sheet1, [item], {
        origin: "A" + index,
      });
      index++;

      const props = Object.keys(item);

      props.forEach((p: any) => {
        if (this.isArray(item[p])) {
          index++;
          const itemObj = item[p];
          itemObj.forEach((i) => {
            XLSX.utils.sheet_add_json(wb.Sheets.sheet1, [i], {
              header: ["note"],
              skipHeader: true,
              origin: "B" + index,
            });
            index++;
          });
        }
      });
    });

    // export Excel file
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  getFileName(name) {
    return {
      sheetName: "dadosExportados",
      fileName: "dadosExportados",
    };
  }

  isArray(obj: Object): boolean {
    return obj instanceof Array;
  }
}
