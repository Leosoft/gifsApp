import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';
import { Gif } from '../interface/gifs.interface';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent {

  get resultados() {
    return this.gifsService.resultados;
  }

  constructor(private gifsService: GifsService) { }

  // este metodo es accionado desde el html
  downloadGif(gif: Gif) {
    this.gifsService
      /*
        Este metodo devuelve un Observable de tipo Blob.
        Un Blob es un objeto similar a un archivo de datos sin procesar inmutable */
      .downloadGifs(gif.images.downsized.url)
      /* se subscribe al metodo ya que devuelve un observable */
      .subscribe(blob => {
        /* se crea un elemento html <a> */
        const a = document.createElement('a')
        /* se crea una url descargable a partir del blob con createObjectURL */
        const objectUrl = URL.createObjectURL(blob)
        /* se setea el atributo href con la url de descarga*/
        a.href = objectUrl
        /* se agrega el nombre al archivo que se descarga que es el titulo del gif */
        a.download = gif.title;
        /* se ejeuta el metodo click que empieza la descarga */
        a.click();
        /* se limpia la url */
        URL.revokeObjectURL(objectUrl);
      })
  }
}
