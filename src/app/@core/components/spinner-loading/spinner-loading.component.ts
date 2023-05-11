import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-spinner-loading',
  templateUrl: './spinner-loading.component.html',
  styleUrls: ['./spinner-loading.component.scss']
})
export class SpinnerLoadingComponent implements OnInit {

  showSpinner = false;
  private timerWait: any;
  constructor(
    private router: Router,
    private spinnerService: SpinnerService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.initFunction();
  }

  ngOnInit(): void {
  }

  initFunction() {
    // this.timerWait = timer(5000); // 5 seconds
    this.spinnerService.getSpinnerObserver().subscribe((status: any) => {
      this.showSpinner = (status === 'start');
      // this.changeDetector.detectChanges();
    });
  }

}
