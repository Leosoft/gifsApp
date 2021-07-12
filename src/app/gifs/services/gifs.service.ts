import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey = 'HOWQiWNIw0eXUOzCV2aE4LkmOnsS5YOf';

  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';

  private _historial: string[] = [];

  public resultados: Gif[] = [];

  //Crear Get
  get historial() {

    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }


  buscarGifs(query: string = '') {

    query = query.toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      /* limite de 20 ya que se acomodan mejor los gifs */
      .set('limit', '20')
      .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe((resp) => {
        //console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      })

  }

  downloadGifs(url: string) {
    return this.http.get(url, {
      responseType: 'blob'
    })
  }

}
