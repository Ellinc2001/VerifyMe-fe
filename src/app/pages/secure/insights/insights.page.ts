import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DataService } from 'src/app/services/data/data.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.page.html',
  styleUrls: ['./insights.page.scss'],
})
export class InsightsPage implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined


  public bar_chart_option: ChartConfiguration['options'] = {
    font: {
      family: 'Inter'
    },
    animation: {
      easing: 'easeInOutElastic',
      delay: 25
    },
    responsive: true,
    scales: {
      x: {
        grid: {
          borderColor: this.helperService.getColorVariable('medium'),
          color: this.helperService.getColorVariable('medium')
        },
        ticks: {
          color: this.helperService.getColorVariable('tertiary'),
          font: {
            family: 'Inter',
            weight: '500'
          }
        }
      },
      y: {
        position: 'right',
        grid: {
          borderColor: this.helperService.getColorVariable('medium'),
          color: this.helperService.getColorVariable('medium')
        },
        ticks: {
          color: this.helperService.getColorVariable('tertiary'),
          font: {
            family: 'Inter',
            weight: '500'
          },
          callback: function (value, index, ticks) {
            return '';
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: this.helperService.getColorVariable('dark'),
        bodyColor: this.helperService.getColorVariable('primary'),
        titleColor: this.helperService.getColorVariable('tertiary'),
        titleFont: {
          size: 14,
          weight: 'normal'
        },
        bodyFont: {
          size: 16,
          weight: 'bold'
        },
        padding: 12,
        boxWidth: 10,
        boxHeight: 10,
        boxPadding: 3,
        usePointStyle: true,
        callbacks: {
          // Add currency format to tooltip
          label: function (context) {
            var label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    }
  };

  public bar_chart_data: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  public bar_chart_type: ChartType = 'bar';

  content_loaded: boolean = false;
  segnalazioni: any;
  totalReports: number = 0;
  platformReports: { 
    platform: string;
    totalReports: number;
    criticalReports: number;
    percentageChange: number;
    icon: string;
    color: string;
  }[] = [];
  percentageChangeTotal: number;
  totalCriticalReports: number;
  criticalPercentageChange: any;

  constructor(
    private helperService: HelperService,
    private dataService: DataService
  ) { }

  ngOnInit() {

    // Create bar chart
    this.loadInsights();
  }

  ionViewDidEnter() {

    // Fake timeout
    setTimeout(() => {
      this.content_loaded = true;
    }, 2000);
  }

  // // Create bar chart
  // createBarChart() {

  //   let helperService = this.helperService;

  //   // Random array of numbers
  //   let rand_numbers = [...Array(12)].map(e => Math.random() * 100 | 0);

  //   // Set labels
  //   this.bar_chart_data.labels = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

  //   // Set datasets
  //   this.bar_chart_data.datasets = [
  //     {
  //       data: rand_numbers,
  //       backgroundColor: function (context) {

  //         const chart = context.chart;
  //         const { ctx, chartArea } = chart;

  //         if (!chartArea) {
  //           // This case happens on initial chart load
  //           return null;
  //         }

  //         // Create gradient
  //         return helperService.createGradientChart(ctx, 'primary', 'primary');
  //       },
  //       barThickness: 10,
  //       borderRadius: 4,
  //       borderColor: helperService.getColorVariable('primary'),
  //       hoverBackgroundColor: helperService.getColorVariable('primary'),
  //       pointStyle: 'circle',
  //     }
  //   ];
  // }


  // ✅ Adattato per mostrare segnalazioni invece di dollari
createBarChart() {

  let helperService = this.helperService;

  // 📌 Esempio di segnalazioni reali da API (da sostituire con dati dinamici)
  let segnalazioni = {
    "YouTube": 12,
    "Instagram": 8,
    "TikTok": 7
  };

  this.bar_chart_data.labels = Object.keys(segnalazioni); // Nome delle piattaforme
  this.bar_chart_data.datasets = [
    {
      data: Object.values(segnalazioni), // Numero di segnalazioni
      backgroundColor: function (context) {
        const chart = context.chart;
        const { ctx, chartArea } = chart;

        if (!chartArea) {
          return null;
        }

        return helperService.createGradientChart(ctx, 'primary', 'primary');
      },
      barThickness: 10,
      borderRadius: 4,
      borderColor: helperService.getColorVariable('primary'),
      hoverBackgroundColor: helperService.getColorVariable('primary'),
      pointStyle: 'circle',
    }
  ];
}

loadInsights() {
  this.dataService.getInsightsByUsername().subscribe((data: { 
    [platform: string]: { total: number; critical: number; percentageChange?: number } 
  }) => {
    
    console.log("Dati ricevuti:", data); // 🔹 Debug per vedere i dati ricevuti

    // 🔹 Converte i dati in un array di oggetti
    this.platformReports = Object.entries(data)
      .filter(([key]) => key !== "TOTAL") // 🔹 Evita il campo "TOTAL" se presente
      .map(([platform, details]) => ({
        platform: platform,
        totalReports: details.total,
        criticalReports: details.critical,
        percentageChange: details.percentageChange ?? 0, // Se non presente, metti 0
        icon: this.getPlatformIcon(platform),
        color: this.getPlatformColor(platform)
      }));

    // 🔹 Calcola il totale delle segnalazioni
    this.totalReports = this.platformReports.reduce((sum, report) => sum + report.totalReports, 0);
    if (data.TOTAL) {
      this.percentageChangeTotal = data.TOTAL.percentageChange ?? 0;
    } else {
      this.percentageChangeTotal = 0; // Se manca il dato, evitiamo errori
    }    // 🔹 Calcola il totale delle segnalazioni critiche
    this.totalCriticalReports = this.platformReports.reduce((sum, report) => sum + report.criticalReports, 0);

    this.content_loaded = true;
    this.updateChart()

  });

}



updateChart() {
  this.bar_chart_data.labels = this.platformReports.map(report => report.platform);
  this.bar_chart_data.datasets = [
    {
      data: this.platformReports.map(report => report.totalReports),
      backgroundColor: this.platformReports.map(() => this.helperService.getColorVariable('primary')),
      borderColor: this.helperService.getColorVariable('primary'),
      barThickness: 10,
      borderRadius: 4
    }
  ];

  // 🔹 Forza l'aggiornamento del grafico
  setTimeout(() => {
    this.chart?.update();
  }, 500);
}


// 🔹 Metodo per ottenere l'icona in base alla piattaforma
getPlatformIcon(platform: string): string {
  const icons = {
    YOUTUBE: 'logo-youtube',
    INSTAGRAM: 'logo-instagram',
    TIKTOK: 'logo-tiktok',
    FACEBOOK: 'logo-facebook',
    TWITTER: 'logo-twitter'
  };
  return icons[platform.toUpperCase()] || 'alert-circle';
}

// 🔹 Metodo per ottenere il colore in base alla piattaforma
getPlatformColor(platform: string): string {
  const colors = {
    YOUTUBE: 'danger',
    INSTAGRAM: 'purple',
    TIKTOK: 'black',
    FACEBOOK: 'blue',
    TWITTER: 'blue'
  };
  return colors[platform.toUpperCase()] || 'medium';
}

}
