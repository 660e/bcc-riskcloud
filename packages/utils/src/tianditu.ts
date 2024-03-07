import markerPrimary from './assets/tianditu/marker-primary.svg';
import markerSuccess from './assets/tianditu/marker-success.svg';
import markerWarning from './assets/tianditu/marker-warning.svg';
import markerDanger from './assets/tianditu/marker-danger.svg';

import { TDT } from './interface/tianditu';

export const T = (window as any).T;

const iconSize = new T.Point(25, 41);
const iconAnchor = new T.Point(13, 41);

// 地图类
export class MapClass {
  private map: any;

  private getIconUrl(type: TDT.MarkerType) {
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
  Init(options: TDT.MapOptions) {
    const { el, center, zoom = 10 } = options;

    this.map = new T.Map(el);
    this.map.centerAndZoom(this.LngLat(center), zoom);

    return this.map;
  }

  /**
   * @description 创建地理位置坐标
   * @param lnglat 坐标
   * @returns 地理位置坐标实例
   */
  LngLat(lnglat: TDT.LngLat) {
    return new T.LngLat(lnglat[0], lnglat[1]);
  }

  /**
   * @description 创建图像标注
   * @param options
   * @returns 图像标注实例
   */
  Marker(options: TDT.MarkerOptions) {
    const { lnglat, type = 'primary' } = options;

    const marker = new T.Marker(this.LngLat(lnglat), {
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
  ContextMenu(options: TDT.ContextMenuOptions) {
    const { contextMenu, width = 100 } = options;

    const menu = new T.ContextMenu({ width });
    contextMenu.forEach((item: TDT.MenuItemOptions) => {
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
  Circle(options: TDT.CircleOptions) {
    const { lnglat, radius = 0 } = options;

    const circle = new T.Circle(this.LngLat(lnglat), radius);
    this.map.addOverLay(circle);

    return circle;
  }
}
