import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiGetpostService } from 'src/app/api-services/api.getpost.service';
import { BodyInterface } from 'src/app/interfaces/title.body.interface';
import { UsercommentInterface } from 'src/app/interfaces/usercomment.interface';

@Component({
  selector: 'app-usercomment',
  templateUrl: './usercomment.component.html',
  styleUrls: ['./usercomment.component.scss']
})
export class UsercommentComponent implements OnInit {
  userComments!: UsercommentInterface[];
  userBodyData!: BodyInterface[];

  analyseNumber!: number;
  postId!: number;

  postTitle: string = '';
  postBody: string = '';
  editedTitle: string = '';
  editedBody: string = '';

  userCommentForm: FormGroup;
  constructor(private fb: FormBuilder, private apiGetPostService: ApiGetpostService, private http: HttpClient, private route: ActivatedRoute) {
    this.userCommentForm = this.fb.group({})
  }

  ngOnInit(): void {
    this.apiGetPostService.getAllUserComment().subscribe((userComments) => {
      this.userComments = userComments;
    });
    this.apiGetPostService.getAllBody().subscribe((userBodyData) => {
      this.userBodyData = userBodyData;
    });
    this.route.params.subscribe((params) => {
      this.postId = params['postId'];
    });
    const presentUrl = window.location.href;
    const equivalent = presentUrl.match(/\d+$/);
    if (equivalent) {
      this.analyseNumber = parseInt(equivalent[0], 10);
      this.postId = this.analyseNumber;
      this.postTitleBody();
    }
  }
  postTitleBody(): void {
    this.http.get<BodyInterface>(`https://jsonplaceholder.typicode.com/posts/${this.analyseNumber}`)
    .subscribe((post) => {
      this.postTitle = post.title;
      this.postBody = post.body;
    },
    (error) => {
      console.error('Error fetching post:', error);
    }
  );
  }
}
