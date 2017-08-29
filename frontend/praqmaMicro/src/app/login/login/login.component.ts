import { Component, OnInit } from '@angular/core';
import {Message} from 'primeng/primeng';
import {LoginService} from '../login.service'
import {Word} from '../../models/word.model'
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})

export class LoginComponent implements OnInit {
	msgs: Message[] = [];
	private word : Word
	websiteURL: string;
	returnedText: string;
	wordToSearch: string;
	WordCountButton: string;
	encodeKey: string;
	encodedString: string;
	listFromDb: string;
  logo = '../assets/logo3.png'
	visible: boolean;
	visibleTwo: boolean;
	constructor(private getDataFromMicros: LoginService) { }
		
  ngOnInit() {
		this.WordCountButton="Search not ran yet"
		this.word={word:"",count:"",encoded:""}
  }

	getText(){
		this.getDataFromMicros.getTextFromWebsite(this.websiteURL).then((result: string)=>{
			if (result !== ""){
				this.returnedText=result
				this.showOk()
			}else{
				this.showNotOk
			}
		})
		
	}
	getWordCount(){	
		
		this.word.word=this.wordToSearch
		this.getDataFromMicros.getWordCount(this.wordToSearch,this.returnedText).then((result: string)=>{
			if (result){
				this.WordCountButton=result
				this.showOk()
				this.showNotOk
				this.update()
				
			}else{
				this.showNotOk
			}
		})
	}
	
	encode(){
		if (!this.encodeKey || !this.wordToSearch) {
			this.showNotOk()
			return
		}
		this.getDataFromMicros.encodeString(this.word,this.encodeKey).then((result: Word)=>{
			if (result.encoded){
				this.encodedString=result.encoded
				this.word.encoded=result.encoded
				this.showOk()
				this.update()
			}else{
				this.showNotOk()
			}
		})
		
	}

	showDialog(){
		this.visible=true
	}
	showDialogtwo(){
		this.visibleTwo=true
	}

	showOk(){
		this.msgs.push({severity:'success', summary:'Info Message',detail:'Action succeeded'});
	}

	showNotOk() {
		this.msgs.push({severity:'error', summary:'Error Message',detail:'Action Failed'});
	}

	update(){
		this.word.count=this.WordCountButton
		this.word.encoded=this.encodedString
		this.wordToSearch=this.wordToSearch
	}
}