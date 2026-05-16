import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
} from "vue-router";
import DocsLayout from "../layouts/DocsLayout.vue";
import HomeView from "../views/HomeView.vue";
import GettingStartedView, { docsMeta as gettingStartedMeta } from "../views/GettingStartedView.vue";
import ButtonsView, { docsMeta as buttonsMeta } from "../views/ButtonsView.vue";
import CardsView, { docsMeta as cardsMeta } from "../views/CardsView.vue";
import TablesView, { docsMeta as tablesMeta } from "../views/TablesView.vue";
import FieldsView, { docsMeta as fieldsMeta } from "../views/FieldsView.vue";
import TextInputsView, { docsMeta as textInputsMeta } from "../views/TextInputsView.vue";
import TextareasView, { docsMeta as textareasMeta } from "../views/TextareasView.vue";
import DateInputsView, { docsMeta as dateInputsMeta } from "../views/DateInputsView.vue";
import SelectsView, { docsMeta as selectsMeta } from "../views/SelectsView.vue";
import CheckboxesView, { docsMeta as checkboxesMeta } from "../views/CheckboxesView.vue";
import RangeView, { docsMeta as rangeMeta } from "../views/RangeView.vue";
import GroupsView, { docsMeta as groupsMeta } from "../views/GroupsView.vue";
import ProgressView, { docsMeta as progressMeta } from "../views/ProgressView.vue";
import BusyView, { docsMeta as busyMeta } from "../views/BusyView.vue";
import OtherInputsView, { docsMeta as otherInputsMeta } from "../views/OtherInputsView.vue";
import LayoutView, { docsMeta as layoutMeta } from "../views/LayoutView.vue";
import AccordionsView, { docsMeta as accordionsMeta } from "../views/AccordionsView.vue";
import ModalsView, { docsMeta as modalsMeta } from "../views/ModalsView.vue";
import DropdownsView, { docsMeta as dropdownsMeta } from "../views/DropdownsView.vue";
import NavigationView, { docsMeta as navigationMeta } from "../views/NavigationView.vue";
import BreadcrumbsView, { docsMeta as breadcrumbsMeta } from "../views/BreadcrumbsView.vue";
import TooltipsView, { docsMeta as tooltipsMeta } from "../views/TooltipsView.vue";
import FieldsetsView, { docsMeta as fieldsetsMeta } from "../views/FieldsetsView.vue";
import ThemeSwitcherView, { docsMeta as themeSwitcherMeta } from "../views/ThemeSwitcherView.vue";
import NotFoundView from "../views/NotFoundView.vue";

import type { DocsMeta } from "../types/docs";

declare module "vue-router" {
  interface RouteMeta extends DocsMeta {}
}

export function createDocsRouter() {
  return createRouter({
    history: import.meta.env.SSR
      ? createMemoryHistory(import.meta.env.BASE_URL)
      : createWebHistory(import.meta.env.BASE_URL),
    linkExactActiveClass: "docs-nav-active",
    scrollBehavior(_to, _from, savedPosition) {
      if (savedPosition) return savedPosition;
      return { top: 0 };
    },
    routes: [
      {
        path: "/",
        name: "home",
        component: HomeView,
      },
      {
        path: "/docs",
        component: DocsLayout,
        children: [
          { path: "", name: "getting-started", component: GettingStartedView, meta: gettingStartedMeta },
          { path: "buttons", name: "buttons", component: ButtonsView, meta: buttonsMeta },
          { path: "cards", name: "cards", component: CardsView, meta: cardsMeta },
          { path: "tables", name: "tables", component: TablesView, meta: tablesMeta },
          { path: "fields", name: "fields", component: FieldsView, meta: fieldsMeta },
          { path: "fieldsets", name: "fieldsets", component: FieldsetsView, meta: fieldsetsMeta },
          { path: "text-inputs", name: "text-inputs", component: TextInputsView, meta: textInputsMeta },
          { path: "textareas", name: "textareas", component: TextareasView, meta: textareasMeta },
          { path: "date-inputs", name: "date-inputs", component: DateInputsView, meta: dateInputsMeta },
          { path: "selects", name: "selects", component: SelectsView, meta: selectsMeta },
          { path: "checkboxes", name: "checkboxes", component: CheckboxesView, meta: checkboxesMeta },
          { path: "range", name: "range", component: RangeView, meta: rangeMeta },
          { path: "groups", name: "groups", component: GroupsView, meta: groupsMeta },
          { path: "progress", name: "progress", component: ProgressView, meta: progressMeta },
          { path: "busy", name: "busy", component: BusyView, meta: busyMeta },
          { path: "other-inputs", name: "other-inputs", component: OtherInputsView, meta: otherInputsMeta },
          { path: "layout", name: "layout", component: LayoutView, meta: layoutMeta },
          { path: "accordions", name: "accordions", component: AccordionsView, meta: accordionsMeta },
          { path: "modals", name: "modals", component: ModalsView, meta: modalsMeta },
          { path: "dropdowns", name: "dropdowns", component: DropdownsView, meta: dropdownsMeta },
          { path: "navigation", name: "navigation", component: NavigationView, meta: navigationMeta },
          { path: "breadcrumbs", name: "breadcrumbs", component: BreadcrumbsView, meta: breadcrumbsMeta },
          { path: "tooltips", name: "tooltips", component: TooltipsView, meta: tooltipsMeta },
          { path: "theme-switcher", name: "theme-switcher", component: ThemeSwitcherView, meta: themeSwitcherMeta },
        ],
      },
      { path: "/:pathMatch(.*)*", name: "not-found", component: NotFoundView },
    ],
  });
}
