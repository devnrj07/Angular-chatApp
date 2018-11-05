import { uuid } from "util/uuid";

export class User {
  id:string;

  constructor(public name:string, AvatarSrc :string){
      this.id=uuid();
  }

}
