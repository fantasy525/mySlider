## jq轮播图插件

1.结构
```html
 <div>
    <div class="slider-wrap">
      <div class="slider-contain">
        <ul class="slider-content">
          <li><img src="images/1.jpg" alt=""></li>
          <li><img src="images/2.jpg" alt=""></li>
          <li><img src="images/3.jpg" alt=""></li>
          <li><img src="images/4.jpg" alt=""></li>
          <li><img src="images/5.jpg" alt=""></li>
          <li><img src="images/6.jpg" alt=""></li>
          <li><img src="images/7.jpg" alt=""></li>
        </ul>
      </div>
      <i class="prev"></i>
      <i class="next"></i>
    </div>
```
## jq调用
```javascript
 $('.slider-contain').slider({
      width: 750,
      numbers: 7,
      prev: $('.prev'),
      next: $('.next')
    })
    width，和numbers是必须给的参数
```
