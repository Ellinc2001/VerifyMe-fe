import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent {
  @Input() content: any;

  constructor(private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss();
  }

  /**
   * Registra la decisione dell'utente
   */
  reportTheft(isTheft: boolean) {
    console.log(`Contenuto segnalato come: ${isTheft ? 'Furto' : 'Non Furto'}`);
    
    // Chiudi la modale e invia il risultato
    this.modalController.dismiss({ isTheft });
  }
}
