import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Package } from 'src/app/interfaces/package';
import { PackageService } from 'src/app/services/package.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss'],
})
export class PackageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  package: Package = null;

  constructor(
    private packageService: PackageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.getPackage(data.package);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getPackage(name: string): void {
    this.packageService
      .getPackage(name)
      .subscribe(data => (this.package = data));
  }
}
