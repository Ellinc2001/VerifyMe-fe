import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

  @Input() content: any; // Il contenuto selezionato verrà passato qui

  constructor(private modalController: ModalController) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  /**
   * Chiude la modale
   */
  closeModal() {
    this.modalController.dismiss();
  }

  /**
   * Apre il link del contenuto nel browser
   */
  openUrl(url: string) {
    window.open(url, '_blank');
  }

  /**
   * Mappa la piattaforma social all'icona corrispondente
   */
  getPlatformIcon(platform: string): string {
    const iconsMap = {
      'YOUTUBE': 'logo-youtube',
      'INSTAGRAM': 'logo-instagram',
      'TIKTOK': 'logo-tiktok',
      'FACEBOOK': 'logo-facebook',
      'TWITTER': 'logo-twitter',
      'LINKEDIN': 'logo-linkedin'
    };
    return iconsMap[platform.toUpperCase()] || 'assets/icons/default.ico';
  }

}
