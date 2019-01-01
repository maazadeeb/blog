---
title: How to create an autoclose modal
date: "2019-01-06"
layout: post
draft: false
path: "/posts/how-to-create-an-autoclose-modal"
category: "Web"
tags:
  - "Javascript"
  - "HTML"
  - "HowTo"
description: Have you ever wondered how dialogs, menus and other UI elements that seem to popup on the screen, have this behavior of closing automatically when you click outside them? Many people refer to it as an "autoclose" functionality. So, let's learn how to create an autoclose modal.
---

Have you ever wondered how dialogs, menus and other UI elements that seem to popup on the screen, have this behavior of closing automatically when you click outside them? Many people refer to it as an "autoclose" functionality. So, let's learn how to create an autoclose modal. We'll be doing it in vanilla JavaScript, but you can implement the same using your framework of choice.

## The DOM

We need only 3 `div`s to create the base structure of a modal. One for the modal content, one for the backdrop and one for wrapping the two.

```html
<div class="modal-wrapper">
  <div class="modal-backdrop"></div>
  <div class="modal-content"></div>
</div>
```

The CSS is nothing fancy. The backdrop has a `fixed` position. The content has an `absolute` position, in order to position it wherever required. If we were building a Dialog, the position of the content would probably be the center of the viewport. And, if it were a Menu, then probably next to the element that triggered the opening.

## Open/close behavior

There are a few ways to do the open/close behavior of a modal. A few are:

1. Toggle `visibility` between `hidden` and `visible`
1. Add and delete from the DOM
1. Use `translate` and move the modal to some invisible viewport area

...and there maybe more. The whole point is, the modal should support the ability to be shown and hidden. How you choose to do it's completely upto your choice. We'll use the `visibility` CSS property in this article. We'll keep the modal hidden by default in the `modal-wrapper` class and add an inline `visibility: visible` when we wan to open it. Like

```css
.modal-wrapper {
  visibility: hidden;
}
```

```js
// To show the modal
modalWrapperElement.style.visibility = "visible";
// To hide the modal
modalWrapperElement.style.visibility = "";
```

PS: Inline styles override class based styles. That's how our modal open/close works. Also, setting a property on `style` to `""` or `null` deletes it from the inline style.

## The events

In general, we need to close the modal when the user presses the escape key or clicks anywhere outside the modal content area. When the backdrop is visible, the modal is generally closed by a user action inside the modal content or by pressing escape. Clicking outside doesn't have any effect, like in Dialogs. But when being used for a Menu or a Tooltip, the modal will trigger a close mechanism when clicked outside as well.

For the purposes of this demo, we'll close the modal when clicking outside even when the backdrop is visible.

Hence we'll need to listen to the keyboard `keyup` event and the mouse `click` event on the `document`. Listening on `document` is only required when the modal is open, so make sure that happens. Why? Because if we're always listening to the events, it's pretty much useless. And if you have too many modals, maybe it'll cause performance issues.

The keyboard handler is pretty straight-forward. It'll just check if the escape key was pressed and then trigger the modal closing. But, the click handler is a bit trickier. We need to check if the click was registered outside the modal. Only then close the modal. Can you think of how that can be done?

One way, the way we'll employ, is using the [`contains`](https://developer.mozilla.org/en-US/docs/Web/API/Node/contains) DOM API. We can check if the clicked event target is not contained inside the `.modal-content` and only then close. The code for the event handlers reduces to

```js
const handleDocumentKeyup = evt => {
  if (evt.key === "Escape") {
    // Close the modal
  }
};

const handleDocumentClick = evt => {
  if (!modalContentElement.contains(evt.target)) {
    // Close the modal
  }
};
```

## The code

Here's a CodePen with everything we've discussed. There is one button which opens the modal and one button in the modal content which closes the modal. Clicking outside or pressing escape closes the modal.

<iframe height='265' scrolling='no' title='Modal' src='//codepen.io/sniper6/embed/preview/MZOYYr/?height=265&theme-id=0&default-tab=result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sniper6/pen/MZOYYr/'>Modal</a> by Maaz Syed Adeeb (<a href='https://codepen.io/sniper6'>@sniper6</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Play around with it, and let me know if you have any questions or suggestions to improve!
