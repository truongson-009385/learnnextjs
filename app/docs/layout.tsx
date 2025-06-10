"use client";

import { Link } from "@heroui/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

import { VkxAccordion } from "@/components/vkx-accordion/vkx-accordion";
import { NavigationModels } from "@/models/navigation-models";
import { VkxLink } from "@/components/vkx-link/vkx-link";
import { ToastProvider } from "@heroui/react";

const formComponents: NavigationModels[] = [
  { name: "Autocomplete", href: "/docs/vkx-autocomplete" },
  { name: "Button", href: "/docs/vkx-button" },
  { name: "Checkbox", href: "/docs/vkx-checkbox" },
  { name: "Calendar", href: "/docs/vkx-calendar" },
  
  { name: "CheckboxGroup", href: "/docs/vkx-checkbox-group" },
  { name: "DatePicker", href: "/docs/vkx-date-picker" },
  { name: "DateInput", href: "/docs/vkx-date-input" },
  { name: "MonthInput", href: "/docs/vkx-month-input" },
  
  { name: "NumberInput", href: "/docs/vkx-number-input" },
  { name: "YearInput", href: "/docs/vkx-year-input" },
  
  { name: "DateRangePicker", href: "/docs/vkx-date-range-picker" },
  
  { name: "Form", href: "/docs/vkx-form" },
  
  { name: "FileInput", href: "/docs/vkx-file-input" },
  
  { name: "GenericForm", href: "/docs/vkx-generic-form" },
  { name: "Input", href: "/docs/vkx-input" },
  { name: "IconButton", href: "/docs/vkx-icon-button" },
  
  { name: "Link", href: "/docs/vkx-link" },
  { name: "Popover", href: "/docs/vkx-popover" },
  { name: "PasswordInput", href: "/docs/vkx-password-input" },
  { name: "PhoneInput", href: "/docs/vkx-phone-input" },
  { name: "RadioGroup", href: "/docs/vkx-radio-group" },
  { name: "RangeCalender", href: "/docs/vkx-range-calender" },
  { name: "Select", href: "/docs/vkx-select" },
  { name: "SearchInput", href: "/docs/vkx-search-input" },
  { name: "Switch", href: "/docs/vkx-switch" },
  { name: "Slider", href: "/docs/vkx-slider" },
  { name: "Snippet", href: "/docs/vkx-snippet" },
  { name: "Skeleton", href: "/docs/vkx-skeleton" },
  
  { name: "TextArea", href: "/docs/vkx-text-area" },
  { name: "TimeInput", href: "/docs/vkx-time-input" },
  { name: "Table", href: "/docs/vkx-table" },
  { name: "TableForm", href: "/docs/vkx-table-form" },
  { name: "Tooltip", href: "/docs/vkx-tooltip" },
];

const layoutComponents: NavigationModels[] = [
  { name: "Breadcrumbs", href: "/docs/vkx-breadcrumbs" },
  { name: "Card", href: "/docs/vkx-card" },
  { name: "Dropdown", href: "/docs/vkx-dropdown" },
  { name: "Navbar", href: "/docs/vkx-navbar" },
  { name: "Tabs", href: "/docs/vkx-tabs" },
  { name: "Spacer", href: "/docs/vkx-spacer" },
  { name: "Listbox", href: "/docs/vkx-listbox" },
  { name: "Toast", href: "/docs/vkx-toast" },
];
const notificationComponents: NavigationModels[] = [
  { name: "Alert", href: "/docs/vkx-alert" },
  { name: "Spinner", href: "/docs/vkx-spinner" },
  { name: "Progress", href: "/docs/vkx-progress" },
  { name: "Circular progress", href: "/docs/vkx-circular-progress" },
];
const displayComponents: NavigationModels[] = [
  { name: "Accordion", href: "/docs/vkx-accordion" },
  { name: "Modal", href: "/docs/vkx-modal" },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      <ToastProvider />
      <div className="flex">
        {/* Sidebar */}
        <div
          className="w-64 h-[calc(100vh-64px)] 
          overflow-y-auto fixed left-0 top-16 dark:bg-black border-r border-divider"
        >
          <VkxAccordion
            accordionItems={[
              {
                key: "component",
              titleText: "Components",
                title: (
                  <p className="text-xl font-semibold text-foreground">
                    Components
                  </p>
                ),
                children: (
                  <VkxAccordion
                    accordionItems={[
                      // Form components
                      {
                        key: "form-components",
                      titleText: "form-components",
                        title: (
                          <h3 className="text-lg font-semibold text-foreground">
                            Form
                          </h3>
                        ),
                        children: (
                          <nav className="flex flex-col gap-1">
                            {formComponents.map((item) => (
                              <VkxLink
                                key={item.name}
                                className={clsx(
                                  "px-3 py-2 rounded-lg transition-colors",
                                  "hover:bg-default-100",
                                  pathname === item.href
                                    ? "bg-default-100 text-default-foreground"
                                    : "text-default-500"
                                )}
                                href={item.href}
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span>{item.name}</span>
                                  {item.status && (
                                    <span className="text-xs text-primary-500">
                                      {item.status}
                                    </span>
                                  )}
                                </div>
                              </VkxLink>
                            ))}
                          </nav>
                        ),
                      },
                      // Layout components
                      {
                        key: "layout-components",
                      titleText: "layout-components",
                        title: (
                          <p className="text-lg font-semibold text-foreground">
                            Layout
                          </p>
                        ),
                        children: (
                          <nav className="flex flex-col gap-1">
                            {layoutComponents.map((item) => (
                              <Link
                                key={item.name}
                                className={clsx(
                                  "px-3 py-2 rounded-lg transition-colors",
                                  "hover:bg-default-100",
                                  pathname === item.href
                                    ? "bg-default-100 text-default-foreground"
                                    : "text-default-500"
                                )}
                                href={item.href}
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span>{item.name}</span>
                                  {item.status && (
                                    <span className="text-xs text-primary-500">
                                      {item.status}
                                    </span>
                                  )}
                                </div>
                              </Link>
                            ))}
                          </nav>
                        ),
                      },
                      // Notification components
                      {
                        key: "notification-components",
                      titleText: "notification-components",

                        title: (
                          <h3 className="text-lg font-semibold text-foreground">
                            Notification
                          </h3>
                        ),
                        children: (
                          <nav className="flex flex-col gap-1">
                            {notificationComponents.map((item) => (
                              <Link
                                key={item.name}
                                className={clsx(
                                  "px-3 py-2 rounded-lg transition-colors",
                                  "hover:bg-default-100",
                                  pathname === item.href
                                    ? "bg-default-100 text-default-foreground"
                                    : "text-default-500"
                                )}
                                href={item.href}
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span>{item.name}</span>
                                  {item.status && (
                                    <span className="text-xs text-primary-500">
                                      {item.status}
                                    </span>
                                  )}
                                </div>
                              </Link>
                            ))}
                          </nav>
                        ),
                      },
                      // Display components
                      {
                        key: "display-component",
                      titleText: "display-component",

                        title: (
                          <p className="text-lg font-semibold text-foreground">
                            Display
                          </p>
                        ),
                        children: (
                          <nav className="flex flex-col gap-1">
                            {displayComponents.map((item) => (
                              <Link
                                key={item.name}
                                className={clsx(
                                  "px-3 py-2 rounded-lg transition-colors",
                                  "hover:bg-default-100",
                                  pathname === item.href
                                    ? "bg-default-100 text-default-foreground"
                                    : "text-default-500"
                                )}
                                href={item.href}
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span>{item.name}</span>
                                  {item.status && (
                                    <span className="text-xs text-primary-500">
                                      {item.status}
                                    </span>
                                  )}
                                </div>
                              </Link>
                            ))}
                          </nav>
                        ),
                      },
                    ]}
                    defaultExpandedKeys={
                      new Set([
                        "form-components",
                        "layout-components",
                        "notification-components",
                        "display-components",
                      ])
                    }
                   />
                ),
              },
            ]}
            className="pb-16"
            defaultExpandedKeys={new Set(["component"])}
           />
        </div>
        {/* Main content */}
        <div className="flex-1 ml-64">{children}</div>
      </div>
    </>
  );
}
