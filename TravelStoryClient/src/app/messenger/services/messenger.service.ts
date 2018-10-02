import {Injectable} from '@angular/core';
import {User} from "../model/User";
import {Chat} from "../model/Chat";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message} from "../model/Message";
import {ActivatedRoute, Router} from "@angular/router";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const HARDCODED_USER_ID = 1;
const colors: string[] = [
  '#2196F3', '#32c787', '#00BCD4', '#ff5652',
  '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];


@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  userId: number;
  baseUrl: string = "http://localhost:8080/";

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute,
  ) {
  }

  getChats(user: User): Observable<Chat[]> {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
    });
    if (this.userId) {
      return this.http.get<Chat[]>(this.baseUrl + "messenger/" + this.userId + "/chats");
    }
    return this.http.get<Chat[]>(this.baseUrl + "messenger/" + HARDCODED_USER_ID + "/chats");
  }

  getChat(id: number): Observable<Chat> {
    return this.http.get<Chat>(this.baseUrl + "messenger/chat/" + id);
  }

  getCurrentUser(): Observable<User> {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
    });

    if (this.userId) {
      return this.http.get<User>(this.baseUrl + "messenger/user/" + this.userId);
    }
    return this.http.get<User>(this.baseUrl + "messenger/user/" + HARDCODED_USER_ID);
  }

  getNext30Messages(chatId: number, pageNumber: number): Observable<Message[]> {
    let httpParams = new HttpParams().set('pageNumber', pageNumber.toString());
    return this.http.get<Message[]>(this.baseUrl + "messenger/chat/" + chatId + "/messages",
      {params: httpParams});
  }

  getInterlocutor(userId: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + "messenger/user/" + userId);
  }

  setInterlocutor(chat: Chat, currentUser: User) {

  }

  public getAvatarColor(chatName: string): string {
    var hash = 0;
    for (var i = 0; i < chatName.length; i++) {
      hash = 31 * hash + chatName.charCodeAt(i);
    }
    var index = Math.abs(hash % colors.length);
    return colors[index];
  }
}
