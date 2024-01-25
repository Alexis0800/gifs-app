import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagHistory: string[] = [];
  private apiKey: string = 'K9fV311ho8N7hBc7YHky7CZ0zK9ay53h';
  private serviceURL: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    // console.log('Gifs service ready');
  }

  get TagHistory() {
    return [...this._tagHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLocaleLowerCase();

    if (this._tagHistory.includes(tag)) {
      this._tagHistory = this._tagHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagHistory.unshift(tag);
    this._tagHistory = this._tagHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this.TagHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;

    this._tagHistory = JSON.parse(localStorage.getItem('history')!);;

    if (this._tagHistory.length === 0) return;
    this.searchTag(this._tagHistory[0]);
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag);

    this.http.get<SearchResponse>(`${this.serviceURL}/search`, { params })
      .subscribe(resp => {

        this.gifList = resp.data;
        // console.log({ gifs: this.gifList });

      })

    // fetch('https://api.giphy.com/v1/gifs/search?api_key=K9fV311ho8N7hBc7YHky7CZ0zK9ay53h&q=valorant&limit=10')
    //   .then(res => res.json())
    //   .then(data => console.log(data));
  }
}
