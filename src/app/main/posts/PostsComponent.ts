import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInterface } from '../../interfaces/user.interface';
import { BodyInterface } from '../../interfaces/title.body.interface';
import { ApiGetpostService } from 'src/app/api-services/api.getpost.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  isActive = false;
  toggleActive() {
    this.isActive = !this.isActive;
  }

  users!: UserInterface[];
  bodyComment!: BodyInterface[];

  AddUserComment: FormGroup;
  constructor(
    private fb: FormBuilder,
    private apiGetPostService: ApiGetpostService,
    private router: Router
  ) {
    this.AddUserComment = this.fb.group({
      authorsName: ['', [Validators.required]],
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.apiGetPostService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
    this.apiGetPostService.getAllBody().subscribe((bodyComment) => {
      this.bodyComment = bodyComment;
    });
  }
  //pick up users
  getUserName(userId: number) {
    let user = this.users?.find((user) => user.id === userId);
    return user ? user.name : '';
  }

  goToLocalComment(postId: number): void {
    this.router.navigate(['/posts', postId]);
  }
  // form submit
  onSubmit(userFormValue: any) {
    this.users = [
      {
        id: this.bodyComment.length + 1,
        name: userFormValue.authorsName,
        username: '',
      },
      ...this.users,
    ];
    this.bodyComment = [
      {
        userId: this.bodyComment.length + 1,
        id: this.bodyComment.length + 1,
        title: userFormValue.title,
        body: userFormValue.body,
      },
      ...this.bodyComment,
    ];
  }
  get formAuthor() {
    return this.AddUserComment.get('authorsName');
  }
  get formTitle() {
    return this.AddUserComment.get('title');
  }
  get formComment() {
    return this.AddUserComment.get('body');
  }
}
