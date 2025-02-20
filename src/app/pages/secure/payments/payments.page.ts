import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { FilterPage } from './filter/filter.page';
import { DataService } from 'src/app/services/data/data.service';

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
    private modalController: ModalController,
    private dataService: DataService // Iniezione del DataService
  ) {}

  ngOnInit() {
    this.loadContent();
  }

  /**
   * Carica i contenuti reali dall'API
   */
  loadContent() {
    this.content_loaded = false;
  
    this.dataService.getDetectedContents().subscribe({
      next: (data) => {
        console.log("Dati ricevuti:", data);
        this.detectedContent = data.contentsOfMonth.map(content => ({
          ...content,
          iconSrc: this.getPlatformIcon(content.platform)
        }));
        this.previousDetectedContent = data.contentsOfPreviousMonth.map(content => ({
          ...content,
          iconSrc: this.getPlatformIcon(content.platform)
        }));
        this.content_loaded = true;
      },
      error: (error) => {
        console.error("Errore nel recupero dei contenuti:", error);
        this.content_loaded = true;
      }
    });
  }
  

  getPlatformIcon(platform: string): string {
    const iconsMap = {
      'YOUTUBE': 'logo-youtube',
      'INSTAGRAM': 'logo-instagram',
      'TIKTOK': 'logo-tiktok',
      'FACEBOOK': 'logo-facebook',
      'TWITTER': 'logo-twitter',
      'LINKEDIN': 'logo-linkedin'
    };
    return iconsMap[platform] || 'help-circle'; // Default se la piattaforma non è trovata
  }

  /**
   * Mostra il filtro in un modal
   */
  async openContentDetails(content: any) {
    const modal = await this.modalController.create({
      component: FilterPage,
      componentProps: { content },
      presentingElement: this.routerOutlet.nativeEl
    });
  
    await modal.present();
  }
  

  
}
