import { ObjectUnsubscribedError } from "rxjs";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";

export class Thread {
  
     id:string;
     name:string;
     lastMess:Message;
     AvatarSrc:string;

     constructor(id?:string,name?:string,AvatarSrc?:string,){

        this.id = id || uuid();
        this.name=name;
        this.AvatarSrc=AvatarSrc
     }


}
