import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignalRService } from './Product/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Client';

  constructor(public signalRService: SignalRService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addProductDataListener();
  }
}
