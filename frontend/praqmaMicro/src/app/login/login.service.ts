import { Injectable } from '@angular/core';
import { Word } from '../models/word.model';
import { Http,Response} from '@angular/http'
import 'rxjs/add/operator/map';
import { Database } from 'arangojs';

import { environment } from '../../environments/environment';

@Injectable()
export class LoginService {
  constructor(private http: Http) { 
	}


	getTextFromWebsite(url: string): Promise<string>{
		var path = environment.endpointScrape
		var body="/?link=http://www."+url
		return Promise.resolve(this.communicate("GET",body,path,true))
	}

	communicate(method :string,body:string,path: string, getResponseText: boolean ): any {
		var xhttp = new XMLHttpRequest();		
		xhttp.open(method,path , false);		
		xhttp.setRequestHeader("Content-type", "text/html");	
		xhttp.setRequestHeader("Access-Control-Request-Method",method);	
		xhttp.setRequestHeader("Access-Control-Request-Headers"," X-PINGOTHER");
		xhttp.setRequestHeader("Access-Control-Allow-Origin"," *");
		
		xhttp.send(body);
		var header =xhttp.status
		if (getResponseText)return xhttp.responseText
		else if (header === 200)return true
		else return false
	}

	getWordCount(word: string,text: string): Promise<string>{
		var path = environment.endpointCounter
		var body="/?word="+word+"&text="+text
		return Promise.resolve(this.communicate("GET",body,path,true))
	}
	
	encodeString(toEncode: Word, key: string): Promise<Word>{
		var path =environment.endpointEncoder+"/encode/"
		var body=toEncode.word+"/"+key
		var response:Word = JSON.parse(this.communicate("POST",body,path,true))
		return Promise.resolve(response)
	}

	decodeString(toEncode: Word, key: string): Promise<Word>{
		var path =environment.endpointEncoder+"/decode/"
		var body =toEncode.encoded+"/"+key
		var response:Word = JSON.parse(this.communicate("POST",body,path,true))
		return Promise.resolve(response)
	}

}
