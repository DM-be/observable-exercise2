import { Component, OnDestroy, OnInit } from "@angular/core";
import { fromEvent, Observable, Subscription } from "rxjs";

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


  // recreate the counter exercise using a creation operator
  // .subscribe() also accepts an anonymous function, the first parameter is the next value, the next is error, and the last is complete.
  // usually only partial observers are used
  // rewrite this without an explicit observer object.
  private observeIncrementButtonClick(): Subscription {
    const observable = fromEvent(this.incrementButton, 'click');
    const subscription = observable.subscribe(() => this.count++);
    return subscription;
  }

  private observeDecrementButtonClick(): Subscription {
    const observable = fromEvent(this.decrementButton, 'click');
    const subscription = observable.subscribe(() => this.count--);
    return subscription;
  }

  // add a pipeable operator, logging the value of the count variable but not doing anything




}