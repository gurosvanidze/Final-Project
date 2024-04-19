import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main/main-page/main-page.component';
import { PostsComponent } from './main/posts/PostsComponent';
import { AlbumsComponent } from './main/albums/albums.component';
import { TodosComponent } from './main/todos/todos.component';
import { PhotosComponent } from './main/albums/photos/photos.component';
import { UsercommentComponent } from './main/posts/usercomment/usercomment.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainPageComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'posts/:postId', component: UsercommentComponent },
  { path: 'albums', component: AlbumsComponent },
  { path: 'album/:albumId', component: PhotosComponent },
  { path: 'todos', component: TodosComponent },
  { path: '**', redirectTo: 'main' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
