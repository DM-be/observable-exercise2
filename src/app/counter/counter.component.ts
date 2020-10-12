import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";

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
  // .subscribe() also accepts an anonymous function, the first parameter is the    next value, the next is error, and the last is complete.
  // usually only partial observers are used
  // rewrite this without an explicit observer object.

  // after implementing, adjust the incrementButton to the following behavior:
  // prevent button spamming, don't allow more than one event per second through the stream 
  // log the value of the count variable with an operator (not in subscribe)
  // keep track of the button clicks happening in the 1 second interval, console log it, don't use a global variable

  private observeIncrementButtonClick(): Subscription {

    const observer: Observer = {
      next: () => this.count++
    };
    const observable = new Observable(subscriber => {
      this.incrementButton.onclick = () => subscriber.next();
    });
    const subscription = observable.subscribe(observer);
    return subscription;
  }

  private observeDecrementButtonClick(): Subscription {
    const observer: Observer = {
      next: () => this.count--
    };
    const observable = new Observable(subscriber => {
      this.decrementButton.onclick = () => subscriber.next();
    });
    const subscription = observable.subscribe();
    return subscription;
  }

 
 


}