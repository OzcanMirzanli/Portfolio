import {
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PortfolioComponent implements OnInit {
  projects: any[] = [];
  private languageChangeSubscription: Subscription = new Subscription();

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.loadProjects();

    // Subscribe to language change events
    this.languageChangeSubscription = this.translate.onLangChange.subscribe(
      () => {
        this.loadProjects();
      }
    );
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    this.languageChangeSubscription.unsubscribe();
  }

  private loadProjects() {
    // Use translate.get() for asynchronous translation fetching
    this.translate
      .get([
        'PROJECTS.JOIN.TITLE',
        'PROJECTS.JOIN.TECHNOLOGIES',
        'PROJECTS.JOIN.DESCRIPTION',
        'PROJECTS.EL_POLLO_LOCO.TITLE',
        'PROJECTS.EL_POLLO_LOCO.TECHNOLOGIES',
        'PROJECTS.EL_POLLO_LOCO.DESCRIPTION',
        'PROJECTS.DABUBBLE.TITLE',
        'PROJECTS.DABUBBLE.TECHNOLOGIES',
        'PROJECTS.DABUBBLE.DESCRIPTION',
      ])
      .subscribe((translations) => {
        this.projects = [
          {
            title: translations['PROJECTS.DABUBBLE.TITLE'],
            technologies: 'Angular | Firebase | TypeScript',
            description: translations['PROJECTS.DABUBBLE.DESCRIPTION'],
            image: 'assets/img/dabubble.png',
            imageAlt: 'dabubble',
            reverseClass: '',
            link: 'https://github.com/ozcanmirzanli/DABubble',
            liveLink: 'https://dabubble.ozcanmirdev.com/',
          },
          {
            title: translations['PROJECTS.JOIN.TITLE'],
            technologies: 'JavaScript | Firebase | HTML | CSS',
            description: translations['PROJECTS.JOIN.DESCRIPTION'],
            image: 'assets/img/join.png',
            imageAlt: 'join',
            reverseClass: 'row-reverse',
            link: 'https://github.com/ozcanmirzanli/Join',
            liveLink: 'https://join.ozcanmirdev.com/',
          },
          {
            title: translations['PROJECTS.EL_POLLO_LOCO.TITLE'],
            technologies: 'JavaScript | HTML | CSS',
            description: translations['PROJECTS.EL_POLLO_LOCO.DESCRIPTION'],
            image: 'assets/img/polloloco.png',
            imageAlt: 'polloloco',
            reverseClass: '',
            link: 'https://github.com/ozcanmirzanli/El-Pollo-Loco',
            liveLink: 'https://elpolloloco.ozcanmirdev.com/',
          },
        ];
      });
  }

  /**
   * Detects the scroll event and triggers animations for project elements.
   * When the user scrolls the page, this function checks the position
   * of each '.single-project' element in the viewport.
   * @returns {void}
   */
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const elements = document.querySelectorAll('.single-project');
    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.top < viewportHeight - 100) {
        element.classList.add('animate');
      } else {
        element.classList.remove('animate');
      }
    });
  }
}
