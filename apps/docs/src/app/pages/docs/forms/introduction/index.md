---
keyword: IntroductionPage
---

This library provides multiple utilities for complex form use-cases.

The `ngx-forms` package provides several validators, guards, directives, utils and abstracts to facilitate creating complex form flows in your application. These individual items can be use separately to your liking.

The validators of the `ngx-forms` package provide easy and robust way to tackle more complex validation requirements, such as various dependency based required flows, as smaller frequently used use-cases such as several dates related validators.

Simplifying the process of creating (complex) custom `ControlValueAccessor`s, `ngx-forms` introduces the `FormAccessor` and `FormContainer` approach to provide a quick and easy way to build custom controls and re-usable form components.

To handle errors in a uniform way, `ngx-forms` provides the `NgxErrors` directive approach that will unify all error handling with either the default or a custom defined error component.

Last but not least, the `SaveOnExit` flow of `ngx-forms` allows for a quick and simple solution to the often re-occuring "save-before-you-exit" flow that is common amongst complex form implementation
