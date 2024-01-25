import { Component } from '@angular/core';
import { GifsService } from './gifs/services/gifs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gifs-app';
}
