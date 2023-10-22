import { ContextName } from '../../domain/class/context-name/context-name.class';
import { ContextEntity } from '../../domain/entities/context/context.entity';

export interface IContextRepository {
  findByName(id: ContextName): Promise<ContextEntity>;
}
