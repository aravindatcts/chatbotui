import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userForm: any;
  url = 'https://genaibff-7rr3gfiaxa-uc.a.run.app/api/v1/generate'
  title = 'blogsmith';
  value: number | null = 1.0;
  isAlternate: boolean = false;
  isPrimary: boolean = true;
  response: string = 'Your blog will be generated soon!';
  alternateResponse: string = 'Your blog will be generated soon!';

  constructor(private formBuilder: FormBuilder, private http: HttpClient){}

  ngOnInit():void {

    this.userForm = this.formBuilder.group({
      topic: ['', Validators.required],
      temperature: ['', [Validators.maxLength(1.0), Validators.minLength(0.0)]]
    })
  }

  onSliderChange(newValue:any) {
    this.value = newValue.target.value;
  }

  onLike(newValue:any) {
    console.log(newValue.target.name);
    if (newValue.target.name === 'primaryResponse') {
      this.isAlternate = true;
      this.isPrimary = false;
    } else {
      this.isPrimary = true;
      this.isAlternate = false;
    }
    
    
  }

  submitForm(): void {
    
     this.http.post<any>(this.url, {
      topic: this.userForm.value.topic,
      temperature: this.userForm.value.temperature
    },{responseType: 'json'}).subscribe( (res:any) => {
      const {response,alternateResponse} = res;
      this.response = response;
      this.alternateResponse = alternateResponse;
    });

  }

}
