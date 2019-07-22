import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-server-error-messages',
  template: `
  <div class="alert alert-danger mt-4" *ngIf="serverErrorMessages">
    <strong>Erro no servidor:</strong>
    <ul>
      <li *ngFor="let error of serverErrorMessages">{{error}}</li>
    </ul>
</div>
  `,
})
export class ServerErrorMessagesComponent implements OnInit {

  @Input('server-error-messages') serverErrorMessages: string[] = null;

  constructor() { }

  ngOnInit() {
  }

}
