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
    const subscription = observable.subscribe(observer);
    return subscription;
  }

}