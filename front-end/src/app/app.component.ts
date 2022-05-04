import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end';

  userToUpdate = {
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    gender: ""
  }

  userToDelete = {
    id: "",
    first_name: "",
    last_name: ""
  }

  userShown: boolean = false;

  public addUserForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required])
  })

  public updateUserForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required])
  })

  users: User[];
    
  shown:boolean = false;

  closeResult = '';
  
  constructor(private userService: UserService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
      console.log(data);
    });
  }

  toggle() {
    this.shown = !this.shown;
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  loadUserToUpdate(user: User) {
    this.userToUpdate = user;

    this.updateUserForm.get("id")!.setValue(this.userToUpdate.id);
    this.updateUserForm.get("first_name")!.setValue(this.userToUpdate.first_name);
    this.updateUserForm.get("last_name")!.setValue(this.userToUpdate.last_name);
    this.updateUserForm.get("email")!.setValue(this.userToUpdate.email);
    this.updateUserForm.get("password")!.setValue(this.userToUpdate.password);
    this.updateUserForm.get("gender")!.setValue(this.userToUpdate.gender);
  }

  loadUserToDelete(user: User) {
    this.userToDelete = user;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public addUser() {
    let user = new User();

    user.id = this.addUserForm.get("id")!.value;
    user.first_name = this.addUserForm.get("first_name")!.value;
    user.last_name = this.addUserForm.get("last_name")!.value;
    user.email = this.addUserForm.get("email")!.value;
    user.password = this.addUserForm.get("password")!.value;
    user.gender = this.addUserForm.get("gender")!.value;

    this.userService.addUser(user).subscribe(data => {
      this.addUserForm.reset();
      this.ngOnInit();
    }, err => {
      alert("Error");
    })
  }

  public updateUser() {
    let user = new User();

    let idToUpdate = this.userToUpdate.id;

    user.id = this.updateUserForm.get("id")!.value;
    user.first_name = this.updateUserForm.get("first_name")!.value;
    user.last_name = this.updateUserForm.get("last_name")!.value;
    user.email = this.updateUserForm.get("email")!.value;
    user.password = this.updateUserForm.get("password")!.value;
    user.gender = this.updateUserForm.get("gender")!.value;

    this.userService.updateUser(idToUpdate, user).subscribe(data => {
      this.updateUserForm.reset();
      this.ngOnInit();
    }, err => {
      alert("Error");
    })
  }

  public deleteUser() {
    let ID = this.userToDelete.id;
    this.userService.deleteUser(ID).subscribe(data => {
      this.ngOnInit();
    }, err => {
      alert("Error");
    })
  }

  public showUser() {
    this.userShown = !this.userShown;
  }
}
