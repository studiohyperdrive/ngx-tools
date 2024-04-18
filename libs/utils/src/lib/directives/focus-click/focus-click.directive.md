# FocusClickDirective

The FocusClickDirective provides an a11y friendly click handler.

This directive replaces the default `click` directive and allows the user to execute
the `click` event by clicking the mouse **and** by using the `enter` key on focus.

## How to use

```angular2html
<button
    (focusClick)="doSomething()"
>
    My Button
</button>
```
