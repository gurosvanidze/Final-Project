import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { MainPageComponent } from './main/main-page/main-page.component';
import { PostsComponent } from './main/posts/PostsComponent';
import { AlbumsComponent } from './main/albums/albums.component';
import { TodosComponent } from './main/todos/todos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PhotosComponent } from './main/albums/photos/photos.component';
import { UsercommentComponent } from './main/posts/usercomment/usercomment.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MainPageComponent,
    PostsComponent,
    AlbumsComponent,
    TodosComponent,
    PhotosComponent,
    UsercommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
