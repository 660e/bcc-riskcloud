import markerPrimary from './assets/tianditu/marker-primary.svg';
import markerSuccess from './assets/tianditu/marker-success.svg';
import markerWarning from './assets/tianditu/marker-warning.svg';
import markerDanger from './assets/tianditu/marker-danger.svg';

import * as I from './interface/tianditu';

export const T = (window as any).T;

const iconSize = new T.Point(25, 41);
const iconAnchor = new T.Point(13, 41);

// 地图类
export class Map {
  private M: any;

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
    this.M = new T.Map(options.el);
    this.M.centerAndZoom(new T.LngLat(options.center[0], options.center[1]), options.zoom);

    return this.M;
  }

  /**
   * @description 创建图像标注
   * @param options
   * @returns 图像标注实例
   */
  Marker(options: I.TMarker) {
    const marker = new T.Marker(new T.LngLat(options.lnglat[0], options.lnglat[1]), {
      icon: new T.Icon({ iconUrl: this.getIconUrl(options.type), iconSize, iconAnchor })
    });
    this.M.addOverLay(marker);

    return marker;
  }

  /**
   * @description 创建右键菜单
   * @param options
   * @returns 右键菜单实例
   */
  ContextMenu(options: I.TContextMenu) {
    const contextMenu = new T.ContextMenu({ width: options.width });
    options.contextMenu.forEach((item: I.TMenuItem) => {
      contextMenu.addItem(new T.MenuItem(item.text, item.callback));
    });
    this.M.addContextMenu(contextMenu);

    return contextMenu;
  }

  /**
   * @description 创建圆覆盖物
   * @param options
   * @returns 圆覆盖物实例
   */
  Circle(options: I.TCircle) {
    const circle = new T.Circle(new T.LngLat(options.lnglat[0], options.lnglat[1]), options.radius);
    this.M.addOverLay(circle);

    return circle;
  }
}
