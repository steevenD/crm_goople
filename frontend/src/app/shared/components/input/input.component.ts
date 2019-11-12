import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {


  @Input() fControl: FormControl;
  @Input() fGroup: FormGroup;
  @Input() icon: string;
  @Input() placeholder: string;
  @Input() type: string;

  id = null;

  constructor() { }

  ngOnInit() {
    this.id = Math.random();
  }

}
