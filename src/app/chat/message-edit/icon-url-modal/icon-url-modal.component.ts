import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {Component, OnInit, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'icon-url-modal',
  templateUrl: './icon-url-modal.component.html',
  styleUrls: ['./icon-url-modal.component.css']
})
export class IconUrlModalComponent implements OnInit{

  @ViewChild('f') messageForm: NgForm;
  public onClose: Subject<boolean>;

  constructor(private modalRef: BsModalRef) {

  }

  public ngOnInit(): void {
    this.onClose = new Subject();
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    this.onClose.next(value);
    this.modalRef.hide();
  }

}
