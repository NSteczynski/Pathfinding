export default class Timer {
  private _start: number
  private _remainingTime: number
  private _timer: NodeJS.Timeout
  private _callback: () => void

  /**
   * Creates a new timer with callback.
   * @param callback The callback.
   * @param time The time in ms.
   */
  public constructor(callback: () => void, time: number) {
    this._callback = callback
    this._remainingTime = time
    this.resume()
  }

  public pause(): void {
    clearTimeout(this._timer)
    this._remainingTime -= Date.now() - this._start
  }

  public resume(): void {
    if (this._remainingTime < -200)
      return undefined
    this._start = Date.now()
    clearTimeout(this._timer)
    this._timer = setTimeout(this._callback, this._remainingTime)
  }

  public clear(): void {
    clearTimeout(this._timer)
  }
}