export class SplitInChunkReducer<T> {
  private _currentChunkId = 0;
  private _isLastChunk = false;
  private _lastChunkId: number;
  readonly chunks: T[][];

  constructor(readonly chunkSize: number, total: number) {
    this._lastChunkId = Math.ceil(total / chunkSize);
    this.chunks = new Array(this._lastChunkId).fill([]);
  }

  set(data: T) {
    this._updateCurrentChunkId();
    this.chunks[this._currentChunkId].push(data);
  }

  private _updateCurrentChunkId() {
    if (this._getCurrentChunkSize() >= this.chunkSize) this._nextChunk();
  }

  private _nextChunk() {
    this._currentChunkId = this._currentChunkId + 1;
  }

  private _getCurrentChunkSize() {
    return this.chunks[this._currentChunkId].length - 1;
  }
}
