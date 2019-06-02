import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TradeListService } from '../../services/tradeList.service';
import { NumberFormatter } from '../../services/numberFormatter.service';

/**
 * Generated class for the TradeListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trade-list',
  templateUrl: 'trade-list.html',
})
export class TradeListPage {

  constructor(private alertController: AlertController, public navCtrl: NavController, public navParams: NavParams, public tradeListService: TradeListService, private numberFormatter: NumberFormatter) {
  }

  ionViewDidLoad() {
  }

  delete(index: number){
    this.tradeListService.removeItem(index);
  }

  clear(){
    let alert = this.alertController.create({
      title: 'Clear List',
      message: 'Do you want to clear the list?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Clear',
          handler: () => {
            this.tradeListService.clearList();
          }
        }
      ]
    });
    alert.present();
  }

}
