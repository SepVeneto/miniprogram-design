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
    color: 'rgba(126,211,33,1)',
    emptyColor: 'rgba(144,19,254,1)',
    bubbleColor: 'rgba(80,227,194,1)',
    loginBg: '',
    topbarShow: 1,
    tabbarShow: 1,
  },
  body: {
    Home: [
      {
        _uuid: 13,
        _name: '菜单项',
        _view: 'menuItem',
        _schema: 'menuItem',
        _router: 'canTeenOrder',
        isShow: true,
        title: '我的食堂订单',
        style: { width: 375, height: 50 },
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
        list: [
          {
            _uuid: 13,
            _name: '菜单项',
            _view: 'menuItem',
            _schema: 'menuItem',
            _router: 'canTeenOrder',
            isShow: true,
            title: '我的食堂订单',
            style: {},
          },
          {
            _uuid: 14,
            _name: '菜单项',
            _view: 'menuItem',
            _schema: 'menuItem',
            isShow: true,
            title: '交易明细',
            style: {},
          },
          {
            _uuid: 15,
            _name: '菜单项',
            _view: 'menuItem',
            _schema: 'menuItem',
            isShow: true,
            title: '充值明细',
            style: {},
          },
          {
            _uuid: 16,
            _name: '菜单项',
            _view: 'menuItem',
            _schema: 'menuItem',
            isShow: true,
            title: '扣减记录',
            style: {},
          },
          {
            _uuid: 17,
            _name: '菜单项',
            _view: 'menuItem',
            _schema: 'menuItem',
            isShow: true,
            title: '刷脸信息',
            style: {},
          },
          {
            _uuid: 18,
            _name: '菜单项',
            _view: 'menuItem',
            _schema: 'menuItem',
            isShow: true,
            title: '清除缓存',
            style: {},
          },
          {
            _uuid: 19,
            _name: '说明',
            _view: 'menuItem',
            _schema: 'desc',
            isShow: true,
            title: '取餐使用说明',
            style: {},
          },
          {
            _uuid: 20,
            _name: '菜单项',
            _view: 'menuItem',
            _schema: 'link',
            isShow: true,
            title: '联系客服',
            phone: '952529',
            style: {},
          },
        ],
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
