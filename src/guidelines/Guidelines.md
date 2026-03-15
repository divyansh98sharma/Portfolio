# UX Designer Portfolio Guidelines

## Design System - 4pt Grid System

All spacing, sizing, and dimensions must follow a strict 4pt grid system for consistency and visual harmony.

### Spacing Rules
* All margins, padding, gaps, and positioning values must be multiples of 4px
* Valid values: 4px, 8px, 12px, 16px, 20px, 24px, 28px, 32px, etc.
* In Tailwind: Use classes like `p-1` (4px), `p-2` (8px), `p-3` (12px), `p-4` (16px), etc.

### Size Rules  
* Width and height values should follow the 4pt grid
* Min/max dimensions should be multiples of 4px
* Touch targets should be minimum 48px × 48px (12 × 4pt units)

### Border Radius
* Use `--radius: 0.75rem` (12px) as the base radius value
* All radius variations should be multiples of 4px

### Font Size
* Base font size is 16px (4 × 4pt units)
* All font sizes should ideally be multiples of 4px when possible

### Examples of 4pt Grid Compliance
✅ `pt-8` (32px), `mb-6` (24px), `gap-4` (16px)  
❌ `pt-7` (28px) - not aligned to 4pt grid  
✅ `min-w-[164px]` (164px = 41 × 4pt)  
❌ `min-w-[160px]` (160px = not evenly divisible by 4)
<!--

System Guidelines

Use this file to provide the AI with rules and guidelines you want it to follow.
This template outlines a few examples of things you can add. You can add your own sections and format it to suit your needs

TIP: More context isn't always better. It can confuse the LLM. Try and add the most important rules you need

# General guidelines

Any general rules you want the AI to follow.
For example:

* Only use absolute positioning when necessary. Opt for responsive and well structured layouts that use flexbox and grid by default
* Refactor code as you go to keep code clean
* Keep file sizes small and put helper functions and components in their own files.

--------------

# Design system guidelines
Rules for how the AI should make generations look like your company's design system

Additionally, if you select a design system to use in the prompt box, you can reference
your design system's components, tokens, variables and components.
For example:

* Use a base font-size of 14px
* Date formats should always be in the format “Jun 10”
* The bottom toolbar should only ever have a maximum of 4 items
* Never use the floating action button with the bottom toolbar
* Chips should always come in sets of 3 or more
* Don't use a dropdown if there are 2 or fewer options

You can also create sub sections and add more specific details
For example:


## Button
The Button component is a fundamental interactive element in our design system, designed to trigger actions or navigate
users through the application. It provides visual feedback and clear affordances to enhance user experience.

### Usage
Buttons should be used for important actions that users need to take, such as form submissions, confirming choices,
or initiating processes. They communicate interactivity and should have clear, action-oriented labels.

### Variants
* Primary Button
  * Purpose : Used for the main action in a section or page
  * Visual Style : Bold, filled with the primary brand color
  * Usage : One primary button per section to guide users toward the most important action
* Secondary Button
  * Purpose : Used for alternative or supporting actions
  * Visual Style : Outlined with the primary color, transparent background
  * Usage : Can appear alongside a primary button for less important actions
* Tertiary Button
  * Purpose : Used for the least important actions
  * Visual Style : Text-only with no border, using primary color
  * Usage : For actions that should be available but not emphasized
-->
