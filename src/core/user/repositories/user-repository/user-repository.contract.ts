import { Email } from '@/core/shared/class/email/email.class';
import { Pagination } from '@/core/shared/class/pagination/pagination.class';
import { Uuid } from '@/core/shared/class/uuid/uuid.class';
import { UserEntity } from '../../domain/entities/user.entity';

export interface IUserRepository {
  list(pagination: Pagination): Promise<UserEntity[]>;
  findById(id: Uuid): Promise<UserEntity | null>;
  findByEmail(email: Email): Promise<UserEntity | null>;
  find(params: FindParams): Promise<UserEntity[]>;
  save(user: UserEntity): Promise<void>;
  update(user: UserEntity): Promise<void>;
  softDelete(user: UserEntity): Promise<void>;
}

type FindParams = {
  pagination: Pagination;
};
