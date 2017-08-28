import { Injectable } from '@angular/core';
import { Word } from '../models/word.model';
import { Http,Response} from '@angular/http'
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {return

  constructor(private http: Http) { }

	getTextFromWebsite(url: string): Promise<string>{
		return Promise.resolve("salam")
	}

	communicate(method :string,path: string, getResponseText: boolean ): any {
		var xhttp = new XMLHttpRequest();
		xhttp.open(method,path , false);
		xhttp.setRequestHeader("Content-type", "application/json;text/plain;charset=UTF-8");
		xhttp.send();
		var header =xhttp.status
		if (getResponseText)return xhttp.responseText
		else if (header === 200)return true
		else return false
	}

	getWordCount(text: string): Promise<string>{

		return Promise.resolve("22")
	}

	public insertToDb(word: Word){
		var words=JSON.stringify(word)	// listFromDb(): void{	// listFromDb(): void{
		var path ="http://localhost:8080/insert"+"/"+words
		this.communicate("POST",path,false)
	}

	protected static handleError(error: any): Promise<void> {
		console.error("An error occurred", error)
		return Promise.reject(error.message || error)
	}

	deleteFromDb(word: Word){
		var wordJson=JSON.stringify(word)	// listFromDb(): void{	// listFromDb(): void{
		var path ="http://localhost:8080/delete/"+wordJson
		var result = this.communicate("POST",path,false)
		if (result){

		}
	}

	listFromDb(){
		var path : string="http://localhost:8080/list"
		var response = JSON.parse(this.communicate("POST",path,true));
	}
	

	encodeString(toEncode: Word, key: string): Promise<Word>{
		var path ="http://localhost:3456/encode/"
		var pathAndInfo=path+toEncode.word+"/"+key
		var response:Word = JSON.parse(this.communicate("POST",pathAndInfo,true))
		return Promise.resolve(response)
	}

	decodeString(toEncode: Word, key: string): Promise<Word>{
		var path ="http://localhost:3456/decode/"
		var pathAndInfo=path+toEncode.encoded+"/"+key
		var response:Word = JSON.parse(this.communicate("POST",pathAndInfo,true))
		return Promise.resolve(response)
	}

	// getFromDb(word: Word): Promise<Whttp://localhost:8080/listord>{
	// 	return Promise.resolve(new Word)http://localhost:8080/list
	// }


}
