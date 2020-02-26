export class User {

  public id: string;
  public mail: string;
  public createDateTime: Date;
  public updateDateTime:Date;

  constructor(id :string, mail :string, createDateTime :Date,updateDateTime :Date) {
    this.id = id;
    this.mail = mail;
    this.createDateTime = createDateTime;
    this.updateDateTime = updateDateTime;
  }

}
