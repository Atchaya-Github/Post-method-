import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http:HttpClient) { }
  
  public get():Observable<Post[]>{
    return this.http.get<Post[]>('http://localhost:3000/data');
  }
  public post(payload:Post):Observable<Post>{
    return this.http.post<Post>('http://localhost:3000/data',payload)
  }
  public getbyid(id:number):Observable<Post>{
    return this.http.get<Post>(`http://localhost:3000/data/${id}`);
  }
}
