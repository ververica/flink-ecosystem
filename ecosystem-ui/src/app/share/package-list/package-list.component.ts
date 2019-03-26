import { Component, Input } from '@angular/core';
import { PackageList } from 'src/app/interfaces/package-list';

@Component({
  selector: 'package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.scss'],
})
export class PackageListComponent {
  @Input() packages: PackageList;

  public getPackageLink(name: string): string {
    const link = name
      .toLowerCase()
      .split(' ')
      .join('-');

    return `/package/${link}`;
  }
}
