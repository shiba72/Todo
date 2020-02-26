export class List {

  public id: string;
  public UserId: string;
  public createDateTime: Date;
  public updateDateTime:Date;
  public title: string;
  public content: string;
  public status: string;

  constructor(id :string, userId :string, createDateTime :Date,updateDateTime :Date,title: string,content: string,status: string) {
    this.id = id;
    this.UserId = userId;
    this.createDateTime = createDateTime;
    this.updateDateTime = updateDateTime;
    this.title = title;
    this.content = content;
    this.status = status;
  }

}
