import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent implements OnInit {

  @ViewChild('myRect', {static: true}) myRect: ElementRef;

  top = 40;
  left = 40;

  constructor() { }

  ngOnInit() {
    const mouseDown = fromEvent(this.myRect.nativeElement, 'mousedown');
    const mouseMove = fromEvent(document, 'mousemove');
    const mouseUp = fromEvent(document, 'mouseup');

    mouseDown.subscribe((downEvent: MouseEvent) => {
      let mouseDownX = downEvent.screenX;
      let mouseDownY = downEvent.screenY;

      mouseMove.pipe(takeUntil(mouseUp)).subscribe((moveEvent: MouseEvent) => {
        const offsetX = mouseDownX - moveEvent.screenX;
        const offsetY = mouseDownY - moveEvent.screenY;
        this.left -= offsetX;
        this.top -= offsetY;
        mouseDownX = moveEvent.screenX;
        mouseDownY = moveEvent.screenY;
      });
    });
  }

}
