import { Directive, Self } from '@angular/core';
import { DomHandler } from 'primeng/dom';
import { TabView } from 'primeng/tabview';

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: 'p-tabView' })
export class TabViewOverrideDirective {
  constructor(@Self() tabView: TabView) {
    // Override PrimeNG function to use >= in place of === when checking
    // whether to show forward button
    tabView.updateButtonState = (): void => {
      if (tabView.content == null) return;

      const content = tabView.content.nativeElement as HTMLElement;
      const { scrollLeft, scrollWidth } = content;
      const width = DomHandler.getWidth(content);

      tabView.backwardIsDisabled = scrollLeft === 0;
      tabView.forwardIsDisabled = scrollLeft >= scrollWidth - width;
    };
  }
}
