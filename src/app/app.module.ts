import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorHandler, Injector, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { AmplifyAuthenticatorModule } from "@aws-amplify/ui-angular";
import Amplify from "aws-amplify";
import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PieController,
  PointElement,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { ToastrModule } from "ngx-toastr";
import awsmobile from "../aws-exports";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AnaliseQualitativaModule } from "./forms/analise/analise-qualitativa/analise-qualitativa.module";
import { DestModule } from "./forms/dest/dest.module";
import { FormulariosModule } from "./forms/forms.module";
import { NfeModule } from "./forms/nfe/nfe.module";
import { GlobalErrorHandler } from "./interceptors/error.handler";
import { LoadingInterceptor } from "./interceptors/LoadingInterceptor";
import { RequestInterceptor } from "./interceptors/request.interceptor.service";
import { LoadingService } from "./services/loading-service.ts/loading-service";
import { ServiceLocator } from "./services/service.locator";

Amplify.configure(awsmobile);

Chart.register(
  BarController,
  BarElement,
  PieController,
  LineController,
  PointElement,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels
);

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AmplifyAuthenticatorModule,
    ToastrModule.forRoot(),

    CommonModule,
    FormulariosModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    NfeModule,
    AnaliseQualitativaModule,
    DestModule,
    FormsModule,
  ],
  declarations: [AppComponent, DashboardComponent],
  providers: [
    LoadingService,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    Chart.defaults.plugins.datalabels.display = false;
    ServiceLocator.injector = this.injector;
  }
}
