import { Component } from '@angular/core';
import { Post } from './post';
import { ActivatedRoute } from '@angular/router';
import { map} from 'rxjs';
import { ServiceService } from './service.service';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'POST';
  getvalue:Post[]=[];
  dummy!:FormGroup;
  postvalue:Post={
    id:0,
    name:'',
    mobid:0
  };
  id!: number;
  name!: string;
  
  constructor(private route:ActivatedRoute,
              private fb:FormBuilder,
              private service:ServiceService) {}
  ngOnInit(){
    this.dummy = this.fb.group({
     name:['', Validators.required],
     mobid:['', Validators.pattern("^[0-9]*$")]
    })
    this.getts();
  }  
    
    submit(){
      this.postvalue = this.dummy.value
      this.service.post(this.postvalue)
      .subscribe((res =>{
       console.log(res);
       this.map();
      }))
    }
    
    getts(){
     this.service.get()
     .subscribe((res) => {
      this.getvalue =res
      console.log(this.getvalue);
    })
    }
    
    map(){
      this.service.post(this.postvalue)
      .pipe(map(res => "WELCOME, "+ res.name+" OFFICIAL"))
      .subscribe( res => this.name = res);  
    }
  
    // getbyid(id:number){
    //   this.service.getbyid(id).subscribe((params => {
    //       this.id = +params.get('id');
    //       console.log(this.id);     
    //   }))
    // }
}
