import homeIcon from '@/assets/home.svg';
import homeFillIcon from '@/assets/home-fill.svg';
import personalIcon from '@/assets/personal.svg';
import personalFillIcon from '@/assets/personal-fill.svg';
export default {
  globalConfig: {
    color: 'rgba(126,211,33,1)',
    emptyColor: 'rgba(144,19,254,1)',
    bubbleColor: 'rgba(80,227,194,1)',
    loginBg: '',
  },
  body: {
    home: [],
  },
  tabbars: {
    _uuid: '9',
    _name: '底部导航栏',
    _view: 'tabbar',
    _schema: 'tabbar',
    list: [
      {
        _uuid: '7',
        name: 'Home',
        text: '首页',
        activeImage: homeFillIcon,
        inactiveImage: homeIcon,
      },
      {
        _uuid: '8',
        name: 'Personal',
        text: '个人中心',
        activeImage: personalFillIcon,
        inactiveImage: personalIcon,
      },
    ],
  },
};
