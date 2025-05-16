import homeIcon from '@/assets/home.svg'
import homeFillIcon from '@/assets/home-fill.svg'
import personalIcon from '@/assets/personal.svg'
import personalFillIcon from '@/assets/personal-fill.svg'
export default {
  // pageConfig: {
  //   Home: {},
  //   Personal: {},
  // },
  globalConfig: {
    layoutMode: 'grid',
    color: 'rgba(126,211,33,1)',
    emptyColor: 'rgba(144,19,254,1)',
    bubbleColor: 'rgba(80,227,194,1)',
    loginBg: '',
    topbarShow: 1,
    tabbarShow: 1,
  },
  pageConfig: {
    Home: {
      layoutMode: 'grid',
      topbarShow: 1,
      tabbarShow: 1,
    },
    Personal: {
      layoutMode: 'grid',
      topbarShow: 1,
      tabbarShow: 1,
    },
  },
  body: {
    Home: [
      {
        _uuid: 12,
        _name: '菜单',
        _view: 'container',
        _schema: 'container',
        isShow: true,
        grid: 1,
        style: { width: 375, height: 500 },
        list: [
          {
            _uuid: 13,
            _name: '菜单项',
            _view: 'menuItem',
            _schema: 'menuItem',
            _router: 'canTeenOrder',
            isShow: true,
            title: '菜单1',
            style: {},
            rect: { x: 0, y: 0, w: 12, h: 10 },
          },
        ],
      },
      {
        _uuid: 14,
        _name: '菜单项',
        _view: 'menuItem',
        _schema: 'menuItem',
        _router: 'canTeenOrder',
        isShow: true,
        title: '',
        style: {},
        rect: { x: 0, y: 10, w: 12, h: 10 },
      },
      {
        _uuid: 15,
        _name: '菜单项',
        _view: 'menuItem',
        _schema: 'menuItem',
        _router: 'canTeenOrder',
        isShow: true,
        title: '',
        style: {},
        rect: { x: 12, y: 0, w: 12, h: 20 },
      },
    ],
    Personal: [
      {
        _uuid: 12,
        _name: '菜单',
        _view: 'container',
        _schema: 'container',
        isShow: true,
        grid: 1,
        style: {},
        list: [],
      },
    ],
  },
  tabbars: {
    _uuid: '9',
    _name: '底部导航栏',
    _view: 'tabbar',
    _schema: 'tabbar',
    list: [
      {
        _uuid: '7',
        type: 'Home',
        text: '首页',
        activeImage: homeFillIcon,
        inactiveImage: homeIcon,
      },
      {
        _uuid: '8',
        type: 'Personal',
        text: '个人中心',
        activeImage: personalFillIcon,
        inactiveImage: personalIcon,
      },
    ],
  },
}
