import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class InfoService implements OnDestroy {

  private toast = new BehaviorSubject<boolean>(false);
  toast$ = this.toast.asObservable();

  private contentToast = new BehaviorSubject<string>('');
  contentToast$ = this.contentToast.asObservable();

  constructor() {
  }

  showToast(key: string, time: number = 750) {
    this.toast.next(true);
    this.contentToast.next(key);
    setTimeout(() => {
      this.closeToast();
    }, time);
  }

  closeToast() {
    this.toast.next(false);
    // this.contentToast.next('');
  }

  ngOnDestroy(): void {
    this.contentToast.complete();
    this.toast.complete();
  }

}
