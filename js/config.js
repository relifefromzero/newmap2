// config.js
// 高德地图配置和全局常量

const MapConfig = {
    // API密钥
    key: '02e4976e38eb8bc8bcf71a9c485cc2ae',
    
    // 地图初始配置
    mapConfig: {
        zoom: 13,
        center: [116.397428, 39.90923], // 北京天安门
        viewMode: '3D'
    },
    
    // 标记样式配置
    markerStyles: {
        point: {
            background: '#FF6B6B',
            color: 'white',
            size: 24
        },
        currentLocation: {
            // 使用本地“我的位置”图标（统一为 地图icon 目录 2X 版本）
            icon: '../images/工地数字导航小程序切图/司机/2X/地图icon/我的位置.png'
        },
            headingLocation: {
                // 首页与导航实时定位统一使用“司机/2X/地图icon/我的位置.png”
                icon: '../images/工地数字导航小程序切图/司机/2X/地图icon/我的位置.png',
                size: { w: 30, h: 30 },
                rotationOffset: 0
            },
        destination: {
            // 使用本地“终点”图标（用于通用目的地标记，如搜索结果）
            icon: '../images/工地数字导航小程序切图/司机/2X/地图icon/终点.png'
        },
        navigation: {
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/car.png'
        }
    },
    
    // 路径样式配置
    routeStyles: {
        polyline: {
            strokeColor: '#3366FF',
            strokeWeight: 4,
            strokeOpacity: 0.8
        },
        polygon: {
            strokeColor: '#FF6633',
            strokeWeight: 2,
            strokeOpacity: 0.8,
            fillColor: '#FF6633',
            fillOpacity: 0.3
        },
        navigation: {
            strokeColor: '#3366FF',
            strokeWeight: 6,
            strokeOpacity: 0.8
        }
    }
};

// 全局变量
let map;
let markers = [];
let currentPosition = null;
let waypoints = [];
let currentRoute = null;
let kmlLayers = [];
let currentKmlFile = null;
// 实时定位与方向相关（首页地图）
let isRealtimeLocating = false;     // 是否处于实时定位模式
let selfMarker = null;              // “自身位置”可旋转箭头标记
let locationWatchId = null;         // geolocation.watchPosition 的ID
let lastDeviceHeadingIndex = null;  // 设备方向（0-360）
let deviceOrientationHandlerIndex = null; // 方向事件回调引用
let trackingDeviceOrientationIndex = false; // 是否正在监听设备方向
let lastGpsPosIndex = null;         // 上一次GPS坐标（用于朝向回退）
let initialLocationMarker = null;   // 首次一次性定位生成的标记引用（用于避免与实时标记重复）