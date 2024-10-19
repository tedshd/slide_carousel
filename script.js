(() => {
  const slideModal = ({
    dom,
    list,
    actionCallback,
  }) => {

    console.log(dom, list, actionCallback);

    for (let i = 0; i < list.length; i++) {
      const element = list[i];
      const div = document.createElement('div');
      const image = document.createElement('img');
      image.src = element.image;
      image.style.width = '100%';
      image.addEventListener('click', () => handleClick(i));
      div.setAttribute('class', 'carousel_items');
      div.appendChild(image);
      dom.querySelector('.carousel_section').appendChild(div);
    }

    dom.addEventListener('touchstart', handleTouchStart, false);
    dom.addEventListener('touchmove', handleTouchMove, false);

    var xDown = null;
    var yDown = null;
    var currentCount = 0;
    const w = dom.offsetWidth;
    const displacement = dom.querySelectorAll('.carousel_items')[0].offsetWidth;

    function handleClick(index) {
      currentCount = index;
      dom.querySelector('.carousel_section').style.left = `${0 - (index * displacement) + (w / 2) - (displacement / 2)}px`;
      if (actionCallback) {
        actionCallback(index);
      }
    }

    function handleTouchStart(evt) {
      xDown = evt.touches[0].clientX;
      yDown = evt.touches[0].clientY;
    }

    function handleTouchMove(evt) {
      if (!xDown || !yDown) {
        return;
      }

      var xUp = evt.touches[0].clientX;
      var yUp = evt.touches[0].clientY;

      var xDiff = xDown - xUp;
      var yDiff = yDown - yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
        if (xDiff > 0) {
          /* left swipe */
          // console.log('left swipe');
          // dom.querySelectorAll('.mod_carousel_dot')[currentCount].setAttribute('data-state', '');
          // if ((Math.ceil(l / option.viewCount) - 1) > currentCount) {
          //   currentCount++;
          // }
          if (currentCount !== list.length - 1) {
            currentCount++;
          }
          // dom.querySelectorAll('.mod_carousel_dot')[currentCount].setAttribute('data-state', 'focus');
          // slide(currentCount);
          handleClick(currentCount);
        } else {
          /* right swipe */
          // console.log('right swipe');
          // dom.querySelectorAll('.mod_carousel_dot')[currentCount].setAttribute('data-state', '');
          if (currentCount !== 0) {
            currentCount--;
          }
          // dom.querySelectorAll('.mod_carousel_dot')[currentCount].setAttribute('data-state', 'focus');
          // slide(currentCount);
          handleClick(currentCount);
        }
      } else {
        if (yDiff > 0) {
          /* up swipe */
          console.log('up swipe');
        } else {
          /* down swipe */
          console.log('down swipe');
        }
      }
      /* reset values */
      xDown = null;
      yDown = null;
    }

    dom.querySelector('.carousel_section').style.left = `${(w / 2) - (displacement / 2)}px`;

  }

  window.slideModal = slideModal
})()