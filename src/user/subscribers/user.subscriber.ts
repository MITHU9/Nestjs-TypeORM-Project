import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcryptjs';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  beforeInsert(event: InsertEvent<User>) {
    console.log(`BEFORE USER INSERTED: `, event.entity);

    // Hash the password before saving to the database
    const user = event.entity;
    const hashPassword = bcrypt.hashSync(user.password, 10);
    user.password = hashPassword;
  }
}
