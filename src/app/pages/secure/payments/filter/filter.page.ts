import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { ReportComponent } from '../report/report.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

  @Input() content: any; // Il contenuto selezionato verrà passato qui
  thumbnailUrl: string = ''; // Miniatura estratta dall'URL

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.thumbnailUrl = this.extractThumbnail(this.content.url);
  }

  /**
   * Chiude la modale
   */
  closeModal() {
    this.modalController.dismiss();
  }

  /**
   * Apre il video in una nuova scheda
   */
  openVideo(videoUrl: string) {
    window.open(videoUrl, '_blank');
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
    return iconsMap[platform.toUpperCase()] || 'help-circle';
  }

  /**
   * Estrae la miniatura dal contenuto URL
   */
  extractThumbnail(url: string): string {
    if (!url) return '';

    // YouTube Thumbnail Extraction
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    if (youtubeMatch) {
      return `https://img.youtube.com/vi/${youtubeMatch[1]}/hqdefault.jpg`;
    }

    // TikTok Thumbnail Extraction (Trick using cover image)
    const tiktokMatch = url.match(/tiktok\.com\/(?:.*\/video\/)(\d+)/);
    if (tiktokMatch) {
      return `https://www.tiktok.com/oembed?url=${url}`;
    }

    // Instagram Thumbnail Extraction (Requires API - Placeholder)
    const instagramMatch = url.match(/instagram\.com\/p\/([^/?]+)/);
    if (instagramMatch) {
      return 'assets/icons/instagram-placeholder.jpg';
    }

    return 'assets/icons/default-thumbnail.jpg'; // Default thumbnail
  }

  getShortTitle(title: string, maxLength: number = 30): string {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  }
  
  async openReportModal(content: any) {
    const modal = await this.modalController.create({
      component: ReportComponent,
      componentProps: { content },
    });
  
    await modal.present();
  
    // Recupera il risultato dall'utente
    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log(`L'utente ha segnalato il contenuto come: ${data.isTheft ? 'Furto' : 'Non Furto'}`);
      // Qui puoi inviare il risultato al backend
    }
  }
}
