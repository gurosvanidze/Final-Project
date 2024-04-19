import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAlbumsService } from 'src/app/api-services/api.albums.service';
import { AlbumsInterface } from 'src/app/interfaces/albums.interface';
import { PhotosInterface } from 'src/app/interfaces/photos.interface';
import { UserInterface } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit {
  users!: UserInterface[];
  albums!: AlbumsInterface[];
  photos!: PhotosInterface[];
  sumOfPhotos: { [key: number]: number } = {};

  constructor(
    private apiAlbumsService: ApiAlbumsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.apiAlbumsService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
    this.apiAlbumsService.getAllAlbums().subscribe((albums) => {
      this.albums = albums;
      this.totalNumberOfPhotos();
    });
  }

  getUserName(userId: number): string {
    let user = this.users?.find((user) => user.id === userId);
    return user ? user.name : '';
  }
  goToLocalPhotos(albumId: number): void {
    this.router.navigate(['/album', albumId]);
  }

  totalNumberOfPhotos(): void {
    this.albums.forEach((album) => {
      this.apiAlbumsService
        .getCountPhoto(album.id)
        .subscribe((photos: PhotosInterface[]) => {
          this.sumOfPhotos[album.id] = photos.length;
        });
    });
  }
}
