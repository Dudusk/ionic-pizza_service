import { Component } from '@angular/core';

import { NewPizzaPage } from '../new-pizza/new-pizza';
import { HomePage } from '../home/home';
import { AdminPage } from '../admin/admin';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = NewPizzaPage;
  tab3Root = AdminPage;

  constructor() {

  }
}
