let demo = {
  width: 480,
  height: 640,
  bgColor: '#78CDED',
  canvasScale: 1,
  // 层
  layers: [
    // 1============================================
    // 图片
    {
      type: 'image',
      UUID: '',
      pic_url: 'http://imgs.aixifan.com/o_1d5jpg11unbu1uru1g8h1v9dccq31.jpg',
      tween: [
        {
          action: 'to',
          props: {
            regX: 'ow / 2',
            regY: 'oh / 2',
            x: 'cw / 2',
            y: 'ch / 2',

          },
          time: 0
        },
        {
          action: 'to',
          props: {
            
            rotation: -45
          },
          pic_url: 'http://imgs.aixifan.com/o_1d5jpg11t1dbo1hj7cmopf11vse21.jpg',
          time: 1000,
          ease: 'linear'
        },
        {
          action: 'to',
          props: {
            scaleX: 'cw / ow',
            scaleY: 'cw / ow',
          },
          time: 1000,
          ease: 'linear',
        },
        {
          action: 'to',
          props: {
            rotation: 360,
          },
          time: 2000,
          ease: 'linear',
        }
      ]
    },
    // 2============================================
    {
      type: 'image',
      UUID: '',
      pic_url: 'http://imgs.aixifan.com/o_1d5jpg11t4ok1qcuf351k8e1bp722.jpg',
      tween: [
        {
          action: 'to',
          props: {
            alpha: 0
          },
          time: 10
        },
        {
          action: 'wait',
          time: 6000
        },
        {
          action: 'to',
          props: {
            alpha: 1
          },
          time: 500,
          ease: 'linear',
        },
        {
          action: 'to',
          props: {
            x: 200,
            y: 200,
            scaleX: 0.5,
            scaleY: 0.5,
          },
          pic_url: 'http://imgs.aixifan.com/o_1d5jpg11ushd13m3fj1gof7vu2m.jpg',
          time: 1000,
          ease: 'linear'
        }
      ]
    },
    // 3============================================
    {
      type: 'image',
      UUID: '',
      pic_url: 'http://imgs.aixifan.com/o_1d5jpg11t2fv1af411kt6t25o120.jpg',
      tween: [
        {
          action: 'to',
          props: {
            regX: 'ow / 2',
            regY: 'oh / 2',
            y: 'ch / 2',
            x: 'cw + ow / 2',
            alpha: 0
          },
          time: 10
        },
        {
          action: 'wait',
          time: 3000
        },
        {
          action: 'to',
          props: {
            alpha: 1,
            x: 'oh / 2 * cw / ch'
          },
          time: 5000,
          ease: 'linear',
        },
        {
          action: 'to',
          props: {
            scaleX: 'cw / ch',
            scaleY: 'cw / ch',
            rotation: 90
          },
          pic_url: 'http://imgs.aixifan.com/o_1d5jpg11t1mbb1uf91d7620b1j5i2a.jpg',
          time: 5000,
          ease: 'linear'
        },
        {
          action: 'wait',
          props: {

          },
          time: 3000,
        },
      ]
    },
    // 遮罩
    {
      type: 'mask',
      UUID: 'fffff',
      graphics: {
        // 方形
        /* type: 'rect',
        x: 0,
        y: 0,
        w: 210,
        h: 100,
        radius: 10,*/
        strokeWidth: 2,
        stroke: 'orange',
        fill: 'rgba(100,0,0,0.5)',
        // 圆角方形 drawRoundRect
        /*
        x: 0,
        y: 0,
        w: 10,
        h: 10,
        radius: 5,
        */

        // 圆形 drawCircle
        type: 'circle',
        x: 0,
        y: 0,
        radius: 100,

        // 椭圆 drawEllipse
        
       /* type: 'ellipse',
        x: 0,
        y: 0,
        w: 100,
        h: 200*/
        
       // 多形状 drawPolyStar
       /* type: 'polyStar',
        x: 0,
        y: 0,
        radius: 100,
        sides: 5, // 边数 >= 3
        pointSize: 0.9, // 0 - 1 0为边不内陷， 1内陷到看不到内容
        angle: 0, // 角度*/

      },
      tween: [
        {
          action: 'to',
          props: {
            x: 'cw / 2',
            y: 'ch / 2',
          },
          time: 1000,
          ease: 'linear'
        },
      ]
    },
    // 容器
    {
      type: 'container',
      UUID: '',
      // 子对象
      children: [
        {
          UUID: '',
          type: 'image',
          pic_url: 'http://imgs.aixifan.com/content/2019_3_13/1.552485453249718E9.png',
          tween: [
            {
              action: 'to',
              props: {
                scaleX: 0.5,
                scaleY: 0.5,
              },
              time: 0
            }
          ]
        },
        {
          UUID: '',
          type: 'image',
          pic_url: 'http://imgs.aixifan.com/content/2019_3_13/1.5524854538021584E9.png',
          tween: [
            {
              action: 'to',
              props: {
                scaleX: 0.4,
                scaleY: 0.4
              },
              time: 0
            }
          ]
        }

      ],
      tween: [
        {
          action: 'to',
          props: {
            x: 0,
            y: 0
          },
          time: 1000
        },
        {
          action: 'wait',
          time: 3000,
        },
        {
          action: 'to',
          props: {
            x: 200,
            y: 200,
          },
          time: 2000
        }
      ]

    },
    // 文本
    {
      type: 'text',
      UUID: '',
      text: 'APP',
      fontSize: 100,
      fontFamily: '黑体',
      textBaseline: 'top',
      tween: [
        {
          action: 'to',
          props: {
            color: '#ED7886',
            alpha: 1,
            regX: 'ow / 2',
            regY: 'oh / 2',
            x: 'cw / 2',
            y: 'ch / 2'
          },
          time: 0
        },
        {
          action: 'to',
          props: {
            alpha: 0
          },
          time: 1000
        },
        {
          action: 'wait',
          time: 3000
        },
        {
          action: 'to',
          props: {
            scaleX: 1,
            scaleY: 1,
            rotation: 360,
            y: 'ch - oh',
            alpha: 1
          },
          time: 2000
        },
      ]
    },
    // 形状
    {
      type: 'shape',
      UUID: '',
      graphics: {
        // 方形
        /* type: 'rect',
        x: 0,
        y: 0,
        w: 210,
        h: 100,
        radius: 10, */
        strokeWidth: 2,
        stroke: 'orange',
        fill: 'rgba(100,0,0,0.5)',
        // 圆角方形 drawRoundRect
        /*
        x: 0,
        y: 0,
        w: 10,
        h: 10,
        radius: 5,
        */

        // 圆形 drawCircle
        /* type: 'circle',
        x: 0,
        y: 0,
        radius: 100, */

        // 椭圆 drawEllipse
        
       /* type: 'ellipse',
        x: 0,
        y: 0,
        w: 100,
        h: 200*/
        
       // 多形状 drawPolyStar
        type: 'polyStar',
        x: 0,
        y: 0,
        radius: 100,
        sides: 5, // 边数 >= 3
        pointSize: 0, // 0 - 1 0为边不内陷， 1内陷到看不到内容
        angle: 0, // 角度

      },
      tween: [
        {
          action: 'set',
          props: {
            regX: 'ow / 2',
            regY: 'oh / 2',
            alpha: 1
          }
        },
        {
          action: 'to',
          props: {
            x: 'cw / 2',
            y: 'ch / 2',
            alpha: 1
          },
          time: 2000
        },
      ]
    }
  ]

};
export default demo;
