import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-result-board',
  templateUrl: './result.html',
})
export class ResultComponent implements OnInit {
  private test : any;
  ngOnInit(): void {
  }

  constructor(comp : any ) {
  }


}
