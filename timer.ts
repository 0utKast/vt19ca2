import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'countdown',
  template: '<h1>Quedan: {{seconds}}</h1>',
  styles: ['h1 { color: #900 }'],
  encapsulation: ViewEncapsulation.Emulated
})
class CountdownComponent {
  @Input() seconds: number;
  intervalId: number;
  @Output() complete: EventEmitter<any> = new EventEmitter();
  @Output() progress: EventEmitter<number> = new EventEmitter();

  constructor() {
    this.intervalId = setInterval(() => this.tick(), 1000);
  }

  private tick(): void {
    if (--this.seconds < 1) {
      clearTimeout(this.intervalId);
      this.complete.emit(null);
    }
    this.progress.emit(this.seconds);
  }
}

@Component({
  selector: 'timer',
  directives: [CountdownComponent],
  templateUrl: './timer.html'
})
class TimerComponent {
  onCountdownCompleted(): void {
    alert('¡Tiempo Acabado!');
  }
}

bootstrap(TimerComponent);
