import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiAlbumsService } from 'src/app/api-services/api.albums.service';
import { PhotosInterface } from 'src/app/interfaces/photos.interface';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {
  photos!: PhotosInterface[];

  discernmentNumber!: number;
  variableForPhotos: PhotosInterface[] = [];
  ForAllIdPhotos: Observable<PhotosInterface[]> | null = null;

  constructor(private apiAlbumsService: ApiAlbumsService) {}

  ngOnInit(): void {
    let presentUrl = window.location.href;
    let matches = presentUrl.match(/\d+$/);
    if (matches) {
      this.discernmentNumber = parseInt(matches[0], 10);
    }
    this.ForAllIdPhotos = this.apiAlbumsService.getCountPhoto(
      this.discernmentNumber
    );
    this.ForAllIdPhotos.subscribe({
      next: (photos: PhotosInterface[]) => {
        this.variableForPhotos = photos;
      },
      error: (error) => {
        console.error('Error fetching photos:', error);
      },
    });
  }
}
