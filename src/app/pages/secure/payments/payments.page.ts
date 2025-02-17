import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { FilterPage } from './filter/filter.page';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {

  content_loaded: boolean = false;
  detectedContent: any[] = [];
  previousDetectedContent: any[] = [];

  constructor(
    private routerOutlet: IonRouterOutlet,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.loadContent();
  }

  // Simula il caricamento dei dati
  loadContent() {
    setTimeout(() => {
      this.detectedContent = [
        { title: 'Fake Profile Alert!', platform: 'YouTube', isCritical: true, icon: 'logo-youtube', color: 'danger' },
        { title: 'Deepfake Detection', platform: 'TikTok', isCritical: false, icon: 'logo-tiktok', color: 'black' },
        { title: 'Impersonation Report', platform: 'Instagram', isCritical: true, icon: 'logo-instagram', color: 'purple' }
      ];

      this.previousDetectedContent = [
        { title: 'Scam Video', platform: 'YouTube', isCritical: false, icon: 'logo-youtube', color: 'danger' },
        { title: 'Profile Clone', platform: 'Instagram', isCritical: false, icon: 'logo-instagram', color: 'purple' }
      ];

      this.content_loaded = true;
    }, 2000);
  }

  // Filter modal
  async filter() {
    const modal = await this.modalController.create({
      component: FilterPage,
      presentingElement: this.routerOutlet.nativeEl
    });

    await modal.present();

    let { data } = await modal.onWillDismiss();

    if (data) {
      this.content_loaded = false;
      setTimeout(() => {
        this.loadContent();
      }, 2000);
    }
  }
}
