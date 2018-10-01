import { Component, OnInit } from '@angular/core';
import { CompanyDependentService, ShellStateService } from '@primavera/ngcore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    protected companyDependentService: CompanyDependentService,
    protected shellStateService: ShellStateService) {
  }

  countCompanies: number = 0;

  ngOnInit() {
    this.companyDependentService.getCompaniesCount().subscribe(companiesCount => {
      this.countCompanies = companiesCount;
    });
  }
}
