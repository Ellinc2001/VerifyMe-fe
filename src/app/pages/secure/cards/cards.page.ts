import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, IonRouterOutlet } from '@ionic/angular';
import { AddPage } from './add/add.page';
import { IdentityTriggersService } from 'src/app/services/identity-triggers.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit {

  identityTriggers = [
    {
      id: 1,
      name: 'John Doe',
      platform: 'Instagram',
      aliases: ['JDoe', 'JohnnyD'],
      keywords: ['fake account', 'imposter', 'scammer'],
      tags: ['#FakeAlert', '#ScamWarning'],
      suspectChannels: ['@FakeJohnDoe']
    },
    {
      id: 2,
      name: 'Fake Account Alert',
      platform: 'YouTube',
      aliases: ['FraudDetect', 'ImposterHunter'],
      keywords: ['deepfake', 'fake news', 'misinformation'],
      tags: ['#FakeNews', '#Exposed'],
      suspectChannels: ['@DeepfakeVideos', '@ScamYouTube']
    },
    {
      id: 3,
      name: 'Deepfake Detector',
      platform: 'TikTok',
      aliases: ['AI_FakeSpotter', 'DF_Check'],
      keywords: ['deepfake detection', 'AI face swap', 'fake identity'],
      tags: ['#Deepfake', '#AIAnalysis'],
      suspectChannels: ['@FakeAIAccount', '@FaceSwapGuru']
    },
    {
      id: 4,
      name: 'Crypto Scammer Watch',
      platform: 'Twitter',
      aliases: ['CryptoScam', 'BTCFraudAlert'],
      keywords: ['crypto scam', 'fake giveaway', 'investment fraud'],
      tags: ['#ScamAlert', '#CryptoScam'],
      suspectChannels: ['@ScamBitCoin', '@FakeEthereum']
    },
    {
      id: 5,
      name: 'Influencer Imposter',
      platform: 'Facebook',
      aliases: ['FakeInfluencer', 'BrandScam'],
      keywords: ['fake influencer', 'social media fraud'],
      tags: ['#FakeInfluencer', '#ScamBrand'],
      suspectChannels: ['@FakePromoDeals', '@ScamInfluencer']
    }
  ];
  

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private routerOutlet: IonRouterOutlet,
    private identityTriggersService: IdentityTriggersService
  ) { }

  ngOnInit() {}

  // Visualizza i dettagli di un Identity Trigger
  async viewIdentityTrigger(trigger: any) {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      header: trigger.name,
      message: `<p><strong>Platform:</strong> ${trigger.platform}</p>`,
      buttons: ['OK']
    });

    await alert.present();
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
    return iconsMap[platform.toUpperCase()] || 'help-circle';
  }

   // Carica gli Identity Triggers dal backend
  loadIdentityTriggers() {
    this.identityTriggersService.getIdentityTriggers().subscribe((triggers) => {
      this.identityTriggers = triggers;
    });
  }

  // Apre la modale per aggiungere un Identity Trigger
  async addIdentityTrigger() {
    const modal = await this.modalController.create({
      component: AddPage,
      presentingElement: this.routerOutlet.nativeEl
    });

    modal.onWillDismiss().then((result) => {
      if (result.data) {
        this.identityTriggersService.addIdentityTrigger(result.data.identityTrigger).subscribe(() => {
          this.loadIdentityTriggers();
        });
      }
    });

    return await modal.present();
  }

  // Elimina un Identity Trigger
  async deleteIdentityTrigger(event: Event, trigger: any) {
    event.stopPropagation();

    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      header: 'Delete Identity Trigger?',
      message: `Are you sure you want to remove ${trigger.name}? This action cannot be undone.`,
      buttons: [
        {
          text: 'Delete',
          cssClass: 'danger',
          handler: () => {
            this.identityTriggersService.deleteIdentityTrigger(trigger.id).subscribe(() => {
              this.loadIdentityTriggers();
            });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'cancel'
        }
      ]
    });

    await alert.present();
  }
  
}
