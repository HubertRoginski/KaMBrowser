import { Component, OnInit } from '@angular/core';
import {FieldModel} from '../../../../../models/FieldModel';
import {FieldServiceService} from '../../../../../services/field-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-gate',
  templateUrl: './gate.component.html',
  styleUrls: ['./gate.component.css']
})
export class GateComponent implements OnInit {

  fields: FieldModel[];
  field: FieldModel;

  constructor(private fieldService: FieldServiceService, private router: Router) { }

  ngOnInit(): void {
    this.fieldService.findFieldsByMap('gate').subscribe(value => this.fields = value);
  }

  setField(map: string, fieldNumber: number): void {
    this.fieldService.findFieldByMapAndFieldNumber(map, fieldNumber).subscribe(value => {
      this.field = value;
      this.fieldService.saveField(this.field);
      this.goToSelectedField(this.field.buildingLevel, this.field.className);
    });
  }

  goToSelectedField(buildingLevel: number, className: string): void {
    if (buildingLevel === 0) {
      this.router.navigate(['/game/village/building-menu']);
    } else {
      this.router.navigate(['/game/village/upgrade-menu']);
    }
  }

}
