import { ElMessage } from 'element-plus';
import { TDT } from './interface/tianditu';
import { isString } from './is';
import * as turf from '@turf/turf';

import markerPrimary from './assets/tianditu/marker-primary.svg';
import markerSuccess from './assets/tianditu/marker-success.svg';
import markerWarning from './assets/tianditu/marker-warning.svg';
import markerDanger from './assets/tianditu/marker-danger.svg';

export const T = (window as any).T;

const iconSize = new T.Point(25, 41);
const iconAnchor = new T.Point(13, 41);

// 地图类
export class MapClass {
  private map: any;

  private getIconUrl(icon: TDT.Icon) {
    switch (icon) {
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
   * @param container 用于显示地图的对象id
   * @param center 地图的初始化中心点
   * @param zoom 地图的初始化级别
   * @returns 地图实例
   */
  Init(container: string, center: TDT.LngLat, zoom: number = 10) {
    const zoomControl = new T.Control.Zoom();
    zoomControl.setOptions({ position: 'bottomleft' });

    this.map = new T.Map(container);
    this.map.centerAndZoom(this.LngLat(center), zoom);
    this.map.addControl(zoomControl);
    this.map.addControl(new T.Control.MapType());

    this.map.addEventListener('addoverlay', ({ addoverlay }) => {
      if (addoverlay.getType() === 2) {
        if (isString(addoverlay.options.title)) {
          addoverlay.Fr.title = addoverlay.options.title;
        } else {
          addoverlay.Fr.title = addoverlay.options.title.label || '';
        }
      }
    });

    return this.map;
  }

  /**
   * @param lnglat 地理经纬度
   * @returns 地理位置坐标点
   */
  LngLat(lnglat: TDT.LngLat) {
    return new T.LngLat(lnglat[0], lnglat[1]);
  }

  /**
   * @param lnglat 地理经纬度
   * @param icon 图标
   * @param params 额外参数
   * @returns 图像标注实例
   */
  Marker(lnglat: TDT.LngLat, icon: TDT.Icon = 'primary', params: any = {}) {
    return new T.Marker(this.LngLat(lnglat), {
      icon: new T.Icon({ iconUrl: this.getIconUrl(icon), iconSize, iconAnchor }),
      title: params
    });
  }

  /**
   * @param contextMenu 菜单
   * @param width 菜单项的宽度
   * @returns 右键菜单实例
   */
  ContextMenu(contextMenu: TDT.MenuItem[], width: number = 100) {
    const menu = new T.ContextMenu({ width });
    contextMenu.push({
      text: '获取当前坐标',
      callback: (lnglat: any) => {
        const text = `${lnglat.lng}, ${lnglat.lat}`;
        navigator.clipboard.writeText(text).then(() => ElMessage.success(`已复制 ${text} 到剪贴板`));
      }
    });
    contextMenu.forEach((item: TDT.MenuItem) => {
      menu.addItem(new T.MenuItem(item.text, item.callback));
    });

    return menu;
  }

  /**
   * @param center 圆心经纬度坐标
   * @param radius 圆的半径（米）
   * @param opts
   * @returns 圆覆盖物实例
   */
  Circle(center: TDT.LngLat, radius: number = 0, opts?: TDT.CircleOptions) {
    return new T.Circle(this.LngLat(center), radius, opts);
  }

  /**
   * @param point 点
   * @param center 圆心经纬度坐标
   * @param radius 圆的半径（米）
   * @returns 点是否在范围内
   */
  PointInCircle(point: TDT.LngLat, center: TDT.LngLat, radius: number) {
    return radius >= turf.distance(turf.point(point), turf.point(center), { units: 'meters' });
  }

  /**
   * @param pointA A点经纬度坐标
   * @param pointB B点经纬度坐标
   * @returns 两点距离（米）
   */
  PointToPointDistance(pointA: TDT.LngLat, pointB: TDT.LngLat) {
    return Math.round(turf.distance(turf.point(pointA), turf.point(pointB), { units: 'meters' }));
  }

  /**
   * @param x 点距离容器左侧距离（px）
   * @param y 点距离容器顶部距离（px）
   * @returns 转换为经纬度坐标
   */
  ContainerPointToLngLat(x: number, y: number): TDT.LngLat {
    const lnglat: any = this.map.containerPointToLngLat(new T.Point(x, y));
    return [lnglat.lng, lnglat.lat];
  }
}
