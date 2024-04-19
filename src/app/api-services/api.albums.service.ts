import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface } from '../interfaces/user.interface';
import { AlbumsInterface } from '../interfaces/albums.interface';
import { PhotosInterface } from '../interfaces/photos.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiAlbumsService {
  private variableForNGForUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(
      'https://jsonplaceholder.typicode.com/users'
    );
  }
  getAllAlbums(): Observable<AlbumsInterface[]> {
    return this.http.get<AlbumsInterface[]>(
      'https://jsonplaceholder.typicode.com/albums'
    );
  }

  getCountPhoto(albumId: number): Observable<PhotosInterface[]> {
    return this.http.get<PhotosInterface[]>(
      `${this.variableForNGForUrl}/albums/${albumId}/photos`
    );
  }
}
