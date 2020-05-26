import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection: signalR.HubConnection

  constructor(private service: ProductService) { }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/product')
      .build();
    this.hubConnection.start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public addProductDataListener = () => {
    this.hubConnection.on(
      'productData', (data) => {
        this.service.products = data;
        console.log('ProductDataListener: ', data);
      }
    );
  }
}
