import { InjectionToken, Type } from '@angular/core';

import { NgxTourStepComponent } from '../abstracts';

/**
 * A token to provide the necessary configuration to the tour service
 */
export const NgxTourStepToken = new InjectionToken<Type<NgxTourStepComponent>>('NgxTourStepToken');
