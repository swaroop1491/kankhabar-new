import { Component, VERSION, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  constructor(private http: HttpClient) { }
  name = 'Angular ' + VERSION.major;
  currentSelection = "Trending";
  favValue = "";
  favList = [];
  topicData: any = [];
  html = "";
  ngOnInit(){
    this.favList = JSON.parse(localStorage.getItem("favList"));
    this.http.get("https://kkapi.swaroop1491.repl.co/news/India+Trending").subscribe(resp=>{
      this.topicData = resp;
    });
    this.getPreview();
  }
  getPreview(){
    this.http.get("https://www.moneycontrol.com/news/india/lottery-sambad-result-september-22-dear-bangalakshmi-torsha-lottery-result-to-be-announced-today-at-4-pm-5869001.html", { responseType: 'text' }).subscribe(resp=>{
      this.html = resp;
      var parser = new DOMParser();
	    var doc = parser.parseFromString(this.html, 'text/html');
      console.log(doc)
    })
  }
  arr: any = [
    {"topic": "Trending", "active":true},
    {"topic": "My Fav", "active":false},
    {"topic": "Corona Virus", "active":false},
    {"topic": "IPL", "active":false},
    {"topic": "Odisha", "active":false},
    {"topic": "India", "active":false},
    {"topic": "International", "active":false},
    {"topic": "Business", "active":false},
    {"topic": "Sports", "active":false},
    {"topic": "Entertainment", "active":false},
    {"topic": "Science", "active":false},
    {"topic": "Astrology", "active":false}
    ]
  topicClk(e){
    console.log("click topic")
    this.currentSelection = e.topic;
    for(let i=0;i<this.arr.length;i++){
      if(this.arr[i].topic == e.topic) this.arr[i].active = true;
      else  this.arr[i].active = false;
    }
    ;
    
  }
  favtopicClk(e){

  }
  addFav(){
    if(!this.favValue) alert("Please type some topic name");
    else this.favList.push(this.favValue);
    localStorage.setItem("favList", JSON.stringify(this.favList));
    this.favValue="";
  }
  removeFavItem(e){
    let i = this.favList.indexOf(e);
    this.favList.splice(i,1);
    localStorage.setItem("favList", JSON.stringify(this.favList));
  }
}
