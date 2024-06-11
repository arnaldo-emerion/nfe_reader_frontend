import * as moment from "moment";

export class DataUtils {
  public static dateCompToDateInicial(dateComp) {
    return this.dateCompToDateOrDefault(dateComp, "1900-01-01");
  }

  public static dateCompToDateFinal(dateComp) {
    return this.dateCompToDateOrDefault(dateComp, "9999-12-30");
  }

  private static dateCompToDateOrDefault(dateComp, defaultDate) {
    let dataFormatada;
    if (dateComp._model.selection) {
      dataFormatada = moment(dateComp._model.selection.toJSON()).format(
        "yyyy-MM-DD"
      );
    } else {
      dataFormatada = defaultDate;
    }

    return dataFormatada;
  }
}
