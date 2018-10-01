import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PriWebComponentField } from '@primavera/ngcore';

// app-modal.component.ts
@Component({
  selector: 'pri-modal2',
  template: `
  <div class="pri-modal">
    <div class="pri-modal-header">
      <div class="pri-modal-header-title">
      TEST
      </div> 
    </div>
</div>`})
export class PriTestModalComponent implements OnDestroy{
  @Output() modalClose : EventEmitter<any> = new EventEmitter<any>();

  constructor( private router : Router ) {}
    
  closeModal( $event ) {
    this.router.navigate([{outlets: {modal: null}}]);
    this.modalClose.next($event);
  }

  ngOnDestroy() {
  }
}


@Component({
  selector: 'app-login',
  template: ` OLAAAAAAA
  
  `})
export class PriTestLoginComponent implements OnInit,OnDestroy{
  modalClose( $event ) {
    console.log($event); // { submitted: true }
  }

  constructor( private modalService: BsModalService) {
    
  }
  bsModalRef: BsModalRef
  ngOnInit() {
    
    
    let modalConfig = {
        class: "popup-attachments",
        ignoreBackdropClick: true,
        keyboard: false      
    }

    // init modal
    this.bsModalRef = this.modalService.show(PriTestModalComponent, modalConfig);
    
  }

  ngOnDestroy() {
    this.bsModalRef.hide();
  }
}



@Component({
  selector: 'viewmessage',
  template: `<div class="alert-warning alert-dismissible" role="alert" style="margin-bottom:0px!important">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close" (click)="onClose()"><span arai-hidden="true">&times;</span></button>
  <strong>Warning!</strong> Better check uorself, you're not looking too good.
  </div>
  
  `})
export class PriWarningComponent extends PriWebComponentField  {

  constructor( ) {
    super()
  }
  onClose() {
     this.field.hide = true;
     this.to.hidden =true;
     this.field.hideExpression = undefined;
  }
}