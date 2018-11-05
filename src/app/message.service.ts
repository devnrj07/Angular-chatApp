import { Injectable } from '@angular/core';
import { Subject, Observable  } from 'rxjs';
import { Message } from './message.model';
import { Thread } from './thread.model';
import { User } from './user.model';
import {map} from 'rxjs/operators/map';

const initialMessages:Message[]=[];

interface IMO extends Function {
  (messages: Message[]): Message[];
}


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  newMessage: Subject<Message> = new Subject<Message>();
  create : Subject<Message> = new Subject<Message>(); //action stream
  updates : Subject<any> = new Subject<any>();  //update stream
  Read :Subject<any> = new Subject<any>();
 
 
 
  constructor() { this.messages = this.updates
    .scan((messages: Message[],
         operation: IMO) => { 
   return operation(messages);},initialMessages).publishReplay(1).refCount();
  
   //create 
   this.create.map(function(message:Message):IMO{
    return (message:Message[])=>{
      return message.concat(message);
    }
  }).subscribe(this.updates); //hooking it up with update stream {Here update will listen to create before sending message}
  
  
  //linking to the new messages
  this.newMessage.subscribe(this.create);
  
  
  
  this.Read.map((thread:Thread)=>{

    return MessageService.map((message: Message)=>{
     
      if(message.thread.id===thread.id){
        message.isRead=true;
      }
      return message;
    });
  }).subscribe(this.updates);

  }

 
 
   

  addMessage(message: Message){this.newMessage.next(message);}

  FilteredMeassges(thread: Thread, user: User):Observable<Message>{

   return  this.newMessage.filter((message:Message)=>  //returns array of messages
    {  //meesages belongs to this thread
       // and isn't sent by this.user
      return  ((message.thread.id==thread.id)&&(message.author.id!==user.id));

    });


  }

}

export const messageServiceInjectables: Array<any> = [MessageService];
 
  




 