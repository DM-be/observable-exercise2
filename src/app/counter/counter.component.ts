import { Component, OnDestroy, OnInit } from "@angular/core";
import { fromEvent, Observable, Subscription } from "rxjs";
import { tap, throttleTime } from "rxjs/operators";

interface Observer {
  next: (value?: any) => void;
  error?: (error: any) => void;
  complete?: () => void;
}
@Component({
  selector: "app-counter",
  templateUrl: "./counter.component.html",
  styleUrls: ["./counter.component.css"]
})
export class CounterComponent implements OnInit, OnDestroy {
  public count: number = 0;
  private incrementButton: HTMLButtonElement;
  private decrementButton: HTMLButtonElement;
  private incrementButtonClickSubscription: Subscription;
  private decrementButtonClickSubscription: Subscription;

  constructor() {}
  ngOnDestroy(): void {
    this.incrementButtonClickSubscription.unsubscribe();
  }

  ngOnInit() {
    this.incrementButton = document.querySelector("#incrementBtn");
    this.decrementButton = document.querySelector("#decrementBtn");
    this.incrementButtonClickSubscription = this.observeIncrementButtonClick();
    this.decrementButtonClickSubscription = this.observeDecrementButtonClick();
  }


  
  private observableFromButtonClickEvent(button: HTMLButtonElement): Observable<Event> {
    return fromEvent(button, 'click');
  }


  
  // .subscribe() also accepts an anonymous function, the first parameter is the next value, the next is error, and the last is complete.
  // usually only partial observers are used
  // rewrite this without an explicit observer object.

  // after implementing, adjust the incrementButton to the following behavior:
  // 1: prevent button spamming, don't allow more than one event per second through the stream 
  // 2: log the value of the count variable, continue the chain
  // 3: 

  private observeIncrementButtonClick(): Subscription {
    const observable = this.observableFromButtonClickEvent(this.incrementButton);
    const subscription = observable.pipe(
      throttleTime(1000),
      tap(() => console.log(this.count))
    ).subscribe(() => this.count++)
   // const subscription = observable.subscribe(() => this.count++);
    return subscription;
  }


  private observeDecrementButtonClick(): Subscription {
    const observable = this.observableFromButtonClickEvent(this.decrementButton);
    const subscription = observable.subscribe(() => this.count--);
    return subscription;
  }

  // add a pipeable operator, logging the value of the count variable but not doing anything




}