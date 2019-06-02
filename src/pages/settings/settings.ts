import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsService } from '../../services/settings.service';
import { SettingsModel } from '../../models/settingsModel';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  settingsModel: SettingsModel;
  constructor(public navCtrl: NavController, public navParams: NavParams, public settingsService: SettingsService) {
    this.settingsModel = this.settingsService.$defaultSettings;
  }

  ionViewDidLoad() {
  }

  saveSettings(){
    this.settingsService.$defaultSettings = this.settingsModel;
    this.settingsService.writeNewDefaultSettingToStorage().then(
      () => alert("Settings saved"),
      () => alert("Settings were not saved")
    );
  }

}
