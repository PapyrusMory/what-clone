import { modelOptions, prop, getModelForClass } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { timestamps: true } })
export class Messaging {
  public _id?: string
  @prop()
  public name?: string
  @prop()
  public message?: string
  @prop()
  public timestamp?: string
  @prop()
  public received?: boolean
}

export const MessagingModel = getModelForClass(Messaging)
