---
title: How to create an autoclose modal
date: "2018-12-30"
layout: post
draft: false
path: "/posts/how-to-create-an-autoclose-modal"
category: "Web"
tags:
  - "JavaScript"
  - "HTML"
  - "How-to"
description: "TODO"
---

Have you ever wondered how dialogs, menus and other things that seem to popup on the screen, have this behavior of closing automatically when you click outside them? Let's learn how to create an autoclose modal. We'll be doing it in vanilla JavaScript first and then in react, though you could implement in your framework of choice using the same concept.

## The DOM

We need only 3 `div`s to create the base structure of a modal. One for the modal content, one for the backdrop and one for wrapping the two

```html
<div class="modal-wrapper">
  <div class="modal-backdrop"></div>
  <div class="modal-content">
    <!-- The content like OK/Cancel buttons, warning messages etc. go here -->
  </div>
</div>
```

## Open/close behavior

There are a few ways to do the open/close behavior of a modal. A few are:

1. Use `visibility` `hidden` or `visible`
1. Add and delete from the DOM
1. Use `translate` and move the modal to some invisible viewport area

...and there maybe more. The whole point is, the modal should support the ability to be shown and hidden. How you choose to do it is completely upto your choice. We'll use the `visibility` CSS property in this article. We'll keep the modal hidden by default in the `modal-wrapper` class and add an inline `visibility: visible` when we wan to open it. Like

```css
.modal-wrapper {
  visibility: hidden;
}
```
```js
// To show the modal
modalElement.style.visibility = "visible";
// To hide the modal
modalElement.style.visibility = "";
```
Just a side note that inline styles override class based styles and that's how our modal show/hide works. Also, setting a property on `style` to `""` or `null` deletes it from the inline style.

## The events

In general, we need to close the modal when the user presses escape key or clicks anywhere outside the modal content area. When the backdrop is visible, the modal is generally closed by a user action inside the modal content or by pressing escape. Clicking outside doesn't have any effect, like in Dialogs. But when being used for a Menu or Tooltip, the modal will trigger a close mechanism when clicked outside as well.

Hence we will need to listen to the mouse `click` event and a keyboard `keyup` event on the `document`. Listening on `document` is only required when the modal is open, so make sure that happens. We'll add the event handlers when we click on the trigger element and remove them anytime the modal closes.

## Wiring it all up

After all this, our modal behaves perfectly when using the 
<iframe height='265' scrolling='no' title='Modal' src='//codepen.io/sniper6/embed/preview/MZOYYr/?height=265&theme-id=0&default-tab=result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sniper6/pen/MZOYYr/'>Modal</a> by Maaz Syed Adeeb (<a href='https://codepen.io/sniper6'>@sniper6</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

document event listener
click and keyup events
backdrop
