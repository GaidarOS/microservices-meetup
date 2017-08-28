import { Injectable } from '@angular/core';
import { Word } from '../models/word.model';
import { Http,Response} from '@angular/http'
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

@Injectable()
export class LoginService {return

  constructor(private http: Http) { }

	getTextFromWebsite(url: string): Promise<string>{
		var path = environment.endpointScrape+"/?link=http://www."+url
		return Promise.resolve(this.communicate("GET",path,true))
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

	getWordCount(word: string,text: string): Promise<string>{
		var path = environment.endpointCounter+"/?word="+word+"&text="+text
		return Promise.resolve(this.communicate("GET",path,true))
	}

	public insertToDb(word: Word){
		var words=JSON.stringify(word)	// listFromDb(): void{	// listFromDb(): void{
		var path =environment.endpointDatabase+"/insert/"+words
		this.communicate("POST",path,false)
	}

	protected static handleError(error: any): Promise<void> {
		console.error("An error occurred", error)
		return Promise.reject(error.message || error)
	}

	deleteFromDb(word: Word){
		var wordJson=JSON.stringify(word)	// listFromDb(): void{	// listFromDb(): void{
		var path =environment.endpointDatabase+"/delete/"+wordJson
		var result = this.communicate("POST",path,false)
		if (result){

		}
	}

	listFromDb(){
		var path : string=environment.endpointDatabase+"/list"
		var response = JSON.parse(this.communicate("POST",path,true));
	}
	

	encodeString(toEncode: Word, key: string): Promise<Word>{
		var path =environment.endpointEncoder+"/encode/"
		var pathAndInfo=path+toEncode.word+"/"+key
		var response:Word = JSON.parse(this.communicate("POST",pathAndInfo,true))
		return Promise.resolve(response)
	}

	decodeString(toEncode: Word, key: string): Promise<Word>{
		var path =environment.endpointEncoder+"/decode/"
		var pathAndInfo=path+toEncode.encoded+"/"+key
		var response:Word = JSON.parse(this.communicate("POST",pathAndInfo,true))
		return Promise.resolve(response)
	}

	// getFromDb(word: Word): Promise<Whttp://localhost:8080/listord>{
	// 	return Promise.resolve(new Word)http://localhost:8080/list
	// }


}
