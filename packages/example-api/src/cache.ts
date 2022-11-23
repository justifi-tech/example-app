export class InMemoryCache {
  private static instance: InMemoryCache;

  private data: any[] = [];
  private MAX_CACHE_SIZE = 25;

  private constructor() { }

  static getInstance(): InMemoryCache {
    if (!InMemoryCache.instance) {
      InMemoryCache.instance = new InMemoryCache();
    }

    return InMemoryCache.instance;
  }

  add(item: any) {
    this.data = [...this.data.slice(-this.MAX_CACHE_SIZE + 1), item]
  }

  get(): any {
    return this.data
  }
}
