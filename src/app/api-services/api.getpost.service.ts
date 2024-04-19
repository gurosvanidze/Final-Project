import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInterface } from '../interfaces/user.interface';
import { BodyInterface } from '../interfaces/title.body.interface';
import { Observable, forkJoin } from 'rxjs';
import { UsercommentInterface } from '../interfaces/usercomment.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiGetpostService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(
      'https://jsonplaceholder.typicode.com/users'
    );
  }
  getAllBody(): Observable<BodyInterface[]> {
    return this.http.get<BodyInterface[]>(
      'https://jsonplaceholder.typicode.com/posts'
    );
  }
  getAllUserComment(): Observable<UsercommentInterface[]> {
    return this.http.get<UsercommentInterface[]>(
      'https://jsonplaceholder.typicode.com/posts/1/comments'
    );
  }

  addUserNewComment(userComment: {
    postId: number;
    id: number;
    name: string;
    body: string;
  }): Observable<any> {
    let dataComments = {
      postId: userComment.postId,
      id: userComment.id,
      name: userComment.name,
      body: userComment.body,
    };
    return this.http.post(
      'https://jsonplaceholder.typicode.com/posts/1/comments',
      dataComments
    );
  }

  addNewUser(newPosts: {
    userName: string;
    id: number;
    title: string;
    body: string;
    userId: number;
  }): Observable<any[]> {
    let dataUserBody = {
      userId: newPosts.userId,
      id: newPosts.id,
      title: newPosts.title,
      body: newPosts.body,
    };
    let userData = {
      name: newPosts.userName,
      id: newPosts.userId,
    };

    const userDetectable = this.http.post(
      'https://jsonplaceholder.typicode.com/users',
      userData
    );
    const postDetectable = this.http.post(
      'https://jsonplaceholder.typicode.com/posts',
      dataUserBody
    );

    return forkJoin([userDetectable, postDetectable]);
  }
}
