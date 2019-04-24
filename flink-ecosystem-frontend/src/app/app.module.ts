import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PackagesComponent } from './pages/packages/packages.component';
import { PackageComponent } from './pages/package/package.component';
import { SearchComponent } from './pages/search/search.component';
import { PackageListComponent } from './share/package-list/package-list.component';
import { SidebarComponent } from './share/sidebar/sidebar.component';
import { GuideComponent } from './pages/guide/guide.component';
import { PageContentComponent } from './share/page-content/page-content.component';

@NgModule({
  declarations: [
    AppComponent,
    PackagesComponent,
    PackageComponent,
    SearchComponent,
    PackageListComponent,
    SidebarComponent,
    GuideComponent,
    PageContentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
