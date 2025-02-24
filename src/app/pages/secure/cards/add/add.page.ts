import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  identityTriggerForm: FormGroup;
  submit_attempt: boolean = false;

  newAlias = '';
  newKeyword = '';
  newTag = '';
  newChannel = '';

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.identityTriggerForm = this.formBuilder.group({
      name: ['', Validators.required],
      platform: ['', Validators.required],
      aliases: [[]],
      keywords: [[]],
      tags: [[]],
      suspectChannels: [[]]
    });
  }

  // Aggiunta di elementi dinamici
  addAlias() {
    if (this.newAlias.trim() !== '') {
      this.identityTriggerForm.controls.aliases.value.push(this.newAlias);
      this.newAlias = '';
    }
  }

  removeAlias(alias: string) {
    this.identityTriggerForm.controls.aliases.setValue(
      this.identityTriggerForm.controls.aliases.value.filter(a => a !== alias)
    );
  }

  addKeyword() {
    if (this.newKeyword.trim() !== '') {
      this.identityTriggerForm.controls.keywords.value.push(this.newKeyword);
      this.newKeyword = '';
    }
  }

  removeKeyword(keyword: string) {
    this.identityTriggerForm.controls.keywords.setValue(
      this.identityTriggerForm.controls.keywords.value.filter(k => k !== keyword)
    );
  }

  addTag() {
    if (this.newTag.trim() !== '') {
      this.identityTriggerForm.controls.tags.value.push(this.newTag);
      this.newTag = '';
    }
  }

  removeTag(tag: string) {
    this.identityTriggerForm.controls.tags.setValue(
      this.identityTriggerForm.controls.tags.value.filter(t => t !== tag)
    );
  }

  addChannel() {
    if (this.newChannel.trim() !== '') {
      this.identityTriggerForm.controls.suspectChannels.value.push(this.newChannel);
      this.newChannel = '';
    }
  }

  removeChannel(channel: string) {
    this.identityTriggerForm.controls.suspectChannels.setValue(
      this.identityTriggerForm.controls.suspectChannels.value.filter(c => c !== channel)
    );
  }

  cancel() {
    this.modalController.dismiss();
  }

  async save() {
    this.submit_attempt = true;

    if (this.identityTriggerForm.valid) {
      this.modalController.dismiss({
        identityTrigger: this.identityTriggerForm.value
      });
    }
  }
}
