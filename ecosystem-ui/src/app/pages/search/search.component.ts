import { Component, OnInit, OnDestroy } from '@angular/core';
import { PackagesService } from 'src/app/services/packages.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Package } from 'src/app/interfaces/package';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  packages: Package[] = [];
  query: string = '';

  constructor(
    private packagesService: PackagesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ query }) => {
        this.getSearchPackages(query);
        this.query = query;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getSearchPackages(query: string): void {
    this.packagesService
      .getSearchPackages(query)
      .subscribe(data => (this.packages = data.items || []));
  }
}
