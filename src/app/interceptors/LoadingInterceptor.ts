import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, finalize } from "rxjs/operators";
import { LoadingService } from "../services/loading-service.ts/loading-service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (
      !request.url.includes("get-status") &&
      !request.url.includes("status-processamento")
    ) {
      this.totalRequests++;
      setTimeout(() => {
        this.loadingService.setLoading(true);
      }, 0);
    }

    return next.handle(request).pipe(
      delay(100),
      finalize(() => {
        if (
          !request.url.includes("get-status") &&
          !request.url.includes("status-processamento")
        ) {
          this.totalRequests--;
        }

        if (this.totalRequests <= 0) {
          this.loadingService.setLoading(false);
        }
      })
    );
  }
}
