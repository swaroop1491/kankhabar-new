import { Component, VERSION, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private http: HttpClient) {}
  name = "Angular " + VERSION.major;
  currentSelection = "Trending";
  favValue = "";
  favList: any = [];
  topicData: any = [];
  html: any = "";
  ngOnInit() {
    this.favList = [];
    this.favList = JSON.parse(localStorage.getItem("favList"));
    this.http
      .get("https://kkapi.swaroop1491.repl.co/news/India+Trending")
      .subscribe(resp => {
        this.topicData = resp;
      });
  }
  arr: any = [
    { topic: "Trending", active: true },
    { topic: "My Fav", active: false },
    { topic: "Corona Virus", active: false },
    { topic: "IPL", active: false }
  ];
  topicClk(e) {
    console.log("click topic");
    this.currentSelection = e.topic;
    for (let i = 0; i < this.arr.length; i++) {
      if (this.arr[i].topic == e.topic) this.arr[i].active = true;
      else this.arr[i].active = false;
    }
    this.http
      .get("https://kkapi.swaroop1491.repl.co/news/" + e.topic)
      .subscribe(resp => {
        this.topicData = resp;
        this.topicData.sort((a, b) => {
          return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
        });
      });
  }
  favtopicClk(e) {
    this.http
      .get("https://kkapi.swaroop1491.repl.co/news/" + e)
      .subscribe(resp => {
        this.topicData = resp;
        this.topicData.sort((a, b) => {
          return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
        });
      });
  }
  addFav() {
    if (!this.favValue) alert("Please type some topic name");
    else {
      console.log(this.favValue);
      this.favList.push(this.favValue);
    }
    localStorage.setItem("favList", JSON.stringify(this.favList));
    this.favValue = "";
  }
  removeFavItem(e) {
    let i = this.favList.indexOf(e);
    this.favList.splice(i, 1);
    localStorage.setItem("favList", JSON.stringify(this.favList));
  }
}
