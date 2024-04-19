import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiGetpostService } from 'src/app/api-services/api.getpost.service';
import { BodyInterface } from 'src/app/interfaces/title.body.interface';
import { UsercommentInterface } from 'src/app/interfaces/usercomment.interface';

@Component({
  selector: 'app-usercomment',
  templateUrl: './usercomment.component.html',
  styleUrls: ['./usercomment.component.scss'],
})
export class UsercommentComponent implements OnInit {
  userComments!: UsercommentInterface[];
  userBodyData!: BodyInterface[];

  userComment: Observable<UsercommentInterface[]> | null = null;
  userIdComment: UsercommentInterface[] = [];

  analyseNumber!: number;
  postsId!: number;

  inPostTitle: string = '';
  inPostBody: string = '';

  userCommentForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private apiGetPostService: ApiGetpostService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.userCommentForm = this.fb.group({
      username: ['', Validators.required],
      bodyComment: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    let presentCommentsUrl = window.location.href;
    let equal = presentCommentsUrl.match(/\d+$/);
    if (equal) {
      this.analyseNumber = parseInt(equal[0], 10);
    }
    this.userComment = this.apiGetPostService.getAllUserComments(this.analyseNumber);
    this.userComment.subscribe((userIdComments) => {
      this.userIdComment = userIdComments;
    },
  );

    this.apiGetPostService.getAllUserComment().subscribe((userComments) => {
      this.userComments = userComments;
    });
    this.apiGetPostService.getAllBody().subscribe((userBodyData) => {
      this.userBodyData = userBodyData;
    });
    this.route.params.subscribe((params) => {
      this.postsId = params['postId'];
    });
    const presentUrl = window.location.href;
    const equivalent = presentUrl.match(/\d+$/);
    if (equivalent) {
      this.analyseNumber = parseInt(equivalent[0], 10);
      this.postsId = this.analyseNumber;
      this.postTitleBody();
    }
  }
  postTitleBody(): void {
    this.http
      .get<BodyInterface>(
        `https://jsonplaceholder.typicode.com/posts/${this.analyseNumber}`
      )
      .subscribe({
        next: (post) => {
          this.inPostTitle = post.title;
          this.inPostBody = post.body;
        },
        error: (error) => {
          console.error('Error fetching post:', error);
        },
      });
  }

  addNewUserComments(userName: String, commentsInBody: String) {
    if (!userName.trim() || !commentsInBody.trim()) {
      return;
    }
    const newComments = {
      name: userName.trim(),
      body: commentsInBody.trim(),
      postId: this.userComments.length + 1,
      id: Date.now(),
    };
    this.apiGetPostService.addUserNewComment(newComments).subscribe({
      next: (response) => {
        console.log('Added new user and post successfully!:', response);
        this.userIdComment.push(newComments);
        this.userCommentForm.reset();
      },
      error: (error) => {
        console.error('Error in new user and post:', error);
      },
    });
  }

  get formUserName() {
    return this.userCommentForm.get('username');
  }
  get formBodyComment() {
    return this.userCommentForm.get('bodyComment');
  }
}
