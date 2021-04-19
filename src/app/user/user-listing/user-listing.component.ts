import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Service } from 'src/app/service';

export interface userDetail {
  firstName: string;
  lastName: string;
  password: string | number;
}

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.scss']
})
export class UserListingComponent implements OnInit {
  selection!: SelectionModel<userDetail>;

  constructor(private service: Service) { }
  displayedColumns: string[] = ['firstName', 'lastName', 'email'];
  dataSource!: MatTableDataSource<userDetail>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.service.getUserDetail().subscribe((res: any) => {

      this.dataSource = new MatTableDataSource<userDetail>(res);
      this.dataSource.filter = 'user';
      this.selection = new SelectionModel<userDetail>(false, []);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    }
    );
  }

}
