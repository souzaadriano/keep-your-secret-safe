import { Nullable } from '@/global';

export abstract class ListUtils {
  static union<T>(...lists: Nullable<T>[][]) {
    return lists.filter(Boolean).reduce((payload, list) => {
      payload.push(...list);
      return payload;
    }, []);
  }
}
