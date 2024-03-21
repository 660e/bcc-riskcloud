import { ElMessage } from 'element-plus';
import { TDT } from './interface/tianditu';
import axios from 'axios';
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
   * @description 初始化地图
   * @param container 用于显示地图的对象id
   * @param center 地图的初始化中心点
   * @param zoom 地图的初始化级别
   */
  Init(container: string, center: TDT.LngLat = [0, 0], zoom: number = 10) {
    this.map = new T.Map(container);

    const mapTypeControl = new T.Control.MapType();
    const zoomControl = new T.Control.Zoom();

    mapTypeControl.setOptions({ position: 'bottomright' });
    zoomControl.setOptions({ position: 'bottomright' });

    this.map.centerAndZoom(this.LngLat(center), zoom);
    this.map.addControl(mapTypeControl);
    this.map.addControl(zoomControl);
    this.map.addEventListener('addoverlay', ({ addoverlay }) => {
      if (addoverlay.getType && addoverlay.getType() === 2) addoverlay.Fr.title = '';
    });

    return this.map;
  }

  /**
   * @description 获取地理位置坐标点
   * @param lnglat 地理经纬度
   */
  LngLat(lnglat: TDT.LngLat) {
    return new T.LngLat(lnglat[0], lnglat[1]);
  }

  /**
   * @description 图像标注
   * @param lnglat 地理经纬度
   * @param icon 图标
   * @param params 额外参数
   */
  Marker(lnglat: TDT.LngLat, icon: TDT.Icon = 'primary', params: { [key: string]: any } = {}) {
    return new T.Marker(this.LngLat(lnglat), {
      icon: new T.Icon({ iconUrl: this.getIconUrl(icon), iconSize, iconAnchor }),
      title: params
    });
  }

  /**
   * @description 右键菜单
   * @param contextMenu 菜单
   * @param width 菜单项的宽度
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
   * @description 圆覆盖物
   * @param center 圆心经纬度坐标
   * @param radius 圆的半径（米）
   * @param opts
   */
  Circle(center: TDT.LngLat, radius: number = 0, opts?: TDT.CircleOptions) {
    return new T.Circle(this.LngLat(center), radius, opts);
  }

  /**
   * @description 多边形覆盖物
   * @param points 坐标数组
   * @param opts
   */
  Polygon(points: TDT.LngLat[], opts?: TDT.PolygonOptions) {
    return new T.Polygon(
      points.map(point => this.LngLat(point)),
      opts
    );
  }

  /**
   * @description 判断点是否在范围内
   * @param point 点
   * @param center 圆心经纬度坐标
   * @param radius 圆的半径（米）
   */
  PointInCircle(point: TDT.LngLat, center: TDT.LngLat, radius: number) {
    return radius >= turf.distance(turf.point(point), turf.point(center), { units: 'meters' });
  }

  /**
   * @description 获取两点距离（米）
   * @param pointA A点经纬度坐标
   * @param pointB B点经纬度坐标
   */
  PointToPointDistance(pointA: TDT.LngLat, pointB: TDT.LngLat) {
    return Math.round(turf.distance(turf.point(pointA), turf.point(pointB), { units: 'meters' }));
  }

  /**
   * @description px转换为经纬度坐标
   * @param x 点距离容器左侧距离（px）
   * @param y 点距离容器顶部距离（px）
   */
  ContainerPointToLngLat(x: number, y: number): TDT.LngLat {
    const lnglat: any = this.map.containerPointToLngLat(new T.Point(x, y));
    return [lnglat.lng, lnglat.lat];
  }

  /**
   * @description 获取行政区划信息
   * @param code 行政区划代码
   * @param level 行政区划层级
   */
  GetGeoJson(code: number, level: TDT.Level) {
    return new Promise(async resolve => {
      if (level === 'district') {
        const geo = await axios.get(`https://geo.datav.aliyun.com/areas_v3/bound/${code}.json`);
        resolve(geo.data.features[0]);
      } else {
        const geo1 = await axios.get(`https://geo.datav.aliyun.com/areas_v3/bound/${code}.json`);
        const geo2 = await axios.get(`https://geo.datav.aliyun.com/areas_v3/bound/${code}_full.json`);
        geo1.data.features[0].children = geo2.data.features;
        resolve(geo1.data.features[0]);
      }
    });
  }
}
