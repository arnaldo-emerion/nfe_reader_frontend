import { CurrencyPipe, DecimalPipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({
  name: "pipeFormacaoColuna",
})
export class PipeFormacaoColunaPipe implements PipeTransform {
  constructor(
    private decimalPipe: DecimalPipe,
    private currencyPipe: CurrencyPipe
  ) {}

  transform(value: any, ...args: any[]): unknown {
    const formatacao = args[0];

    if (!!!value) {
      return;
    }
    switch (formatacao?.tipo) {
      case "DATE":
        value = moment(value).add(3, "hours").format("DD/MM/yyyy");
        break;
      case "DATE_TIME":
        value = moment(value).add(3, "hours").format("DD/MM/yyyy HH:MM:ss");
        break;
      case "TELEFONE":
        value = value.replace(/(\d{0,2})(\d{4,5})(\d{4})/, "($1) $2-$3");
        break;
      case "CEP":
        value = value.replace(/(\d{0,5})(\d{0,3})/, "$1-$2");
        break;
      case "PIPE": {
        switch (formatacao.pipe) {
          case "decimal":
            value = this.decimalPipe.transform(
              value,
              formatacao.arguments ? formatacao.arguments : "1.2-2"
            );
            break;
          case "currency":
            value = this.currencyPipe.transform(
              value,
              formatacao.arguments ? formatacao.arguments : ""
            );
            value = value.substring(0, 2) + "   " + value.substring(2);
            break;
          case "CNPJ":
            value = value
              .padStart(14, "0")
              .substr(0, 14)
              .replace(/[^0-9]/, "")
              .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
        }
        break;
      }
    }
    return value;
  }
}
