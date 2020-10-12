import { Component, OnDestroy, OnInit } from "@angular/core";
import { fromEvent, Observable, Subscription } from "rxjs";
import { map, scan, tap, throttleTime } from "rxjs/operators";


interface MouseClickWithCount {
  x: number;
  y: number;
  count: number;
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


  
  // .subscribe() also accepts an anonymous function, the first parameter is the    next value, the next is error, and the last is complete.
  // usually only partial observers are used
  // rewrite this without an explicit observer object.

  // after implementing, adjust the incrementButton to the following behavior:
  // prevent button spamming, don't allow more than one event per second through the stream 
  // log the value of the count variable with an operator (not in subscribe)
  // keep track of the button clicks happening in the 1 second interval, console log it, don't use a global variable

  private observeIncrementButtonClick(): Subscription {
    const observable = this.observableFromButtonClickEvent(this.incrementButton);
    const subscription = observable.pipe(
      scan((numberOfClicks: number) => {
        console.log(numberOfClicks);
        return numberOfClicks + 1;
      }, 0),
      throttleTime(1000),
      tap(() => console.log(this.count))
    ).subscribe(() => this.count++)
    return subscription;
  }


  // also prevent button spamming
  // this time, create a new object containing the count variabele,  the event x and y coordinates and log it in the observer
  // (decrementing count is still the role of the observer)

  private observeDecrementButtonClick(): Subscription {
    const observable = this.observableFromButtonClickEvent(this.decrementButton);
    const subscription = observable.pipe(
      throttleTime(1000),
      map((event: MouseEvent) => {
        return {
          count: this.count,
          x: event.clientX,
          y: event.clientY
        } as MouseClickWithCount
      })
    ).subscribe((mouseClickWithCount: MouseClickWithCount) => {
      this.count--;
      console.log(mouseClickWithCount);
    }
    )
    return subscription;
  }

  




}