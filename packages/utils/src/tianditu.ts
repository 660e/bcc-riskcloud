import markerPrimary from './assets/tianditu/marker-primary.svg';
import markerSuccess from './assets/tianditu/marker-success.svg';
import markerWarning from './assets/tianditu/marker-warning.svg';
import markerDanger from './assets/tianditu/marker-danger.svg';

import * as I from './interface/tianditu';

export const T = (window as any).T;

const iconSize = new T.Point(25, 41);
const iconAnchor = new T.Point(13, 41);

// 地图类
export class MapClass {
  private map: any;

  private getIconUrl(type: I.TMarkerType) {
    switch (type) {
      case 'primary':
        return markerPrimary;
      case 'success':
        return markerSuccess;
      case 'warning':
        return markerWarning;
      case 'danger':
        return markerDanger;
    }
  }

  /**
   * @description 初始化地图
   * @param options
   * @returns 地图实例
   */
  Init(options: I.TMap) {
    const { el, center, zoom = 10 } = options;

    this.map = new T.Map(el);
    this.map.centerAndZoom(new T.LngLat(center[0], center[1]), zoom);

    return this.map;
  }

  /**
   * @description 创建图像标注
   * @param options
   * @returns 图像标注实例
   */
  Marker(options: I.TMarker) {
    const { lnglat, type = 'primary' } = options;

    const marker = new T.Marker(new T.LngLat(lnglat[0], lnglat[1]), {
      icon: new T.Icon({ iconUrl: this.getIconUrl(type), iconSize, iconAnchor })
    });
    this.map.addOverLay(marker);

    return marker;
  }

  /**
   * @description 创建右键菜单
   * @param options
   * @returns 右键菜单实例
   */
  ContextMenu(options: I.TContextMenu) {
    const { contextMenu, width = 100 } = options;

    const menu = new T.ContextMenu({ width });
    contextMenu.forEach((item: I.TMenuItem) => {
      menu.addItem(new T.MenuItem(item.text, item.callback));
    });
    this.map.addContextMenu(menu);

    return menu;
  }

  /**
   * @description 创建圆覆盖物
   * @param options
   * @returns 圆覆盖物实例
   */
  Circle(options: I.TCircle) {
    const { lnglat, radius = 0 } = options;

    const circle = new T.Circle(new T.LngLat(lnglat[0], lnglat[1]), radius);
    this.map.addOverLay(circle);

    return circle;
  }
}
