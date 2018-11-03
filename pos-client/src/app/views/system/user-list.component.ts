import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpConnectService } from '../../service/connect.service';
import { Internal_connect_Service } from '../../service/internal_connect.service';

@Component({
    selector: 'app-user-list',
    template: `
<div class="animated fadeIn">
	<div class="card">
		<div class="card-header">User List</div>
		<div class="card-body">
				<form class="form-horizontal">
					<div style="margin-bottom: 11px;">
						<button (click)="new()" class="btn btn-cus btn-sm btn-primary">New</button>
						<button (click)="search()" class="btn btn-cus btn-sm btn-success">Search</button>
					</div>
					<div class="table-responsive">
					<table class="table">
						<thead class="thead-light">
							<tr>
								<th>User Id</th>
								<th>USer Name</th>
								<th>Email</th>
								<th>Address</th>
							</tr>
						</thead>
						<tbody>
							<tr *ngFor="let data of obj_list">
								<td><a (click)="read(data.syskey)">{{data.userId}}</a></td>
								<td>{{data.userName}}</td>
								<td>{{data.s3}}</td>
								<td>{{data.s6}}</td>
						  </tr>
						</tbody>
					</table>
					</div>
				</form>
		</div>
	</div>
</div>
  `
})
export class UserListComponent {

	src_obj;
	obj_list = [];
	constructor(private incs: Internal_connect_Service, private http: HttpConnectService, private router: Router) {
		this.src_obj = this.getDefaultObj();
		this.search();
	}

	new() {
		this.router.navigate(['system/user']);
	}

	search() {
		let url: string = this.incs._apiurl + 'user/list';
		console.log("HELLO " + JSON.stringify(this.src_obj), " URL " + url);
		if (true) {
			this.http.doPost(url, this.src_obj).subscribe(
				data => {
					this.obj_list = data.responseData.userdatalist;
					console.log("DATA " + JSON.stringify(data));
				});
		}
	}

	read(d) {
		console.log("READ ", d);
		this.router.navigate(['system/user', d]);
	}

	getDefaultObj() {
		return { "code": "", "description": "", "currentPage": 1, "pageSize": 10 }
	}

}