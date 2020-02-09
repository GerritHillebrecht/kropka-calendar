import { Component, OnInit, Input } from '@angular/core';
import { ScreenSizeService } from '@app/core/services/utility';

@Component({
  selector: 'app-image-header',
  templateUrl: './image-header.component.html',
  styleUrls: ['./image-header.component.scss']
})
export class ImageHeaderComponent implements OnInit {
  @Input() headerBackgroundImage: string =
    '../../../../assets/images/background/patrick-hendry-FJc8DIDMGek-small.jpg';

  @Input() headerHeight: string = '40vh';
  @Input() headerMask: boolean = true;

  constructor(public screenSizeService: ScreenSizeService) {
    this.screenSizeService.isPhone$.subscribe(
      isPhone => (this.headerHeight = isPhone ? '25vh' : '40vh')
    );
  }

  ngOnInit() {}
}
