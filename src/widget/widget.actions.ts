// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
// ngrx v5 import { Update } from '@ngrx/entity';
import { Widget } from './widget.model';

export enum WidgetActionTypes {
  //
  A_DELETE_ITEM = '[Widget] Delete Item',
  A_LISTEN_FOR_DATA = '[Widget] Listen For Data',
  A_LOAD_SUCCESS = '[Widget] Load Success',
  A_UNLISTEN_FOR_DATA = '[Widget] Unlisten For Data',
  A_UPSERT_ITEM = '[Widget] Upsert item',
  //
  LOAD_WIDGETS = '[Widget] Load Widgets',
  ADD_WIDGET = '[Widget] Add Widget',
  ADD_WIDGETS = '[Widget] Add Widgets',
  UPDATE_WIDGET = '[Widget] Update Widget',
  UPDATE_WIDGETS = '[Widget] Update Widgets',
  DELETE_WIDGET = '[Widget] Delete Widget',
  DELETE_WIDGETS = '[Widget] Delete Widgets',
  CLEAR_WIDGETS = '[Widget] Clear Widgets',
}
//
export class DeleteItem implements Action {
  public readonly type = WidgetActionTypes.A_DELETE_ITEM;

  constructor(public payload: { id: string }) {}
}

export class AListenForData implements Action {
  public readonly type = WidgetActionTypes.A_LISTEN_FOR_DATA;
}

export class ALoadSuccess implements Action {
  public readonly type = WidgetActionTypes.A_LOAD_SUCCESS;

  constructor(public payload: { widgets: Widget[] }) {}
}

export class AUnlistenForData implements Action {
  public readonly type = WidgetActionTypes.A_UNLISTEN_FOR_DATA;
}

export class AUpsertItem implements Action {
  public readonly type = WidgetActionTypes.A_UPSERT_ITEM;

  constructor(public payload: { item: Widget }) {}
}
//
export class LoadWidgets implements Action {
  public readonly type = WidgetActionTypes.LOAD_WIDGETS;

  constructor(public payload: { widgets: Widget[] }) {}
}

export class AddWidget implements Action {
  public readonly type = WidgetActionTypes.ADD_WIDGET;

  constructor(public payload: { widget: Widget }) {}
}

export class AddWidgets implements Action {
  public readonly type = WidgetActionTypes.ADD_WIDGETS;

  constructor(public payload: { widgets: Widget[] }) {}
}

export class UpdateWidget implements Action {
  public readonly type = WidgetActionTypes.UPDATE_WIDGET;

  constructor(public payload: { widget: { id: string; changes: Widget } }) {}
}

/* ngrx v5
export class UpdateWidget implements Action {
  readonly type = WidgetActionTypes.UPDATE_WIDGET;

  constructor(public payload: { widget: Update<IWidget> }) {}
}

export class UpdateWidgets implements Action {
  readonly type = WidgetActionTypes.UPDATE_WIDGETS;

  constructor(public payload: { widgets: Update<IWidget>[] }) {}
}
*/

export class DeleteWidget implements Action {
  public readonly type = WidgetActionTypes.DELETE_WIDGET;

  constructor(public payload: { id: string }) {}
}

export class DeleteWidgets implements Action {
  public readonly type = WidgetActionTypes.DELETE_WIDGETS;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearWidgets implements Action {
  public readonly type = WidgetActionTypes.CLEAR_WIDGETS;
}

export type WidgetActions =
  | ALoadSuccess
  | LoadWidgets
  | AddWidget
  | AddWidgets
  | UpdateWidget
  // ngrx v5 | UpdateWidget
  // ngrx v5 | UpdateWidgets
  | DeleteWidget
  | DeleteWidgets
  | ClearWidgets;
