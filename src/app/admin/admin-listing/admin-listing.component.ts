import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogboxComponent } from 'src/app/dialogbox/dialogbox.component';
import { Service } from 'src/app/service';

export interface UserDetail {
  userType: string;
  firstName: string;
  lastName: string;
  email: string;
}
@Component({
  selector: 'app-admin-listing',
  templateUrl: './admin-listing.component.html',
  styleUrls: ['./admin-listing.component.scss']
})
export class AdminListingComponent implements OnInit {

  constructor(private service: Service, private dialog: MatDialog, private router: Router) { }

  displayedColumns: string[] = ['userType', 'firstName', 'lastName', 'email', 'edit', 'delete'];

  dataSource!: MatTableDataSource<UserDetail>;
  selection!: SelectionModel<UserDetail>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.service.getUserDetail().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource<UserDetail>(res);
      this.selection = new SelectionModel<UserDetail>(false, []);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  deleteUser(id: number) {
    const dialogRef = this.dialog.open(DialogboxComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.service.deleteUser(id).subscribe((res) => {
          console.log(res);
          this.RefreshPage();
          
        });
      }
    });
  }
  RefreshPage(){
    setTimeout(() => { this.ngOnInit(); }, 1000);
  }
}
